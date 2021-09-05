const title = "Fun Group Chat";
const description =
  "A simple fun group chat app built with Firebase, NuxtJs and Vuetify.";

export default {
  titleTemplate: "%s - Fun Group Chat",
  title,
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      hid: "description",
      name: "description",
      content: description
    },
    {
      hid: "og:site_name",
      name: "og:site_name",
      content: title
    },
    {
      hid: "apple-mobile-web-app-title",
      name: "apple-mobile-web-app-title",
      content: title
    },
    {
      hid: "og:title",
      name: "og:title",
      content: title
    },
    { name: "format-detection", content: "telephone=no" }
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
};
