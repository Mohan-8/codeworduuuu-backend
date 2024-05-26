const emojiAlphabet = [
  "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
  "😋", "😎", "😍", "😘", "🥰", "😗", "😙", "😚", "🙂", "🤗",
  "🤩", "🤔", "🤨", "😐", "😑", "😶"
];

function caesarCipherEncrypt(text, shift) {
  let encryptedText = "";
  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      const shiftAmount = shift % 26;
      const index = char.toLowerCase().charCodeAt(0) - 97;
      const encryptedChar = emojiAlphabet[(index + shiftAmount) % 26];
      encryptedText += encryptedChar;
    } else {
      encryptedText += char;
    }
  }
  return encryptedText;
}

function caesarCipherDecrypt(text, shift) {
  let decryptedText = "";
  for (const char of text) {
    if (emojiAlphabet.includes(char)) {
      const shiftAmount = shift % 26;
      const index = emojiAlphabet.indexOf(char);
      const decryptedChar = String.fromCharCode(
        97 + ((index - shiftAmount + 26) % 26)
      );
      decryptedText += decryptedChar;
    } else {
      decryptedText += char;
    }
  }
  return decryptedText;
}

const chk = async (res) => {
  try {
    res.json({ success: true, message: "Backend working successfully" });
  } catch (error) {
    console.error("Error fetching application data:", error);
    res.json({ success: false, message: "Error fetching application data" });
  }
};

const encrypt = async (req, res) => {
  try {
    const { text } = req.body;
    const shift = 3;
    let result;
    result = caesarCipherEncrypt(text, shift);
    res.send(result);
  } catch (error) {
    console.error("Error fetching application data:", error);
    res.json({ success: false, message: "Error fetching application data" });
  }
};

const decrypt = async (req, res) => {
  try {
    const { text } = req.body;
    const shift = 3;
    let result;
    result = caesarCipherDecrypt(text, shift);
    res.send(result);
  } catch (error) {
    console.error("Error fetching application data:", error);
    res.json({ success: false, message: "Error fetching application data" });
  }
};

module.exports = {
  decrypt,
  encrypt,
  chk,
};
