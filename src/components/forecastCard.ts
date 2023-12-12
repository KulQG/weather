import { getCurImageWeather } from "../utils/actualImages";
import {
  templateForecastCard,
  templateHoursForeacstCard,
  withDegrees,
} from "../utils/constants";
import { getCurrentTimeFromTxtDt } from "../utils/dateConverter";
import { IForecastData } from "../utils/types";

export function getForecastCard(
  data: IForecastData,
  type: "hours" | "day" = "hours"
) {
  const typeOfWeather = data.weather[0].main;

  const template = document.importNode(
    type === "hours"
      ? templateHoursForeacstCard.content
      : templateForecastCard.content,
    true
  );
  const cardElement = template.querySelector(".card")!;
  const imageElement: HTMLImageElement = cardElement.querySelector(".img")!;

  cardElement.querySelector(".title")!.textContent = withDegrees(data.main.temp);

  imageElement.src = getCurImageWeather(typeOfWeather);
  imageElement.alt = typeOfWeather;

  const time = getCurrentTimeFromTxtDt(data.dt_txt);
  const subtitle = cardElement.querySelector(".subtitle")!;
  if (type === "hours") {
    const curHour = time.hours;
    const curMinutes = time.minutes;
    subtitle.textContent = `${curHour}:${curMinutes}`;
  } else {
    const curDay = time.day;
    const curMonth = time.month;
    subtitle.textContent = `${curDay}.${curMonth}`;
  }

  return cardElement;
}
