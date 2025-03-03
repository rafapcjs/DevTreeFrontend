import React from "react";
import "../index.css";
type ErrorMessageProps = {
  children: React.ReactNode;
};
const ErrorMessage = ({ children }: ErrorMessageProps) => (
  <p className="bg-red-50 text-red-600 p-3 uppercase text-sm font-bold text-center">{children}</p>
);

export default ErrorMessage;
