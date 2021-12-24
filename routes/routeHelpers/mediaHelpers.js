const providers = require("./json/providers.json");
const axios = require("axios");

const omebed = (url) => {
  for (const provider of providers) {
    const { endpoints, provider_url } = provider;
    const { schemes, url: oembedURL } = endpoints[0];
    const urlRegex2 = new RegExp(provider_url + "*");
    const matched = urlRegex2.test(url);
    if (matched) return oembedURL;
    if (schemes) {
      for (const str of schemes) {
        const urlRegex = new RegExp(str);
        const match = urlRegex.test(url);
        if (match) return oembedURL;
      }
    }
  }
};

const generateMedia = (omebedUrl, encodedURI, url) => {
  let media_url;
  let is_video;

  try {
    const videoData = await axios.get(
      `${omebedUrl}?url=${encodedURI}&format=json`
    );
    const source = videoData.data.html
      .split(" ")
      .filter((attribute) => attribute.includes("src"))[0]
      .slice(4)
      .replace(`"`, "");
    media_url = source;
    is_video = true;
  } catch (e) {
    media_url = `https://api.screenshotmachine.com?key=${process.env.APIKEY}&url=${url}&dimension=1024x768&zoom=200`;
    is_video = false;
  };

  return [media_url, is_video];
};

module.exports = { generateMedia };
