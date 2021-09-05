const appName = process.env.APP_NAME;
const appShortName = process.env.APP_SHORT_NAME;
const appDescription = process.env.APP_DESCRIPTION;

export default {
  manifest: {
    name: appName,
    short_name: appShortName,
    description: appDescription,
    lang: "en"
  },
  meta: {
    name: appName,
    description: appDescription
  },
  workbox: {
    importScripts: ["/firebase-auth-sw.js"],
    // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
    // only set this true for testing and remember to always clear your browser cache in development
    dev: process.env.NODE_ENV === "development"
  }
};
