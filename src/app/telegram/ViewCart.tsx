// "use client";
// import React, { useEffect } from "react";
// import useTelegramInitData from "./hooks/useTelegramInitData";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
// import { getTotalCartUniqueItems } from "@/store/cart/cart-slice";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const ViewCart: React.FC = () => {
//   const router = useRouter();
//   const {
//     data: { user },
//     webApp,
//   } = useTelegramInitData();
//   const itemsCount = useSelector((state: RootState) =>
//     getTotalCartUniqueItems(state)
//   );
//   useEffect(() => {
//     const mainButton = window.Telegram?.WebApp?.MainButton;
//     if (mainButton) {
//       mainButton.setParams({ color: "#17212b", text: "View Bag" });
//       mainButton.onClick(() => router.push("/cart"));
//       if (!mainButton.isVisible) {
//         mainButton.show();
//       }
//     }
//   }, [user]);
//   return null;
// };

// export default ViewCart;
