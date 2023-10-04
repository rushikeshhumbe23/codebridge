const express = require("express");
// const bodyParser = require('body-parser');
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(" Welcome to my code converter server");
});

app.post("/convert", async (req, res) => {
  const { code, language } = req.body;

  try {
    const GPT_API_KEY = process.env.CHATGPT_API_KEY;

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Convert this ${code} to ${language} programmming language and each line should be on new line for converted code`,
        max_tokens: 1200,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.status(200).json({ convertedCode });
  } catch (error) {
    console.error("Error converting code:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to convert code" });
  }
});
app.post("/debug", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    const GPT_API_KEY = process.env.CHATGPT_API_KEY;
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Debug this ${code} and if have any modyfication give the instructions to fix the code line by line`,
        max_tokens: 1200,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error("Error converting code:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to convert code" });
  }
});
app.post("/check", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res
      .status(400)
      .json({
        error:
          "Invalid request. Please provide code, fromLanguage, and toLanguage.",
      });
  }

  try {
    const GPT_API_KEY = process.env.CHATGPT_API_KEY;

    // Call the ChatGPT API to convert code
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Check the quality and suggest if any modification requied to optimize the following code :\n${code}`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const convertedCode = response.data.choices[0].text.trim();
    res.json({ convertedCode });
  } catch (error) {
    console.error("Error converting code:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    res.status(500).json({ error: "Failed to convert code" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
