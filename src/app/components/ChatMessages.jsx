import Message from './Message';
import ThinkingIndicator from './ThinkingIndicator';

export default function ChatMessages({ messages, isThinking, messagesEndRef }) {
  return (
    <div className="p-4 max-h-96 overflow-y-auto text-sm flex flex-col space-y-2">
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.type}`}>
          {msg.content.map((part, i) => (
            <Message key={i} type={part.type} content={part.content} role={msg.type} />
          ))}
        </div>
      ))}
      {isThinking && (
        <ThinkingIndicator/>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
