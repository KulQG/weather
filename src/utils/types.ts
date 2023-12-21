export type TTypeOfWeather =
  | "Thunderstorm"
  | "Clouds"
  | "Clear"
  | "Snow"
  | "Rain"
  | "Drizzle";

export interface IGetTimeOfDay {
  hour: number;
  minutes: number;
  seconds: number;
  day?: number;
  month?: number;
}

export interface IFullTime {
  year: number;
  month: string;
  day: string;
  hours: string;
  minutes: string;
  seconds: string;
  formattedDate: string;
}

export interface IData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: TTypeOfWeather;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface IForecastApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: IForecastData[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export type TDateTimeString =
  `${number}-${number}-${number} ${number}:${number}:${number}`;

export type TDateString = `${number}-${number}-${number}`;

export interface IForecastData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: TTypeOfWeather;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: TDateTimeString;
}

export interface IDay {
  day: TDateString;
  data: IForecastData[];
}

export type TTimeFromTxt =
  | {
      hours: string;
      minutes: string;
      seconds: string;
      fulltime: string[];
      day: string;
      month: string;
      year: string;
      fullDate: string[];
    }
  | {
      day: string;
      month: string;
      year: string;
      hours?: undefined;
      minutes?: undefined;
      seconds?: undefined;
      fulltime?: undefined;
      fullDate?: undefined;
    };
