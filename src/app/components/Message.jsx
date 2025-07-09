import { motion } from 'framer-motion';
import classNames from 'classnames';
import React from 'react';
import Image from 'next/image';

import Product from './product';

export default function Message({ type = "text", content, role = "bot" }) {
  const isUser = role === "user";

  return (
    <motion.div
      aria-live={isUser ? "off" : "polite"}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={classNames(
        "flex flex-col mb-2",
        isUser ? "items-end" : "items-start"
      )}
    >
      {!isUser && (
        <div className="flex items-center gap-2 mb-1">
          
          <span className="text-sm font-semibold text-gray-600">Aidea</span>
        </div>
      )}

      <div
        className={classNames(
          "p-2 rounded-lg text-sm max-w-[75%]",
          isUser
            ? "bg-gray-200 text-black rounded-br-none"
            : "bg-blue-500 text-white rounded-bl-none"
        )}
      >
        {type === "text" && <p>{content}</p>}
        {type === "product" && <Product content={content} />}
      </div>
    </motion.div>
  );
}
