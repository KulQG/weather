import { IForecastData, IFullTime, IGetTimeOfDay, TDateTimeString } from "./types";

export function convertUnixToRegular(unixTimestamp: number): IFullTime {
  const date = new Date(unixTimestamp * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    formattedDate,
  };
}

export function getCurrentTime(optional?: {
  month?: boolean;
  day?: boolean;
}): IGetTimeOfDay {
  const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const time = { hour: +hours, minutes: +minutes, seconds: +seconds };

  if (optional) {
    const curMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDay()).padStart(2, "0");
    if (optional.month) {
      return { ...time, month: +curMonth };
    } else if (optional.day) {
      return { ...time, day: +day };
    } else if (optional.month && optional.day) {
      return { ...time, day: +day, month: +curMonth };
    }
  }

  return time;
}

export function getTimeOfDay(
  curTime: IGetTimeOfDay,
  sunrise: IGetTimeOfDay,
  sunset: IGetTimeOfDay
): "day" | "night" {
  const currentTimestamp =
    curTime.hour * 3600 + curTime.minutes * 60 + curTime.seconds;
  const sunriseTimestamp =
    sunrise.hour * 3600 + sunrise.minutes * 60 + sunrise.seconds;
  const sunsetTimestamp =
    sunset.hour * 3600 + sunset.minutes * 60 + sunset.seconds;

  if (
    currentTimestamp >= sunriseTimestamp &&
    currentTimestamp < sunsetTimestamp
  ) {
    return "day";
  } else {
    return "night";
  }
}

export function getCurrentTimeFromTxtDt(date: TDateTimeString) {
  const time = date.split(" ")[1];
  const timeArr = time.split(":");

  const datee = date.split(" ")[0];
  const dateArr = datee.split("-");

  return {
    hours: timeArr[0],
    minutes: timeArr[1],
    seconds: timeArr[2],
    fulltime: time,

    day: dateArr[2],
    month: dateArr[1],
    year: dateArr[0],
    fullDate: datee,
  };
}



export function getTwentyFourHoursData(arr: IForecastData[])  {
  const day = []

  // 9 потому что данные приходят по 3 часа
  for (let i = 1; i < 10; i++) day.push(arr[i])
  return day;
}
