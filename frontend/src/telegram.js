import WebApp from "@twa-dev/sdk";

export function initTelegram() {

  try {
    WebApp.ready();

    return {
      user: WebApp.initDataUnsafe?.user || null,
      colorScheme: WebApp.colorScheme,
    };

  } catch (error) {

    return {
      user: null,
      colorScheme: "light",
    };

  }
}