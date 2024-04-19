"use client";
import React, { useEffect } from "react";
import useTelegramInitData from "./hooks/useTelegramInitData";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getTotalCartUniqueItems } from "@/store/cart/cart-slice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BackButton: React.FC = () => {
  const router = useRouter();
  const path = usePathname();
  const {
    data: { user },
    webApp,
  } = useTelegramInitData();

  useEffect(() => {
    const backButton = window.Telegram?.WebApp?.BackButton;
    if (backButton) {
      backButton.show();
      if (path === "/") {
        backButton.hide();
      }
      backButton.onClick(() => router.back());
    }
  }, [user]);

  return null;
};

export default BackButton;
