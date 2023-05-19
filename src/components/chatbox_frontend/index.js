import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";

function MessageItem({ message }) {
  const [text, setText] = useState(
    message.author === "human" ? message.text : ""
  );

  useEffect(() => {
    setTimeout(() => {
      setText(message.text.slice(0, text.length + 1));
    }, 10);
  }, [text, message.text]);

  return (
    <div className="answer">
      <div className={`author author-${message.author}`}>{message.author}:</div>
      <div className="message">{text}</div>
    </div>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = async () => {
    if (prompt.trim().length === 0) {
      return;
    }

    setMessages((messages) => [
      ...messages,
      {
        text: prompt.trim(),
        id: new Date().toISOString(),
        author: "human",
      },
    ]);

    setPrompt("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/new-gpt/response.py", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ question: prompt.trim() }),
      });

      if (response.ok) {
        const { answer } = await response.json();

        setMessages((messages) => [
          ...messages,
          {
            text: answer,
            id: new Date().toISOString(),
            author: "ai",
          },
        ]);
      } else {
        const { error } = await response.json();
        console.warn(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    setMessages((messages) => {
      if (messages.length <= 2) {
        return messages;
      } else {
        return messages.slice(-2);
      }
    });
  };

  return (
    <div className="container">
      <div className="inputContainer">
        <textarea
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          value={prompt}
          placeholder="Ask a question about EU-AI-ACT."
          rows={3}
        />
        <button onClick={handleSubmit} className="submit">
          Submit
        </button>
        <button onClick={handleClear} className="clear">
          Clear
        </button>
      </div>
      <Card
        className="answers"
        style={{ overflow: "auto", maxHeight: "70vh", padding: "1rem" }}
      >
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </Card>
    </div>
  );
}
