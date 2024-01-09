import { getCurImageWeather } from "../utils/actualImages";
import { templateForecastCard, withDegrees } from "../utils/constants";
import { getCurrentTimeFromTxtDt } from "../utils/dateConverter";
import { IForecastData, TTimeFromTxt, TTypeOfWeather } from "../utils/types";
import { getPopupOfDay } from "./popup";

export class ForecastCard {
  data: IForecastData;
  typeOfWeather: TTypeOfWeather;
  time: TTimeFromTxt;
  opened: boolean;
  _template: DocumentFragment;
  cardElement: Element;
  _imageElement: HTMLImageElement;
  _title: Element;
  _subtitle: Element;
  constructor(data: IForecastData) {
    this.data = data;
    this.typeOfWeather = this.data.weather[0].main;
    this.time = getCurrentTimeFromTxtDt(this.data.dt_txt);
    this.opened = false;
    this._template = document.importNode(templateForecastCard.content, true);
    this.cardElement = this._template.querySelector(".card")!;
    this._imageElement = this.cardElement.querySelector(".img")!;
    this._title = this.cardElement.querySelector(".title")!;
    this._subtitle = this.cardElement.querySelector(".subtitle")!;
  }

  toggleState() {
    this.opened = !this.opened;
  }

  render() {
    this._title.textContent = withDegrees(this.data.main.temp);

    this._imageElement.src = getCurImageWeather(this.typeOfWeather);
    this._imageElement.alt = this.typeOfWeather;

    const { hours, minutes } = this.time;
    this._subtitle.textContent = `${hours}:${minutes}`;

    return this.cardElement;
  }
}

export class ForecastCardDaily extends ForecastCard {
  dayInfo: IForecastData[];

  constructor(data: IForecastData, dayInfo: IForecastData[]) {
    super(data);
    this.dayInfo = dayInfo;
    this.getEventListeners();
    // console.log(dayInfo)
  }

  getEventListeners() {
    this.cardElement.addEventListener("click", () => {
      this.toggleState();
      getPopupOfDay(this.dayInfo, this.time);
      // this.getCard();
    });
  }

  getCard() {
    this._title.textContent = !this.opened
      ? withDegrees(this.data.main.temp)
      : "Ай!";
    this._imageElement.src = getCurImageWeather(this.typeOfWeather);
    this._imageElement.alt = this.typeOfWeather;

    const { day, month } = this.time;
    this._subtitle.textContent = `${day}.${month}`;

    return this.cardElement;
  }
}
