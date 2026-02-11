import React from "react";

export function Tooltip({ text }: { text: string }) {
  return (
    <span className="ml-2 text-sm text-gray-500 cursor-help" title={text}>
      ❓
    </span>
  );
}
