import React from 'react'

export default function ThinkingIndicator() {
  return (
    <div className="flex items-center space-x-2 px-4 py-2 animate-pulse">
  
    
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
    </div>
  </div>
  )
}
