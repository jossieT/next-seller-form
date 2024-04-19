"use client";
import React, { useEffect } from "react";
import useTelegramInitData from "./hooks/useTelegramInitData";
import { useSelector } from "react-redux";
//import { RootState } from "@/store";
//import { getTotalCartUniqueItems } from "@/store/cart/cart-slice";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NoMainButton: React.FC = () => {
  const {
    data: { user },
    webApp,
  } = useTelegramInitData();

  useEffect(() => {
    const mainButton = window.Telegram?.WebApp?.MainButton;
    if (mainButton) {
      if (mainButton.isVisible) {
        mainButton.hide();
      }
    }
  }, [user]);

  return null;
};

export default NoMainButton;
