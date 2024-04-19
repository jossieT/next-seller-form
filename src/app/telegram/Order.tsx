// "use client";
// import React, { useEffect } from "react";
// import useTelegramInitData from "./hooks/useTelegramInitData";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
// import { getTotalCartUniqueItems } from "@/store/cart/cart-slice";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Button from "../components/common/Button";

// interface OrderButtonProps {
//   onClick: () => void;
// }

// const OrderButton: React.FC<OrderButtonProps> = ({ onClick }) => {
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
//       mainButton.setParams({ color: "#17212b" });
//       mainButton.setText("Order");
//       mainButton.onClick(onClick);
//       if (!mainButton.isVisible) {
//         mainButton.show();
//       }
//     }
//   }, []);

//   return null;
// };

// export default OrderButton;
