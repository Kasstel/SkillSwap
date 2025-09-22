import React from "react";

export type TModalProps = {
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  onClose: () => void;
  children?: React.ReactNode;
  noPadding?: boolean;
};
