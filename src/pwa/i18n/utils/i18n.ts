// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    booking_error: {
      page_title: "Booking Error",
      error_message: "Something went wrong",
      retry_button: "Try again",
    },
    other_namespace: {
      welcome: "Welcome!",
      description: "This is description",
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
