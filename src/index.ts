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
  hoursForecast,
  temp,
  withDegrees,
  typeOfWthr,
  typeOfWthrImg,
  forecastWrap,
  addInfoBtn,
  infoBlockAdditional,
  infoBlockPush,
} from "./utils/constants";
import {
  convertUnixToRegular,
  getCurrentTime,
  getTimeOfDay,
} from "./utils/dateConverter";
import {
  getActualDecorateImage,
  getCurImageWeather,
} from "./utils/actualImages";
import { ForecastCardDaily, ForecastCard } from "./components/forecastCard";
import Forecast from "./components/forecast";
// import icon from './images/icons/arrow.png';

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
    addInfoBtn.style.backgroundColor = "#080D30";
  }

  typeOfWthrImg.src = getCurImageWeather(typeOfWeather.main, timeOfday);
  typeOfWthrImg.alt = typeOfWeather.description;

  decorateImage.src = getActualDecorateImage(
    typeOfWeather.main,
    getCurrentTime(),
    timeOfday
  );

  addInfoBtn.addEventListener("click", () => {
    if (!infoBlockAdditional.classList.contains("info_active")) {
      if (infoBlockAdditional.classList.contains("info_disactive")) {
        infoBlockAdditional.classList.remove("info_disactive");
      }
      infoBlockAdditional.classList.add("info_active");

      infoBlockPush("pressure", data.main.pressure);
      infoBlockPush("humidity", data.main.humidity);
      infoBlockPush("sea_level", data.main.sea_level);
      infoBlockPush("visibility", data.visibility);
      infoBlockPush("speed", data.wind.speed);
      infoBlockPush("sunrise", `${sunrise.hours}:${sunrise.minutes}`);
      infoBlockPush("sunset", `${sunset.hours}:${sunset.minutes}`);
    } else {
      infoBlockAdditional.classList.remove("info_active");
      infoBlockAdditional.classList.add("info_disactive");
    }
  });
});

getForecastData().then((data: IForecastApiResponse) => {
  const forecast = new Forecast(data.list);

  forecast.getDataForHourlyForecast().forEach((item) => {
    const card = new ForecastCard(item).render();
    hoursForecast.append(card);
  });

  const { allDays, mainInfo } = forecast.getDataForDailyForecast();
  // console.log(forecast.getDataForDailyForecast())
  mainInfo.forEach((i, index) => {
    const card = new ForecastCardDaily(i, allDays[index].data);
    forecastWrap.append(card.getCard());
  });

  // console.log(allDays)
});
