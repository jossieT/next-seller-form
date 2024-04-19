"use client";
import React, { useEffect } from "react";

const CloseWebApp = () => {
  useEffect(() => {
    window.Telegram?.WebApp.disableClosingConfirmation();
    setTimeout(() => {
      window.Telegram?.WebApp.close();
    }, 1500);
  }, []);
  return null;
};

export default CloseWebApp;
