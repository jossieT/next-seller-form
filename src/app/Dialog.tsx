"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}
export const Dialog: React.FC<Props> = ({ open, onClose, children }) => {
  if (!open) {
    return <></>;
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light  flex">
      <div className="relative bg-white w-fit m-auto flex-col flex rounded-lg border shadow-lg">
        <div className="h-full w-full">{children}</div>
        <span className="absolute top-0 right-0 p-4">
          <button
            onClick={onClose}
            className={`focus:outline-none focus:border-none hover:bg-gray-400 hover:bg-opacity-25 p-2 rounded-full inline-flex items-center`}
          >
            <IoMdClose />
          </button>
        </span>
      </div>
    </div>
  );
};
