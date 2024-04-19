import { useEffect, useState } from "react";
import validateUser from "../actions";
import { TelegramWebApps } from "telegram-webapps-types-new";

/**
 * Hook to get the initial data from the Telegram Web Apps API already parsed.
 * @example
 * const { hash } = useTelegramInitData();
 * console.log({ hash });
 */

function useTelegramInitData() {
  const [data, setData] = useState<TelegramWebApps.WebAppInitData>({});
  const [webApp, setWebAPP] = useState<TelegramWebApps.WebApp>();
  const [isHashValid, setIsHashValid] = useState(true);

  // Wait for validation to complete before rendering the page and stop the
  // rendering if the hash is invalid. Comment out the following useEffect
  // hook to see the page render without the hash validation.
  useEffect(() => {
    async function getData() {
      await validateUser(window.Telegram?.WebApp.initData).then((result) =>
        setIsHashValid(result)
      );

      if (isHashValid) {
        const firstLayerInitData = Object.fromEntries(
          new URLSearchParams(window.Telegram?.WebApp.initData)
        );

        const initData: Record<string, string> = {};

        for (const key in firstLayerInitData) {
          try {
            initData[key] = JSON.parse(firstLayerInitData[key]);
          } catch {
            initData[key] = firstLayerInitData[key];
          }
        }
        window.Telegram?.WebApp.ready();
        window.Telegram?.WebApp.enableClosingConfirmation();
        setData(initData);
        setWebAPP(window.Telegram?.WebApp);
      }
    }

    getData();
  }, [isHashValid]);

  return { isHashValid, data, webApp };
}

export default useTelegramInitData;
