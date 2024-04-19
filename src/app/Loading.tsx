"use client";
import React from "react";
import { PulseLoader } from "react-spinners";

const Loading = () => {
  return <PulseLoader color="#FFFFFF" speedMultiplier={0.5} size={10} />;
};

export default Loading;
