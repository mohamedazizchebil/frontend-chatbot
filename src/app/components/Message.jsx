import React from "react";
import classNames from "classnames";

export default function Message({ text, role = "bot" }) {
  const isUser = role === "user";

  return (
    <div
      className={classNames(
        "flex",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={classNames(
          "p-2 rounded-lg text-sm max-w-[75%] mb-2",
          isUser
            ? "bg-gray-200 text-black rounded-br-none"
            : "bg-blue-500 text-white rounded-bl-none"
        )}
      >
        {text}
      </div>
    </div>
  );
}
