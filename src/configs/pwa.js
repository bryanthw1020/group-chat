export default {
  manifest: {
    lang: "en"
  },
  workbox: {
    importScripts: ["/firebase-auth-sw.js"],
    // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
    // only set this true for testing and remember to always clear your browser cache in development
    dev: process.env.NODE_ENV === "development"
  }
};
