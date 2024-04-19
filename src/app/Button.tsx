"use client";
import { ReactNode } from "react";
import Loading from "./Loading";

interface ButtonProps {
  title: string;
  leading?: ReactNode;
  loading?: boolean;
  buttonType?: "submit" | "reset" | "button" | undefined;
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  title,
  className,
  buttonType,
  leading,
  loading,
}) => {
  return (
    <button
      type={buttonType}
      disabled={loading}
      className={`fixed bottom-0 left-0 w-full bg-indigo-800 hover:bg-indigo-500 text-white-700 hover:text-white-700 flex flex-nowrap space-x-5 items-center justify-center text-sm font-semibold px-3 py-2  ${className}`}
      //className={`bg-indigo-800 hover:bg-indigo-500 text-white-700 hover:text-white-700 flex flex-nowrap space-x-5 items-center justify-center text-sm font-semibold px-3 py-2 rounded-lg ${className} `}
      onClick={onClick}
    >
      {loading ? (
        <Loading />
      ) : (
        <span className="flex flex-nowrap items-center">
          {!loading && leading && <span className="mr-2">{leading}</span>}{" "}
          {title}
        </span>
      )}
    </button>
  );
};

export default Button;
