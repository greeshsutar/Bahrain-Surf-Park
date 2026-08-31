"use client";

import React, { useState } from "react";
import ConciergeLauncher from "./ConciergeLauncher";
import ConciergePanel from "./ConciergePanel";

export default function SurfConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ConciergeLauncher isOpen={isOpen} onToggle={handleToggle} onOpen={handleOpen} />
      <ConciergePanel isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
