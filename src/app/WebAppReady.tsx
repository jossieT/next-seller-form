"use client";
import React, { useEffect } from "react";

const WebAppReady = () => {
  useEffect(() => {
    window.Telegram?.WebApp.ready();
  }, []);
  return null;
};

export default WebAppReady;
