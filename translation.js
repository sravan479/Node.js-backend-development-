const express = require('express');
const { Translation } = require('../models/Translation');
const axios = require('axios');
const router = express.Router();

router.post('/translate', async (req, res) => {
  const { text, targetLanguage, userId } = req.body;

  try {
    const apiKey = process.env.TRANSLATION_API_KEY; 
    const response = await axios.post('https://translation-api-url.com', {
      q: text,
      target: targetLanguage,
      key: apiKey,
    });

    const translatedText = response.data.data.translations[0].translatedText;

    const newTranslation = new Translation({
      userId,
      text,
      translatedText,
      targetLanguage,
    });

    await newTranslation.save();
    res.json(newTranslation);
  } catch (err) {
    res.status(500).json({ error: 'Translation failed' });
  }
});

module.exports = router;
