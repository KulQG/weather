import { findSelector, popupDaily, popupWrapDaily } from "../utils/constants";
import { IForecastData, TTimeFromTxt } from "../utils/types";
import { ForecastCard } from "./forecastCard";

export function getPopupOfDay(data: IForecastData[], time: TTimeFromTxt) {
  const activeStyle = "popup-daily-wrap_active";
  const closeIcon = popupDaily.querySelector(".close-icon")!;

  popupWrapDaily.classList.add(activeStyle);

  popupDaily.querySelector(
    ".title"
  )!.textContent = `Погода на ${time.day}.${time.month}`;

  const dataWrapper = popupDaily.querySelector(".data")!;
  data.forEach((i) => {
    dataWrapper.append(new ForecastCard(i).render());
  });

  function close(e: Event) {
    if (e.currentTarget === e.target) {
      popupWrapDaily.classList.remove(activeStyle);

      dataWrapper.querySelectorAll(".card").forEach((i) => {
        dataWrapper.removeChild(i);
      });

      closeIcon.removeEventListener("click", close);
      popupWrapDaily.removeEventListener("click", close);
    }
  }

  closeIcon.addEventListener("click", close);
  popupWrapDaily.addEventListener("click", close);
}
