"use client";
import React from "react";
import useTelegramInitData from "./hooks/useTelegramInitData";
import { config } from "@/config";

const NotFromBot = () => {
  const {
    isHashValid,
    data: { user },
  } = useTelegramInitData();

  return (
    <>
      {!isHashValid && (
        <div>
          <div className="z-50 hover:cursor-pointer text-center py-4 lg:px-4">
            <div
              className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Bot
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                Failed to authenticate Telegram source. Please ensure you are
                accessing this application from within the Telegram app and you
                are using {config.botUserName}!
              </span>
              <svg
                className="fill-current opacity-75 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
              </svg>
            </div>
          </div>

          {/* <div className="fixed z- top-0 left-0 right-0 bottom-0 bg-gray-200 opacity-10"></div> */}
        </div>
      )}
    </>
  );
};

export default NotFromBot;
