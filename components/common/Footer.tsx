"use client";

import React from "react";

const Footer = () => {
  return (
    <div className="text-center bg-warning p-2 fw-bold">
      Copyright © {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
