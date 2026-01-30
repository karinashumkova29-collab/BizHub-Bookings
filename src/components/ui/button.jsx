import React from "react";

const VARIANTS = {
  default:
    "bg-blue-600 text-white hover:bg-blue-700",
  secondary:
    "bg-gray-100 text-gray-900 hover:bg-gray-200",
  outline:
    "border border-gray-300 hover:bg-gray-100",
  ghost:
    "hover:bg-gray-100",
  destructive:
    "bg-red-600 text-white hover:bg-red-700",
  link:
    "text-blue-600 underline hover:text-blue-700",
};

const SIZES = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-sm",
  lg: "h-10 px-6 text-lg",
  icon: "h-9 w-9 p-0",
};

const Button = React.forwardRef(
  (
    {
      variant = "default",
      size = "default",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={
          "inline-flex items-center justify-center gap-2 rounded-md font-medium transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500 " +
          (VARIANTS[variant] || VARIANTS.default) +
          " " +
          (SIZES[size] || SIZES.default) +
          " " +
          className
        }
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
