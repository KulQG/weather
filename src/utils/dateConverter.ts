import {
  IForecastData,
  IFullTime,
  IGetTimeOfDay,
  TDateTimeString,
  TTimeFromTxt,
} from "./types";

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

export function getCurrentTime(): IGetTimeOfDay {
  const currentDate = new Date();
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const curMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = currentDate.getDate();

  return {
    hour: +hours,
    minutes: +minutes,
    seconds: +seconds,
    month: +curMonth,
    day: day,
  };
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

export function getCurrentTimeFromTxtDt(
  date: TDateTimeString | `${number}-${number}-${number}`
): TTimeFromTxt {
  const [datePart, timePart] = date.split(" ");
  const [year, month, day] = datePart.split("-");
  const [hours, minutes, seconds] = timePart.split(":");

  if (hours || minutes || seconds) {
    return {
      hours,
      minutes,
      seconds,
      fulltime: [hours, minutes, seconds],

      day,
      month,
      year,
      fullDate: [year, month, day],
    };
  } else {
    return { day, month, year };
  }
}
