"use client";
import { IoOpenOutline } from "react-icons/io5";
import React from "react";
import { Product } from "./ProductList";
import Image from "next/image";
import { Dialog } from "./Dialog";

interface ProductDetailProps {
  product: Product;
}
export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="text-sm rounded  ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <IoOpenOutline />
      </button>

      <Dialog onClose={() => setShowModal(false)} open={showModal}>
        <>
          <div className="relative w-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="p-4">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-36 h-36 object-cover"
                  />
                )}
              </div>
              <div className="flex items-start justify-between px-5 py-2 border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">{product.title}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative px-6 py-2 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* <div className="relative px-6 py-2 mb-3 flex items-center space-x-2">
                <p className="text-blueGray-500 text-lg leading-relaxed">
                  <span className="font-bold text-sm">{product.price}</span>{" "}
                  <span className="text-xs text-gray-500 mt-auto">ETB</span>
                  <span className="text-sm"> per piece</span>
                </p>
                <p className="text-blueGray-500">and</p>
                <p className="text-blueGray-500 text-lg leading-relaxed">
                  <span className="font-bold text-sm">
                    {product.stock_count}
                  </span>{" "}
                  <span className="text-xs text-gray-500 mt-auto">
                    in stock.
                  </span>
                </p>
              </div> */}

              {/*footer*/}
              <div className="flex items-center justify-end px-6 py-3 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      </Dialog>
    </>
  );
};
