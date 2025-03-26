const fs = require("fs");
const sharp = require("sharp");
const path = require("path");

const emojiAlphabet = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "😘",
  "🥰",
  "😗",
  "😙",
  "😚",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "😶",
];

const emojiNumbers = [
  "🔟",
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "0️⃣",
];
const emojiSpecialChars = {
  " ": "🌟",
  "!": "❗",
  "?": "❓",
  ".": "⚫",
  ",": "🟠",
  "-": "➖",
  _: "➖",
};

// 🔹 Custom Substitution Mapping (Algorithm 2)
const emojiSubstitution = {
  a: "🎈",
  b: "🎉",
  c: "🎊",
  d: "🎃",
  e: "🎄",
  f: "🎅",
  g: "🎵",
  h: "🎶",
  i: "🎤",
  j: "🎥",
  k: "🎨",
  l: "🎭",
  m: "🎯",
  n: "🎲",
  o: "🎳",
  p: "🎷",
  q: "🎺",
  r: "🎻",
  s: "🎼",
  t: "🏆",
  u: "🏅",
  v: "🥇",
  w: "🥈",
  x: "🥉",
  y: "🎖",
  z: "🎗",
};
const morseCode = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  " ": "/",
  ".": ".-.-.-",
  ",": "--..--",
};
const reverseEmojiSubstitution = Object.fromEntries(
  Object.entries(emojiSubstitution).map(([k, v]) => [v, k])
);

// **🔹 Algorithm 1: Improved Emoji Caesar Cipher**
function caesarCipherEncrypt(text, shift) {
  let encryptedText = "";
  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const shiftAmount = shift % 26;
      const index = char.toLowerCase().charCodeAt(0) - 97;
      const encryptedChar = emojiAlphabet[(index + shiftAmount) % 26];
      encryptedText += isUpperCase
        ? encryptedChar.toUpperCase()
        : encryptedChar;
    } else if (/[0-9]/.test(char)) {
      encryptedText += emojiNumbers[parseInt(char)];
    } else if (emojiSpecialChars[char]) {
      encryptedText += emojiSpecialChars[char];
    } else {
      encryptedText += char;
    }
  }
  return encryptedText;
}

function caesarCipherDecrypt(text, shift) {
  let decryptedText = "";
  for (const char of text) {
    const lowerChar = char.toLowerCase();
    if (emojiAlphabet.includes(lowerChar)) {
      const shiftAmount = shift % 26;
      const index = emojiAlphabet.indexOf(lowerChar);
      const decryptedChar = String.fromCharCode(
        97 + ((index - shiftAmount + 26) % 26)
      );
      decryptedText +=
        char === char.toUpperCase()
          ? decryptedChar.toUpperCase()
          : decryptedChar;
    } else if (emojiNumbers.includes(char)) {
      decryptedText += emojiNumbers.indexOf(char);
    } else if (Object.values(emojiSpecialChars).includes(char)) {
      decryptedText += Object.keys(emojiSpecialChars).find(
        (key) => emojiSpecialChars[key] === char
      );
    } else {
      decryptedText += char;
    }
  }
  return decryptedText;
}

// **🔹 Algorithm 2: Reverse Substitution Cipher**
function substitutionEncrypt(text) {
  return text
    .split("")
    .map((char) => emojiSubstitution[char.toLowerCase()] || char)
    .join("");
}

function substitutionDecrypt(text) {
  let decryptedText = "";
  for (const char of text) {
    if (reverseEmojiSubstitution[char]) {
      decryptedText += reverseEmojiSubstitution[char]; // ✅ Correctly map back
    } else {
      decryptedText += char; // ✅ Keep characters that are not in the mapping
    }
  }
  return decryptedText;
}

// **🔹 Algorithm 3: XOR Emoji Encryption**
function xorEncrypt(text, key) {
  return text
    .split("")
    .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
    .join("");
}

function xorDecrypt(text, key) {
  return xorEncrypt(text, key); // XOR is reversible with the same key
}

const reverseMorse = Object.fromEntries(
  Object.entries(morseCode).map(([k, v]) => [v, k])
);

// Encryption Methods...

// 🔹 Time-Locked Encryption
function encryptWithTime(text, unlockTime) {
  const encryptedText = Buffer.from(text).toString("base64");
  return JSON.stringify({ encrypted: encryptedText, unlockTime });
}

function decryptWithTime(data) {
  try {
    const { encrypted, unlockTime } = JSON.parse(data);
    if (Date.now() >= unlockTime) {
      return Buffer.from(encrypted, "base64").toString("utf-8");
    }
    return "Message is locked 🔒";
  } catch (error) {
    return "Invalid data format for time-lock decryption.";
  }
}

// 🔹 Steganography

async function hideMessageInImage(message, imageBuffer, outputPath) {
  try {
    console.log("🔹 Hiding message in image...");

    // Ensure output directory exists
    const uploadsDir = path.dirname(outputPath);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Convert message to binary + delimiter
    const delimiter = "1111111111111110"; // Unique end marker
    const binaryMessage =
      message
        .split("")
        .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("") + delimiter;

    const { data, info } = await sharp(imageBuffer)
      .removeAlpha() // Ensure 3 channels (RGB)
      .raw()
      .toBuffer({ resolveWithObject: true });

    let idx = 0;
    for (let i = 0; i < data.length && idx < binaryMessage.length; i++) {
      data[i] = (data[i] & ~1) | (binaryMessage[idx] === "1" ? 1 : 0);
      idx++;
    }

    const modifiedImageBuffer = await sharp(data, {
      raw: { width: info.width, height: info.height, channels: 3 },
    })
      .png()
      .toBuffer();

    await sharp(modifiedImageBuffer).toFile(outputPath);
    console.log("✅ Message hidden successfully in:", outputPath);
    const imageUrl = `https://codeworduuu.vercel.app/uploads/${path.basename(
      outputPath
    )}`;
    return imageUrl;
  } catch (error) {
    console.error("❌ Error hiding message in image:", error);
    throw error;
  }
}

