import "normalize.css";
import "./scss/index.scss";
// import './scss/blocks/main.scss';
import {
  getData,
  getMockData,
  getForecastData,
  getForecastMockData,
} from "./utils/api";
import { IData, IForecastApiResponse, IForecastData } from "./utils/types";
import {
  body,
  city,
  decorateImage,
  feelsLike,
  forecast,
  hoursForecast,
  temp,
  withDegrees,
  typeOfWthr,
  typeOfWthrImg,
} from "./utils/constants";
import {
  convertUnixToRegular,
  getCurrentTime,
  getTimeOfDay,
} from "./utils/dateConverter";
import {
  divideIntoDaysData,
  getMainDataOfADayArr,
  getTwentyFourHoursData,
} from "./utils/dataHandlers";
import {
  getActualDecorateImage,
  getCurImageWeather,
} from "./utils/actualImages";
import { getForecastCard } from "./components/forecastCard";

getData().then((data: IData) => {
  const typeOfWeather = data.weather[0];

  city.textContent = data.name;
  temp.textContent = withDegrees(data.main.temp);
  typeOfWthr.textContent = `${typeOfWeather.description}`;
  feelsLike.textContent = withDegrees(data.main.feels_like);

  const sunrise = convertUnixToRegular(data.sys.sunrise);
  const sunset = convertUnixToRegular(data.sys.sunset);

  const timeOfday = getTimeOfDay(
    getCurrentTime(),
    {
      hour: +sunrise.hours,
      minutes: +sunrise.minutes,
      seconds: +sunrise.seconds,
    },
    {
      hour: +sunset.hours,
      minutes: +sunset.minutes,
      seconds: +sunset.seconds,
    }
  );

  if (timeOfday === "night") {
    body!.style.backgroundColor = "#080D30";
  }

  typeOfWthrImg.src = getCurImageWeather(typeOfWeather.main, timeOfday);
  typeOfWthrImg.alt = typeOfWeather.description;

  decorateImage.src = getActualDecorateImage(
    typeOfWeather.main,
    getCurrentTime(),
    timeOfday
  );
});

getForecastData().then((data: IForecastApiResponse) => {
  const list = data.list;
  getTwentyFourHoursData(list).forEach((i) => {
    hoursForecast.append(getForecastCard(i));
  });

  divideIntoDaysData(list)
    .map((i) => {
      return getMainDataOfADayArr(i.data);
    })
    .forEach((i) => {
      forecast.append(getForecastCard(i, "day"));
    });
});
