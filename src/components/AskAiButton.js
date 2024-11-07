import React, { useState } from "react";
import axios from "axios";

const AskAiButton = () => {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [conversation, setConversation] = useState([]);
  const [inputCount, setInputCount] = useState(0); // Add input count

  const handleAskAi = async () => {
    if (inputCount >= 5) {
      setError(
        "Input limit reached. Please contact me at pranaymessi12345@gmail.com for further access."
      );
      return;
    }

    if (!userInput.trim()) {
      setError("Please enter a valid request.");
      return;
    }

    const newConversation = [
      ...conversation,
      { role: "user", content: userInput },
    ];

    try {
      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          messages: newConversation,
          model: "llama3-8b-8192",
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      const suggestionsList = aiResponse.split("\n").map((suggestion) => ({
        text: suggestion,
        completed: false,
      }));

      setConversation([
        ...newConversation,
        { role: "assistant", content: aiResponse },
      ]);

      setSuggestions(suggestionsList);
      setError("");
      setInputCount(inputCount + 1); // Increment the input count
    } catch (error) {
      setError("Error fetching AI suggestions. Please try again.");
      console.error(error);
    }

    setUserInput("");
  };

  const handleNewChat = () => {
    setConversation([]);
    setSuggestions([]);
    setUserInput("");
    setError("");
    setInputCount(0); // Reset the input count
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="font-semibold mb-4 text-gray-800 mr-10">
        Ask AI for Suggestions
      </h2>
      <div className="flex items-center justify-between"></div>
      {error && <p className="text-red-500 mt-3">{error}</p>}

      <ul className="h-64 w-16 mt-6 space-y-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            className="p-3 bg-gray-500 rounded-md border border-gray-300 shadow-sm"
          >
            {suggestion.text}
          </li>
        ))}
      </ul>
      <textarea
        className="w-full p-3 h-24 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        rows="4"
        placeholder="Enter your request..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={inputCount >= 5} // Disable textarea after limit
      />
      <div className="flex flex-col">
        <button
          onClick={handleAskAi}
          className="mt-4 w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          disabled={inputCount >= 5} // Disable button after limit
        >
          Get Suggestions
        </button>
        <button
          onClick={handleNewChat}
          className="mt-4 w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300 ease-in-out"
        >
          Start New Chat
        </button>
      </div>
    </div>
  );
};

export default AskAiButton;
