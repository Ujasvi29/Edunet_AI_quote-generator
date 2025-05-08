async function generateQuote() {
    const quoteBox = document.getElementById("quote");
    const mood = document.getElementById("mood").value;
    quoteBox.innerText = "Thinking in your vibe... ✨";
  
    const moodPrompts = {
      happy: "Write a joyful, uplifting quote:",
      sad: "Write a comforting, gentle quote for someone feeling down:",
      motivated: "Write a powerful, motivational quote to inspire action:",
      anxious: "Write a calming quote to ease anxiety:",
      dreamy: "Write a whimsical, dreamy quote that feels like a fairytale:"
    };
  
    const prompt = moodPrompts[mood] || "Write a beautiful quote:";
  
    const API_URL = "https://api-inference.huggingface.co/models/gpt2";
    const HF_API_KEY = "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"; // your real key
  
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: { max_length: 60, temperature: 0.85 }
      })
    });
  
    const data = await response.json();
    if (data && data[0] && data[0].generated_text) {
      const text = data[0].generated_text.replace(prompt, "").trim();
      quoteBox.innerText = `"${text}"`;
    } else {
      quoteBox.innerText = "Oops! Couldn't get a quote. Try again.";
    }
  }
  
  function copyQuote() {
    const text = document.getElementById("quote").innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert("Quote copied to clipboard! 📋");
    });
  }
  