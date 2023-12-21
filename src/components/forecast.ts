import {
  getCurrentTime,
  getCurrentTimeFromTxtDt,
} from "../utils/dateConverter";
import { IDay, IForecastData, TDateString } from "../utils/types";

export default class Forecast {
  list: IForecastData[];
  constructor(list: IForecastData[]) {
    this.list = list;
  }

  private getTwentyFourHoursData(): IForecastData[] {
    const day = [];

    // 9 потому что данные приходят по 3 часа
    for (let i = 1; i < 9; i++) day.push(this.list[i]);
    return day;
  }

  private divideIntoDaysData(): IDay[] {
    const daysData: Record<string, IForecastData[]> = {};
    const currentDate = getCurrentTime().day!;
    const sinceTommorowArr = this.list.filter((i) => {
      return +getCurrentTimeFromTxtDt(i.dt_txt).day > currentDate
        ? true
        : false;
    });

    sinceTommorowArr.forEach((forecast) => {
      const { year, month, day } = getCurrentTimeFromTxtDt(forecast.dt_txt);
      const key: TDateString = `${+year}-${+month}-${+day}`;

      if (!daysData[key]) {
        daysData[key] = [];
      }

      daysData[key].push(forecast);
    });

    const result: { day: TDateString; data: IForecastData[] }[] = [];

    for (const key in daysData) {
      result.push({ day: key as TDateString, data: daysData[key] });
    }

    // console.log(result)
    return result;
  }

  private getMainDataOfADay(arr: IForecastData[]): IForecastData {
    let result: IForecastData | undefined;

    arr.forEach((i) => {
      const curHour = +getCurrentTimeFromTxtDt(i.dt_txt).hours!;
      if (curHour === 12) {
        result = i;
      } else if (
        curHour < 12 &&
        (result === undefined ||
          curHour > +getCurrentTimeFromTxtDt(result.dt_txt).hours!)
      ) {
        result = i;
      } else if (
        curHour > 12 &&
        (result === undefined ||
          curHour < +getCurrentTimeFromTxtDt(result.dt_txt).hours!)
      ) {
        result = i;
      }
    });

    return result as IForecastData;
  }

  getDataForHourlyForecast() {
    return this.getTwentyFourHoursData();
  }

  getDataForDailyForecast() {
    return {
      allDays: this.divideIntoDaysData(),
      mainInfo: this.divideIntoDaysData().map((i) => {
        return this.getMainDataOfADay(i.data);
      }),
    };
  }
}
