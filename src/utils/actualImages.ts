import { getIcons, getImages } from "./constants";
import { IFullTime, IGetTimeOfDay, TTypeOfWeather } from "./types";

export const getCurImageWeather = (
  weather: TTypeOfWeather,
  currentTime: "day" | "night" = "day"
) => {
  switch (weather) {
    case "Clear": {
      return (currentTime = "day" ? getIcons.clear : getIcons.clearNight);
    }
    case "Clouds": {
      return (currentTime = "day" ? getIcons.cloudySun : getIcons.cloudyNight);
    }
    case "Drizzle": {
      return getIcons.rain;
    }
    case "Rain": {
      return getIcons.rain;
    }
    case "Snow": {
      return getIcons.snow;
    }
    case "Thunderstorm": {
      return getIcons.thunder;
    }
  }
};

export const getActualDecorateImage = (
  weather: TTypeOfWeather,
  currentTime: IGetTimeOfDay,
  timeOfDay: "day" | "night"
) => {
  switch (weather) {
    case "Rain": {
      return getImages.rain;
    }
    case "Snow":
      return getImages.snow;
    case "Thunderstorm":
      return getImages.thunder;
    case "Clear": {
      return timeOfDay === "day" ? getImages.sun : getImages.moon;
    }
    case "Clouds": {
      return getImages.cloudy;
    }
    default: {
      const month = currentTime.month;
      console.log(month);
      if (month! < 3 && month! > 11) {
        return getImages.snow;
      }
      return getImages.default;
    }
  }
};
