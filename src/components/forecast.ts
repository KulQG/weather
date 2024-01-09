import { Chart, ChartItem } from "chart.js/auto";
import {
  getCurrentTime,
  getCurrentTimeFromTxtDt,
} from "../utils/dateConverter";
import { IDay, IForecastData, TDateString } from "../utils/types";
import { optionsForChart } from "../utils/constants";

export default class Forecast {
  list: IForecastData[];
  currentDate: number;
  sinceTommorowArr: IForecastData[];
  constructor(list: IForecastData[]) {
    this.list = list;
    this.currentDate = getCurrentTime().day!;
    this.sinceTommorowArr = this.list.filter((i) => {
      return +getCurrentTimeFromTxtDt(i.dt_txt).day > this.currentDate
        ? true
        : false;
    });
  }

  private getTwentyFourHoursData(): IForecastData[] {
    const day = [];

    // 9 потому что данные приходят по 3 часа
    for (let i = 1; i < 9; i++) day.push(this.list[i]);
    return day;
  }

  private divideIntoDaysData(): IDay[] {
    const daysData: Record<string, IForecastData[]> = {};
    // const currentDate = getCurrentTime().day!;
    // const sinceTommorowArr = this.list.filter((i) => {
    //   return +getCurrentTimeFromTxtDt(i.dt_txt).day > currentDate
    //     ? true
    //     : false;
    // });

    this.sinceTommorowArr.forEach((forecast) => {
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
    new Chart(document.getElementById("hours") as ChartItem, {
      type: "line",
      data: {
        labels: this.getTwentyFourHoursData().map((item) => {
          const { hours, minutes } = getCurrentTimeFromTxtDt(item.dt_txt);
          return `${hours}:${minutes}`;
        }),
        datasets: [
          {
            label: 'Погода за сутки',
            data: this.getTwentyFourHoursData().map((item) => {
              return item.main.temp
            }),
            borderColor: 'white',
          }
        ]
      },
      options: optionsForChart
    });

    return this.getTwentyFourHoursData();
  }

  getDataForDailyForecast() {

    const mainInfo = this.divideIntoDaysData().map((i) => {
      return this.getMainDataOfADay(i.data);
    })

    new Chart(document.getElementById("days") as ChartItem, {
      type: "line",
      data: {
        labels: mainInfo.map((item) => {
          const { day, month } = getCurrentTimeFromTxtDt(item.dt_txt);
          return `${day}.${month}`;
        }),
        datasets: [
          {
            label: 'Погода за за 5 дней',
            data: mainInfo.map((item) => {
              return item.main.temp
            }),
            borderColor: 'white',
          }
        ]
      },
      options: optionsForChart
    });

    return {
      allDays: this.divideIntoDaysData(),
      mainInfo,
    };
  }
}
