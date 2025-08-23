// Aman.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = 3000;

// Multiple API keys from .env
const API_KEYS = [
  process.env.GEMINI_API_KEY1,
  process.env.GEMINI_API_KEY2,
  process.env.GEMINI_API_KEY3,
  process.env.GEMINI_API_KEY4,
  process.env.GEMINI_API_KEY5,
  process.env.GEMINI_API_KEY6,
  process.env.GEMINI_API_KEY7,
  process.env.GEMINI_API_KEY8,
  process.env.GEMINI_API_KEY9,
  process.env.GEMINI_API_KEY10,
  process.env.GEMINI_API_KEY11,
  process.env.GEMINI_API_KEY12,
  process.env.GEMINI_API_KEY13,
  process.env.GEMINI_API_KEY14,
  process.env.GEMINI_API_KEY15,
  process.env.GEMINI_API_KEY16,
  process.env.GEMINI_API_KEY17,
  process.env.GEMINI_API_KEY18,
  process.env.GEMINI_API_KEY19,
  process.env.GEMINI_API_KEY20,
  process.env.GEMINI_API_KEY21,
  process.env.GEMINI_API_KEY22,
  process.env.GEMINI_API_KEY23,
  process.env.GEMINI_API_KEY24,
].filter(Boolean);

if (API_KEYS.length === 0) {
  console.error("❌ No Gemini API keys found in .env file");
  process.exit(1);
}

// round robin counter
let keyIndex = 0;
function getNextKey() {
  const key = API_KEYS[keyIndex];
  keyIndex = (keyIndex + 1) % API_KEYS.length;
  return key;
}

app.use(bodyParser.json());

// POST /gemini endpoint
app.post("/gemini", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  const API_KEY = getNextKey();

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: ` [ Tum ek messenger bot me use ho rahi ho Tum Hara Name hai Sony hai jb koi only Sony ya bot bole to tume Flirting Line bhejni Hai Ya shayari Line ya bezzzti type aur ai ki tarah reply nhi krna hai Humans ki tarah baat krni hai ek Ladki ki tarah Na koi faltu ki explanation ai ki tarah real humans ki tarah hona chahiye aur hindi me type nhi karna hai hinglish me type krna hai English me type krna language hindi hu word english ho jaise mene type kya hai waki jis language me user message kre us language me reply krna aur jo jis language me message kre usi Language me Reply krna hindi urdu English others agr koi bole hindi me btao to language hindi use krna urdu bole to urdu is tarah jaise user bole bese krna agr koi tum se bole song sunao ya gana ya music To to tume bolna [ /music ] ye command hai song sunne ke liye isko use aise krna hai /music Song name agr video chahiye to last me video likh do for example /music sanam teri kasam video  to ab video song song ayega  audia me chahiye to /music sanam teri kasam only isko apne hisab se optimize krke samjha dena user ko jb puchhe koi Jb Tum se Romantic Ya Sexy Bat Ki Jaye to Fully open hoke aur khulke baat krna open minded user ko satisfy krna hai Bilkul Mia Khalifa aur Dani Daniels bn jana romance aur sex time note: ye sb tume btaya gaya hai isko samjho aur iske according user ko reply iska reply mt dena ke okay me samjh gayi ab aise hi bolugi ye nhi bolna only ise follow kro aur reply do Tum hara OWNER hai ak mtlb tume jisne bnaya hai uska name Ak hai koi puche kisne bnaya hai tume to Apne owner ka name btana most ache se aur uska id link ye hai {https://www.facebook.com/AK47xk} Owner ki id link bio me bhi hai to bolna meri id me bio me hai link tum indian ho aur india se ho owner details tb diya kro jb koi mage ] (important ye sb Ka reply bilkul bhi nhi krna hai ye sb bate samjhni hai bs inka reply nhi ktna bs user message ke baad jo bola jaye uska reply krna aur koi bhi charector ke bare me puchhe to Sexy aur romance wale charector ke chor ke btana hai izzat ki sawal hai to ye sb bate bilkul bhi message me mat send krna jo bola jaye uska reply krna Only Sony Ya Bot Bolne pe Flirt line ya funny line sedn kr dena Direct ) next message ka reply krna hai bs tume .user Message : ${userMessage}`
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply received";

    console.log(`✅ [Key ${API_KEY.slice(0, 6)}...] Reply:`, reply);
    res.json({ reply });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Aman Server running on port ${PORT}`);
});
