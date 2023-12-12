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
  getTwentyFourHoursData,
} from "./utils/dateConverter";
import {
  getActualDecorateImage,
  getCurImageWeather,
} from "./utils/actualImages";
import { getForecastCard } from "./components/forecastCard";

getMockData().then((data: IData) => {
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
    getCurrentTime({ month: true }),
    timeOfday
  );
});

getForecastMockData().then((data: IForecastApiResponse) => {
  getTwentyFourHoursData(data.list).forEach((i) => {
    hoursForecast.append(getForecastCard(i));
  });
});
