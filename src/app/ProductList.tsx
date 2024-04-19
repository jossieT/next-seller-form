import React from "react";
import { getProducts } from "./actions";
import Image from "next/image";
//import { getCategories } from "../category/actions/server";
import Link from "next/link";
import { ProductDetail } from "./ProductDetail";
//import DeleteProduct from "./DeleteProduct";
//import Error from "@/app/components/common/Error";
//import Pagination from "@/app/components/common/Pagination";
//import { Size, SizeCategory } from "../measurements/SizeCategoryList";
//import { Color } from "../colors/ColorList";

export interface Product {
  id?: number;
  section?: string;
  title: string;
  description: string;
  defaultPrice?: number;
  image?: string | null;
  additional_images?: string[];
  created_at?: string;
  unlimited_supply?: boolean;
  style_category: string;
  featured?: boolean;
  event_category: string;
  supplier_name: string;
 // variants?: ProductVariant[];
}

// export interface ProductVariant {
//   id?: number;
//  // size?: Size;
//   color?: Color;
//   quantity?: number;
//   price?: number;
//   product?: number;
// }

// interface ProductListProps {
//   page: number;
//   perPage: number;
//   query: string;
// }
// export const ProductList: React.FC<ProductListProps> = async ({
//   page,
//   perPage,
//   query,
// }) => {
//   const { products, count, error } = await getProducts(
//     (page - 1) * perPage + 1,
//     (page - 1) * perPage + perPage,
//     query
//   );
//   // const { categories, error: categroyError } = await getCategories();
//   // return error || categroyError || !products ? (
//   //   <Error />
//   // ) : (
//     <div className="w-full flex flex-col space-y-3">
//       <div className="container mt-10 bg-componentbg ">
//         <div className=" max-w-full overflow-x-auto">
//           <table className="w-full leading-normal text-black">
//             <thead className="bg-primary text-white h-16">
//               <tr>
//                 <th
//                   scope="col"
//                   className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
//                 ></th>
//                 <th
//                   scope="col"
//                   className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
//                 >
//                   Name
//                 </th>

//                 <th
//                   scope="col"
//                   className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase whitespace-nowrap"
//                 >
//                   Created at
//                 </th>
//                 <th
//                   scope="col"
//                   className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
//                 >
//                   Price
//                 </th>
//                 {/* <th
//                   scope="col"
//                   className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
//                 >
//                   In Stock
//                 </th> */}

//                 <th
//                   scope="col"
//                   className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
//                 >
//                   Featured
//                 </th>
//                 <th
//                   scope="col"
//                   className="border-b border-gray-200 px-5 py-3 text-left text-sm font-normal uppercase"
//                 >
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-black">
//               {products?.map((product: Product, index: number) => (
//                 <tr key={index} className="">
//                   <td className="border-b border-gray-200 p-5 text-sm">
//                     <div className="flex items-center h-16 w-16">
//                       {product.image && (
//                         <Image
//                           className="object-contain h-16 w-16"
//                           src={product.image}
//                           width={100}
//                           height={100}
//                           alt={product.title}
//                         />
//                       )}
//                     </div>
//                   </td>
//                   <td className="border-b border-gray-200 p-5 text-sm">
//                     <div className="ml-3">
//                       <p className="whitespace-wrap font-semibold">
//                         {product.title}
//                       </p>
//                     </div>
//                   </td>

//                   <td className="border-b border-gray-200 p-5 text-sm">
//                     <p className="whitespace-nowrap">
//                       {" "}
//                       {product.created_at
//                         ? new Date(product.created_at).toLocaleDateString()
//                         : "-"}
//                     </p>
//                   </td>

//                   <td className=" border-b border-gray-200 p-5 text-sm">
//                     {/* <div className="w-full flex space-x-2 items-center">
//                       <DeleteProduct product={product} />
//                     </div> */}
//                   </td>
//                   <td className=" border-b border-gray-200 p-5 text-sm">
//                     <div className="w-full flex space-x-2 items-center">
//                       <ProductDetail product={product} />

//                       <Link
//                         href={`/admin/products/edit/${product.id}`}
//                         className="text-indigo-600
//                     hover:text-indigo-900"
//                       >
//                         Edit
//                       </Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Pagination current={page} perPage={perPage} total={count!} />
//     </div>
//   );
// };
