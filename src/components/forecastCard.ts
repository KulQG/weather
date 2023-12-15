import { getCurImageWeather } from "../utils/actualImages";
import {
  templateForecastCard,
  templateHoursForeacstCard,
  withDegrees,
} from "../utils/constants";
import { getCurrentTimeFromTxtDt } from "../utils/dateConverter";
import { IForecastData, TTimeFromTxt, TTypeOfWeather } from "../utils/types";

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

  cardElement.querySelector(".title")!.textContent = withDegrees(
    data.main.temp
  );

  imageElement.src = getCurImageWeather(typeOfWeather);
  imageElement.alt = typeOfWeather;

  const time = getCurrentTimeFromTxtDt(data.dt_txt);
  const subtitle = cardElement.querySelector(".subtitle")!;
  if (type === "hours") {
    const { hours, minutes } = time;
    subtitle.textContent = `${hours}:${minutes}`;
  } else {
    const { day, month } = time;
    subtitle.textContent = `${day}.${month}`;
  }

  return cardElement;
}

export class ForecastCard {
  data: IForecastData;
  typeOfWeather: TTypeOfWeather;
  time: TTimeFromTxt;
  opened: boolean;
  constructor(data: IForecastData) {
    this.data = data;
    this.typeOfWeather = this.data.weather[0].main;
    this.time = getCurrentTimeFromTxtDt(this.data.dt_txt);
    this.opened = false;
  }

  toggleState() {
    this.opened = !this.opened
  }
}

export class ForecastCardHourly extends ForecastCard {
  #template: DocumentFragment;
  cardElement: Element;
  #imageElement: HTMLImageElement;
  #title: Element;
  #subtitle: Element;
  constructor(data: IForecastData) {
    super(data);
    this.#template = document.importNode(
      templateHoursForeacstCard.content,
      true
    );
    this.cardElement = this.#template.querySelector(".card")!;
    this.#imageElement = this.cardElement.querySelector(".img")!;
    this.#title = this.cardElement.querySelector(".title")!;
    this.#subtitle = this.cardElement.querySelector(".subtitle")!;
  }

  render() {
    this.#title.textContent = withDegrees(this.data.main.temp);

    this.#imageElement.src = getCurImageWeather(this.typeOfWeather);
    this.#imageElement.alt = this.typeOfWeather;

    const { hours, minutes } = this.time;
    this.#subtitle.textContent = `${hours}:${minutes}`;

    return this.cardElement;
  }
}

export class ForecastCardDaily extends ForecastCard {
  #template: DocumentFragment;
  cardElement: Element;
  #imageElement: HTMLImageElement;
  #title: Element;
  #subtitle: Element;
  dayInfo: IForecastData[];

  constructor(data: IForecastData, dayInfo: IForecastData[]) {
    super(data);
    this.#template = document.importNode(templateForecastCard.content, true);
    this.cardElement = this.#template.querySelector(".card")!;
    this.#imageElement = this.cardElement.querySelector(".img")!;
    this.#title = this.cardElement.querySelector(".title")!;
    this.#subtitle = this.cardElement.querySelector(".subtitle")!;
    this.dayInfo = dayInfo;
    this.getEventListeners()
  }

  getEventListeners() {
    this.cardElement.addEventListener("click", () => {
      this.toggleState();
      this.getCard()
    });
  }

  getCard() {
    this.#title.textContent = !this.opened
      ? withDegrees(this.data.main.temp)
      : "Ай!";

    this.#imageElement.src = getCurImageWeather(this.typeOfWeather);
    this.#imageElement.alt = this.typeOfWeather;

    const { day, month } = this.time;
    this.#subtitle.textContent = `${day}.${month}`;

    return this.cardElement;
  }
}
