import Image from "next/image";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface MultipleImageSelectorProps {
  selectedImages: File[];
  setSelectedImages: (files: File[]) => void;
}
const MultipleImageSelector: React.FC<MultipleImageSelectorProps> = ({
  selectedImages,
  setSelectedImages,
}) => {
  const handleAdditionaFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    setSelectedImages([...selectedImages, ...files]);
  };
  return (
    <div className="flex items-center justify-start w-full flex-wrap">
      {selectedImages?.map((image, index) => (
        <div key={index} className="relative w-48 h-48 mx-2 rounded-lg p-2">
          <div
            onClick={() => {
              setSelectedImages(
                selectedImages.filter((image, cur) => cur !== index)
              );
            }}
            className="absolute flex items-center justify-center top-0 right-0 w-8 h-8 border rounded-full bg-white cursor-pointer"
          >
            <AiOutlineClose />
          </div>
          <Image
            className="object-cover w-full h-full "
            src={URL.createObjectURL(image)}
            height={100}
            width={100}
            alt="selected file"
          />
        </div>
      ))}
      <label className="flex w-48 h-48 max-w-48 max-h-48 flex-col rounded-lg border-4 border-dashed p-10 group text-center relative">
        <div className="h-full w-full text-center flex flex-col items-center justify-center items-center">
          <div className="flex flex-auto max-h-24 w-2/5 mx-auto -mt-10"></div>
          <p className="pointer-none text-gray-500 ">
            <span className="text-sm">Drag and drop</span> Image here <br /> or{" "}
            <label
              htmlFor="additionalFileInput"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              select images
            </label>{" "}
            from your computer
          </p>
        </div>

        <input
          type="file"
          id="additionalFileInput"
          name="additionalimage"
          className="hidden"
          onChange={handleAdditionaFileChange}
          accept="image/*"
          multiple
        />
      </label>
    </div>
  );
};

export default MultipleImageSelector;
