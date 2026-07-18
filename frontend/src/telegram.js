import WebApp from "@twa-dev/sdk";


export function initTelegram() {


  WebApp.ready();


  WebApp.expand();



  const user = WebApp.initDataUnsafe?.user;



  console.log(
    "Telegram user:",
    user
  );



  return {

    user: user || null,

    colorScheme: WebApp.colorScheme

  };


}