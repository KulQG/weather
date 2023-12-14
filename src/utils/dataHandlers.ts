import { getCurrentTime, getCurrentTimeFromTxtDt } from "./dateConverter";
import { IDay, IForecastData, TDateString } from "./types";

export function getTwentyFourHoursData(arr: IForecastData[]) {
  const day = [];

  // 9 потому что данные приходят по 3 часа
  for (let i = 1; i < 9; i++) day.push(arr[i]);
  return day;
}

export function divideIntoDaysData(arr: IForecastData[]): IDay[] {
  const daysData: Record<string, IForecastData[]> = {};
  const currentDate = getCurrentTime().day!;
  const sinceTommorowArr = arr.filter((i) => {
    return +getCurrentTimeFromTxtDt(i.dt_txt).day > currentDate ? true : false;
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

  return result;
}

export function getMainDataOfADayArr(arr: IForecastData[]) {
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
  console.log(result)

  return result as IForecastData;
}
