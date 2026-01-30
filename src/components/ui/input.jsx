import React from "react";

const Input = React.forwardRef(
  (
    { className = "", type = "text", ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={
          "flex h-9 w-full rounded-md border border-gray-300 bg-transparent px-3 py-1 text-base shadow-sm transition placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
          className
        }
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
