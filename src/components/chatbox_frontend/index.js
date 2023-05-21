import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";


function MessageItem({ message }) {
  const [text, setText] = useState(
    message.author === "You" ? message.text : ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setText((prevText) => {
        if (prevText.length < message.text.length) {
          return message.text.slice(0, prevText.length + 1);
        } else {
          return prevText;
        }
      });
    }, 10);

    return () => clearTimeout(timer);
  }, [text, message.text]);

  return (
    <div className={`answer ${message.author}`}>
      <div className={`author author-${message.author}`}>{message.author}:</div>
    </div>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stopGenerating, setStopGenerating] = useState(false);
  const [requestController, setRequestController] = useState(null); // Keep track of the request controller

  const handleSubmit = async () => {
    if (prompt.trim().length === 0) {
      return;
    }

    setMessages((messages) => [
      ...messages,
      {
        text: prompt.trim(),
        id: new Date().toISOString(),
        author: "You",
      },
    ]);

    setPrompt("");

    try {
      setLoading(true);

      const controller = new AbortController(); // Create a new AbortController
      setRequestController(controller); // Store the controller
      console.log("dfafasdfafadfs",process.env.API_URL)

      const response = await fetch(process.env.API_URL, { // Use the API_URL environment variable
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ question: prompt.trim() }),
        signal: controller.signal, // Pass the signal to the fetch request
      });

      if (response.ok && !stopGenerating) {
        const { answer } = await response.json();

        if (!stopGenerating) { // Check the stopGenerating state again
          setMessages((messages) => [
            ...messages,
            {
              text: answer,
              id: new Date().toISOString(),
              author: "ACT-GPT",
            },
          ]);
        }
      } else {
        const { error } = await response.json();
        console.warn(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  const handleStopGenerating = () => {
    if (requestController) {
      requestController.abort(); // Abort the ongoing request
    }
    setStopGenerating(true);
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
        {loading && <CircularProgress className="loading-icon" />}
        {!loading && !stopGenerating && (
          <button onClick={handleStopGenerating} className="stop-generating">
            Stop Generating
          </button>
        )}
      </div>
      <Card className="answers" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </Card>
    </div>
  );
}