async function extractMessageFromImage(imageBuffer) {
  try {
    console.log("🔹 Extracting message from image...");

    // Ensure correct color space and remove alpha if needed
    const { data, info } = await sharp(imageBuffer)
      .removeAlpha() // Ensure 3 channels (RGB)
      .raw()
      .toBuffer({ resolveWithObject: true });

    console.log(`🔹 Extracting from ${info.channels} channels (Expected: 3)`);

    console.log(`🔹 Extracting from ${info.channels} channels (expected: 3)`);

    console.log(
      `🔹 Image width: ${info.width}, height: ${info.height}, channels: ${info.channels}`
    );

    const delimiter = "1111111111111110"; // Unique end marker
    let binaryMessage = "";

    for (let i = 0; i < data.length; i++) {
      binaryMessage += data[i] & 1 ? "1" : "0";

      // Stop extracting when the delimiter is found
      if (binaryMessage.endsWith(delimiter)) {
        binaryMessage = binaryMessage.slice(0, -delimiter.length); // Remove delimiter
        break;
      }
    }

    // Convert binary to text
    const extractedMessage = binaryMessage
      .match(/.{8}/g) // Split into 8-bit chunks
      ?.map((byte) => {
        const charCode = parseInt(byte, 2);
        return charCode >= 32 && charCode <= 126
          ? String.fromCharCode(charCode)
          : "?"; // Replace non-printable chars
      })
      .join("");

    console.log(
      "✅ Extracted message:",
      extractedMessage || "No message found!"
    );
    return extractedMessage || "No message found!";
  } catch (error) {
    console.error("❌ Error extracting message:", error);
    throw error;
  }
}

function morseEncrypt(text) {
  return text
    .split("")
    .map((char) => morseCode[char.toLowerCase()] || char)
    .join(" ");
}
function morseDecrypt(text) {
  return text
    .split(" ")
    .map((code) => reverseMorse[code] || code)
    .join("");
}
const encrypt = async (req, res) => {
  try {
    console.log("🔹 Encryption Request Body:", req.body);
    console.log("🔹 File Received:", req.file);

    const { text, shift, algorithm, key, unlockTime } = req.body;
    if (!text && algorithm !== "steganography") {
      return res
        .status(400)
        .json({ success: false, message: "Text is required" });
    }

    let result;
    switch (algorithm.toLowerCase()) {
      case "caesar":
        if (!shift)
          return res
            .status(400)
            .json({ success: false, message: "Shift value required" });
        result = caesarCipherEncrypt(text, Number(shift));
        break;
      case "substitution":
        result = substitutionEncrypt(text);
        break;
      case "xor":
        if (!key)
          return res
            .status(400)
            .json({ success: false, message: "Key is required" });
        result = xorEncrypt(text, Number(key));
        break;
      case "time-lock":
        if (!unlockTime)
          return res
            .status(400)
            .json({ success: false, message: "Unlock time required" });
        result = encryptWithTime(text, unlockTime);
        break;
      case "steganography":
        if (!req.file)
          return res
            .status(400)
            .json({ success: false, message: "Image file is required" });
        const outputPath = `uploads/encrypted_${Date.now()}.png`;
        const imageUrl = await hideMessageInImage(
          text,
          req.file.buffer,
          outputPath
        );
        return res.json({
          success: true,
          encrypted: imageUrl,
          imageUrl: imageUrl,
        });
      case "morse":
        result = morseEncrypt(text);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid algorithm" });
    }

    res.json({ success: true, encrypted: result });
  } catch (error) {
    console.error("❌ Encryption Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing encryption" });
  }
};

// 🔹 Decryption Handler
const decrypt = async (req, res) => {
  try {
    console.log("🔹 Decryption Request Body:", req.body);
    console.log("🔹 File Received:", req.file);

    const { text, shift, algorithm, key } = req.body;
    if (!text && algorithm !== "steganography") {
      return res
        .status(400)
        .json({ success: false, message: "Encrypted text is required" });
    }

    let result;
    switch (algorithm.toLowerCase()) {
      case "caesar":
        if (!shift)
          return res
            .status(400)
            .json({ success: false, message: "Shift value required" });
        result = caesarCipherDecrypt(text, Number(shift));
        break;
      case "substitution":
        result = substitutionDecrypt(text);
        break;
      case "xor":
        if (!key)
          return res
            .status(400)
            .json({ success: false, message: "Key is required" });
        result = xorDecrypt(text, Number(key));
        break;
      case "time-lock":
        result = decryptWithTime(text);
        break;
      case "steganography":
        if (!req.file)
          return res
            .status(400)
            .json({ success: false, message: "Image file is required" });
        result = await extractMessageFromImage(req.file.buffer);
        break;
      case "morse":
        result = morseDecrypt(text);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid algorithm" });
    }

    res.json({ success: true, decrypted: result });
  } catch (error) {
    console.error("❌ Decryption Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error processing decryption" });
  }
};

const chk = async (req, res) => {
  res.json({ success: true, message: "Backend working successfully" });
};

module.exports = { encrypt, decrypt, chk };
