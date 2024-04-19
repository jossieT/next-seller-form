"use client";
import React, { useEffect } from "react";
import useTelegramInitData from "./hooks/useTelegramInitData";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  getTotalCartUniqueItems,
  removeItemsWithZeroCount,
} from "@/store/cart/cart-slice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const CheckOut: React.FC = () => {
  const router = useRouter();
  const {
    data: { user },
    webApp,
  } = useTelegramInitData();
  const itemsCount = useSelector((state: RootState) =>
    getTotalCartUniqueItems(state)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const mainButton = window.Telegram?.WebApp?.MainButton;
    if (mainButton) {
      mainButton.setText("Checkout");
      mainButton.setParams({ color: "#17212b" });
      mainButton.onClick(() => {
        dispatch(removeItemsWithZeroCount());
        router.push("/checkout");
      });
      if (!mainButton.isVisible) {
        mainButton.show();
      }
    }
  }, [user]);

  return null;
};

export default CheckOut;
