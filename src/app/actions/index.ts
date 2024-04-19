"use server";
import { createClient } from "../../utils/supabase/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { Product } from "../ProductList";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function createProduct(
  product: any,
  images: number[][],
  mainImageData: number[][]
) {
  try {
    const supabase = createClient(cookies());
    const additionalImages = await uploadImages(images);
    const mainImage = await uploadImages(mainImageData);

    const { data, error } = await supabase.from("dress_product").insert({
      title: product.title,
      description: product.description,
      image: mainImage[0],
      //category: product.category,
      style_category: product.style_category,
      unlimited_supply: product.unlimited_supply,
      featured: product.featured,
      event_category: product.event_category,
      supplier_name: product.supplier_name,
      additional_images: additionalImages,
      user_id: (await supabase.auth.getUser()).data.user?.id,
    });

    revalidatePath("/admin/products");
    return { data, error };
  } catch (err) {
    return { error: new Error("Server error!") };
  }
}

export async function editProduct(
  product: Product,
  images: number[][],
  mainImageData: number[][]
) {
  try {
    const supabase = createClient(cookies());
    const additionalImages = await uploadImages(images);
    const mainImage = await uploadImages(mainImageData);

    const { data, error } = await supabase
      .from("products")
      .update({
        title: product.title,
        description: product.description,
        //section: product.section,
        image: mainImage[0] ? mainImage[0] : product.image,
        additional_images: [
          ...(product.additional_images || []),
          ...additionalImages,
        ],
        style_category: product.style_category,
        unlimited_supply: product.unlimited_supply,
        featured: product.featured,
        supplier_name: product.supplier_name,
        event_category: product.event_category,
      })
      .eq("id", product.id);

    revalidatePath("/admin/products");
    return { data, error };
  } catch (err) {
    return { error: new Error("server error!") };
  }
}

export async function toggelFeatured(productId: number, featured: boolean) {
  const supabase = createClient(cookies());
  const response = await supabase
    .from("products")
    .update({
      featured: !featured,
    })
    .eq("id", productId)
    .single();

  revalidatePath("/admin/products");
  return {
    error: response.error,
    data: response.data,
  };
}

export async function getProducts(from: number, to: number, query: string) {
  const supabase = createClient(cookies());
  const response = await supabase
    .from("products")
    .select("*, size_category: size_categories(*)", { count: "exact" })
    .range(from - 1, to - 1)
    .or(`title.ilike.*${query}*,description.ilike.*${query}*`)
    .order("created_at", { ascending: false });

  return {
    error: response.error,
    products: response.data,
    count: response.count,
  };
}

export async function getProduct(productId: string) {
  const supabase = createClient(cookies());
  const response = await supabase
    .from("products")
    .select(
      "*, size_category: size_categories(*, sizes: sizes(*)), variants: product_variants(*, size: sizes(*), color: colors(*))"
    )
    .eq("id", productId)
    .single();

  return {
    error: response.error,
    product: response.data,
  };
}

export async function createProductVariant(variant: any) {
  const supabase = createClient(cookies());

  const { data, error } = await supabase.from("product_variants").insert({
    color: variant.color,
    size: variant.size,
    price: variant.price,
    quantity: variant.quantity,
    product: variant.product,
  });

  revalidatePath(`/admin/products/edit/${variant.product}`);
  return { data, error };
}
export async function updateProductVariant(variant: any) {
  console.log(variant);
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("product_variants")
    .update(variant)
    .eq("id", variant.id);

  revalidatePath(`/admin/products/edit/${variant.product}`);
  return { data, error };
}

// export async function deleteProductVariant(variant: ProductVariant) {
//   const supabase = createClient(cookies());

//   const { data, error } = await supabase
//     .from("product_variants")
//     .delete()
//     .eq("id", variant.id);

//   revalidatePath(`/admin/products/edit/${variant.product}`);
//   return { data, error };
// }

export async function uploadImages(imageData: number[][]) {
  const responses = await Promise.all(
    imageData.map(async (data, index) => {
      const buffer = Buffer.from(data);
      const name: string = uuidv4();
      const uploadResponse = await imageKit.upload({
        file: buffer,
        fileName: name,
      });
      return uploadResponse.url; // or any other data you need from the response
    })
  );
  return responses;
}
