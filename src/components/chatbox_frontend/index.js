import Head from "next/head";
import { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";

const Chatbox_frontend = () => {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("../../api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");

      try {
        console.log("Response data: ", await response.text());
      } catch (error) {
        console.error(error);
      }

    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Name my pet
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: "10px" }}
          >
            Generate names
          </Button>
        </form>
        {result && (
          <Typography variant="h6" style={{ marginTop: "20px" }}>
            Generated names: {result}
          </Typography>
        )}
      </main>
    </div>
  );
};

export default Chatbox_frontend;
