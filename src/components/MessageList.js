import React, { useState } from "react";

const MessageList = ({ role, content }) => {
  const [isSillyMode, setIsSillyMode] = useState(false);

  const handleSillyMode = () => {
    setIsSillyMode(!isSillyMode);
  };

  return (
    <div>
      <button onClick={handleSillyMode}>
        {isSillyMode ? "Turn off Silly Mode" : "Turn on Silly Mode"}
      </button>
      <div
        className={`mb-2 p-3 rounded-lg max-w-xs ${
          role === "user"
            ? "bg-[#DCF8C6] self-end text-right"
            : "bg-white self-start text-left border border-gray-300"
        }`}
      >
        {isSillyMode ? (
          <span>
            {content} 🤪
            {role === "assistant" && (
              <span> (just kidding, I'm still a serious AI)</span>
            )}
          </span>
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default MessageList;
