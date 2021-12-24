const apiKey = process.env.IFRAME_KEY;
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

const generateMedia = () => {



};
