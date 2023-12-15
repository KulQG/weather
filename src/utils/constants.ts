import cloudyMoon from "../images/icons/cloudy_moon.png";
import clearSun from "../images/icons/sunny.svg";
import clearNight from "../images/icons/moon.svg";
import cloudySun from "../images/icons/cloudy_sun.svg";
import thunder from "../images/icons/thunder.svg";
import rainy from "../images/icons/rainy.svg";
import snowy from "../images/icons/snowy.svg";
import overCloudySun from "../images/icons/over_cloudy_sun.svg";
import bigRain from "../images/rain.png";
import bigSun from "../images/sun.png";
import bigThunder from "../images/thunder.png";
import bigSnow from "../images/snow.png";
import bigMoon from "../images/moon.png";
import defaultBig from "../images/default.png";
import bigCloudy from "../images/cloud.png";

let currentCoordinates: { lat: string; lon: string } = {
  lat: "56.3287",
  lon: "44.002",
};

const key = "48474b8ff8a6184373bfde339a8a662b";
const mainAdress = "https://api.openweathermap.org/data/2.5/";
const adressData = `lat=${currentCoordinates.lat}&lon=${currentCoordinates.lon}&units=metric&lang=ru&appid=${key}`;
export const address = `${mainAdress}weather?${adressData}`;
export const forecastAdress = `${mainAdress}forecast?${adressData}`;

export const findSelector = (selector: string) => {
  return document.querySelector(`.${selector}`)!;
};

export const body = document.body;
export const city = findSelector("city");
export const temp = findSelector("celsius");
export const typeOfWthr = findSelector("type-of-weather");
export const feelsLike = findSelector("feels-like");
export const typeOfWthrImg = findSelector(
  "type-of_wthr_img"
) as HTMLImageElement;
export const decorateImage = findSelector("decorate") as HTMLImageElement;

export const hoursForecast = findSelector("forecast-hours-block");
export const templateHoursForeacstCard = findSelector(
  "template-hours-forecast-card"
) as HTMLTemplateElement;

export const forecastWrap = findSelector("forecast-block");
export const templateForecastCard = findSelector(
  "template-forecast-card"
) as HTMLTemplateElement;

export const pushSrcToImg = (src: string) => {
  return `<%=require('${src}')%>`;
};

export const withDegrees = (temp: number) => {
  return `${Math.round(temp)}°`
}

export const getIcons = {
  clear: clearSun,
  cloudyNight: cloudyMoon,
  clearNight: clearNight,
  cloudySun: cloudySun,
  thunder: thunder,
  rain: rainy,
  snow: snowy,
  reallyCloudy: overCloudySun,
};

export const getImages = {
  rain: bigRain,
  thunder: bigThunder,
  snow: bigSnow,
  sun: bigSun,
  moon: bigMoon,
  cloudy: bigCloudy,
  default: defaultBig,
};
