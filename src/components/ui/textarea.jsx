import React from "react";

const Textarea = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={
          "flex min-h-[60px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-base shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm " +
          className
        }
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
