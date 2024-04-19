"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { createProduct, uploadImages } from "./actions";
import Button from "./Button";
import toast from "react-hot-toast";
import { Product } from "./ProductList";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/app/supabase/client";
//import { getCategories } from "../../category/actions/server";
//import { Category } from "../../category/CategoryList";
import { BsExclamation } from "react-icons/bs";
//import { SizeCategory } from "../../measurements/SizeCategoryList";
import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import MultipleImageSelector from "./MultipleImageSelector";
import { config } from "@/config";

export function exceedUploadLimit(images: File[]) {
  let imagesSize = images.reduce((total, file) => total + file.size, 0);

  let totalSize = imagesSize / (1024 * 1024);

  if (totalSize > 5) {
    // 9MB
    // Replace this with your toast notification function
    return true;
  }

  return false;
}
interface CreateProductProps {
  //categories?: Category[];
  //sizeCategories: SizeCategory[];
}
export const pricingMethods = ["Fixed", "Request quote"];

const CreateProduct: React.FC<CreateProductProps> = ({
  //categories,
  //sizeCategories,

}) => {
  const initialValues: Product = {
    title: "",
    description: "",
    supplier_name: "",
    event_category: "",
    style_category: "",
    image: null,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState<string | null>();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isFeatured, setIsFeatured] = useState(true);
  const [keepSelling, setKeepSelling] = useState(true);
  const handleFeaturedChange = () => {
    setIsFeatured(!isFeatured);
  };

  const handleKeepSellingChange = () => {
    setKeepSelling(!keepSelling);
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    supplier_name: Yup.string().required("Brand name is required"),
    // size_category: Yup.number().required("Size category is required"),
    //section: Yup.string().required("Cloth section is required"),

    //category: Yup.string().required("Category is required!"),
  });

  const handleSubmit = async (values: Product) => {
    startTransition(async () => {
      try {
        if (selectedImage) {
          const imagesData = await Promise.all(
            selectedImages.map(async (image) => {
              const arrayBuffer = await image.arrayBuffer();
              const uint8Array = new Uint8Array(arrayBuffer);
              return Array.from(uint8Array);
            })
          );

          const selectedArrayBuffer = await selectedImage.arrayBuffer();
          const uint8Array = new Uint8Array(selectedArrayBuffer);
          const mainImageData = Array.from(uint8Array);

          if (exceedUploadLimit([selectedImage, ...selectedImages])) {
            toast.error("Selected images exceed maximum file limit of 5mb");

            return;
          }

          const { error } = await createProduct(
            {
              ...values,
              image: "",
              unlimited_supply: keepSelling,
              featured: isFeatured,
            },

            imagesData,
            [mainImageData]
          );
          if (error) {
            toast.error("Create Product Failed!, Error: " + error.message);
          } else {
            toast.success("Product added successfully!");
            setFormValues(initialValues);
          }
        } else {
          toast.error("Image not selected!");
        }
      } catch (err: any) {
        toast.error("some thing went wrong", err.message);
      }
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    if (!file) return;
    reader.readAsDataURL(file);

    setSelectedImage(file);
  };

  return (

    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
     
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (

          <Form className="bg-white rounded-md w-[600px] relative">

            <div className="bg-gray-200 rounded-b-md w-full flex items-center justify-between px-3 py-2 mb-2">
              <h3 className="font-bold text-gray-500 ">New Dress</h3>
              <div className="rounded-full bg-gray-300 border-2 border-gray-400 h-8 w-8 flex items-center justify-center">
                <span className="text-lg" role="img" aria-label="dress emoji">👗</span>
              </div>
            </div>
            <div className="px-5">
            <div className="flex flex-col space-y-4">

              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-bold text-gray-500 tracking-wide"
                >
                  Title
                </label>
                <Field
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter title"
                  className="text-base p-2 border bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-300"
                />

                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="title"
                  className="text-sm font-bold text-gray-500 tracking-wide"
                >
                  Brand Name
                </label>
                <Field
                  id="supplier_name"
                  name="supplier_name"
                  type="text"
                  placeholder="Enter Brand Name"
                  className="text-base p-2 border bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-300"
                />
                <ErrorMessage
                  name="supplier_name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-bold text-gray-500 tracking-wide"
                >
                  Description
                </label>
                <Field
                  id="description"
                  name="description"
                  as="textarea"
                  placeholder="Enter description"
                  rows={4}
                  className="text-base p-2 border bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-300"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* <div className="flex justify-between w-full space-x-4"> */}
              <div className="grid grid-cols-1 space-y-2 w-full">
                <label
                  htmlFor="size_category"
                  className="text-sm font-bold text-gray-500 tracking-wide"
                >
                  Style Category
                </label>
                {/* <Field
                  id="size_category"
                  name="size_category"
                  as="select"
                  className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                >
                  {sizeCategories ? (
                    <option value="">Select Style Category</option>
                  ) : (
                    <span className="">
                      <span className="text-orange-500 mr-2">
                        <BsExclamation />
                      </span>{" "}
                      Couldn&apos;t get Units!
                    </span>
                  )}

                  {sizeCategories?.map((sizeCategory) => (
                    <option key={sizeCategory.id} value={sizeCategory.id}>
                      {sizeCategory.name}
                    </option>
                  ))}
                </Field> */}
                <Field
                  id="style_category"
                  name="style_category"
                  as="select"
                  className="text-base p-2 border bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-300"
                >
                  <option value="">Select Style Category</option>
                  <optgroup label="Style by Length">
                    <option value="Short Dresses">Short Dresses</option>
                    <option value="Medium-Length Dresses">Medium-Length Dresses</option>
                    <option value="Long Dresses">Long Dresses</option>
                  </optgroup>
                  <optgroup label="Style by Dark Colors">
                    <option value="Black Dresses">Black Dresses</option>
                    <option value="Navy Dresses">Navy Dresses</option>
                    <option value="Charcoal Dresses">Charcoal Dresses</option>
                  </optgroup>
                  <optgroup label="Style by Light Colors">
                    <option value="White Dresses">White Dresses</option>
                    <option value="vory Dresses">Ivory Dresses</option>
                    <option value="Cream Dresses">Cream Dresses</option>
                  </optgroup>
                </Field>
                {/* <ErrorMessage
                  name="size_category"
                  component="div"
                  className="text-red-500 text-sm"
                /> */}
              </div>

              <div className="grid grid-cols-1 space-y-2 w-full">
                <label
                  htmlFor="category"
                  className="text-sm font-bold text-gray-500 tracking-wide"
                >
                  Event Catagory
                </label>
                {/* <Field
                  id="category"
                  name="category"
                  as="select"
                  className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                >
                  {categories ? (
                    <option value="">Select Event category</option>
                  ) : (
                    <span className="">
                      <span className="text-orange-500 mr-2">
                        <BsExclamation />
                      </span>{" "}
                      Couldn&apos;t get Categories!
                    </span>
                  )}

                  {categories?.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Field> */}
                <Field
                  id="event_category"
                  name="event_category"
                  as="select"
                  className="text-base p-2 border bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-300"
                >
                  <option value="">Select Event Category</option>
                  <optgroup label="Student Event">
                    <option value="winWinter Formal Dresster">Winter Formal Dress</option>
                    <option value="Prom Dresses">Prom Dresses</option>
                    <option value="Homecoming Dresses">Homecoming Dresses</option>
                    <option value="Graduation Dresses">Graduation Dresses
                    </option>
                  </optgroup>
                  <optgroup label="Formal Event dresses">
                    <option value="Black Tie Dresses">Black Tie Dresses</option>
                    <option value="Semi-Formal Dress">Semi-Formal Dress</option>
                    <option value="cocktail Party Dress">cocktail Party Dress</option>
                    <option value="Holiday Party Dress">Holiday Party Dress</option>
                    <option value="Sunday Best Dressday">Sunday Best Dress</option>
                  </optgroup>
                  <optgroup label="Wedding Guest Dresses">
                    <option value="Mother of the Bride/Groom Dresses">Mother of the Bride/Groom Dresses</option>
                    <option value="Bridesmaid Dresses">Bridesmaid Dresses</option>
                    <option value="Black Tie Wedding Guest Dresses">Black Tie Wedding Guest Dresses</option>
                    <option value="emi Formal Wedding Guest Dresses">Semi Formal Wedding Guest Dresses
                    </option>
                  </optgroup>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {/* </div> */}
              <div className="flex space-x-4 py-2">
                <div className="grid grid-cols-1 space-y-2 w-48">
                  <div className="flex cursor-pointer select-none items-center space-x-2">
                    <label
                      htmlFor="featured"
                      className="text-sm font-bold text-gray-500 tracking-wide"
                    >
                      Featured
                    </label>
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="featured"
                        className="hidden"
                        value=""
                        checked={isFeatured}
                        onChange={handleFeaturedChange}
                      />
                      <label
                        htmlFor="featured"
                        className={`relative cursor-pointer w-12 h-6 bg-gray-300 rounded-full ${isFeatured ? "bg-indigo-500" : ""
                          }`}
                      >
                        <div
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${isFeatured ? "transform translate-x-[150%]" : ""
                            }`}
                        ></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 space-y-2 w-48">
                <div className="flex cursor-pointer select-none items-center space-x-2">
                  <label
                    htmlFor="keepselling"
                    className="text-sm font-bold text-gray-500 tracking-wide whitespace-nowrap"
                  >
                    Unlimited stock?
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="keepselling"
                      className="hidden"
                      value=""
                      checked={keepSelling}
                      onChange={handleKeepSellingChange}
                    />
                    <label
                      htmlFor="keepselling"
                      className={`relative cursor-pointer w-12 h-6 bg-gray-300 rounded-full ${keepSelling ? "bg-indigo-500" : ""
                        }`}
                    >
                      <div
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${keepSelling ? "transform translate-x-[150%]" : ""
                          }`}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 space-y-2 py-4">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                  Main Product Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center relative">
                    {imagePreview ? (
                      <img
                        className="absolute inset-0 object-cover w-full h-full"
                        src={imagePreview}
                        alt="selected file"
                      />
                    ) : (
                      <div className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                        <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10"></div>
                        <p className="pointer-none text-gray-500 ">
                          <span className="text-sm">Drag and drop</span> Image
                          here <br /> or{" "}
                          <label
                            htmlFor="fileInput"
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            select an Image
                          </label>{" "}
                          from your computer
                        </p>
                      </div>
                    )}
                    <Field
                      type="file"
                      id="fileInput"
                      name="image"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 space-y-2 py-4">
                <label className="text-sm font-bold text-gray-500 tracking-wide">
                  Additional Product Images
                </label>
                <MultipleImageSelector
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                />
              </div>
              <p className="text-sm text-gray-300">
                <span>File type: png, jpg, webp...</span>
              </p>
            </div>
            </div>
            <div className="max-w-lg mx-auto py-3">
              <Button
                loading={isPending}
                title="Submit Dress for Review"
                buttonType="submit"
                className="w-full bg-skyblue text-white py-3"
              />

            </div>
          </Form>
        )}

      </Formik>
    </div>
  );
};

export default CreateProduct;
