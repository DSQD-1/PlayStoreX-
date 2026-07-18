import WebApp from "@twa-dev/sdk";

export function initTelegram() {

  WebApp.ready();

  return {
    user: WebApp.initDataUnsafe?.user || null,
    colorScheme: WebApp.colorScheme
  };

}