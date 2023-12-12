import axios, { AxiosResponse } from "axios";
import { address, forecastAdress } from "./constants";
import { IData, IForecastApiResponse } from "./types";
import { mockForecast, weatherData } from "./mocks";

export const getData = async (): Promise<IData> => {
  return axios
    .get(address)
    .then((res: AxiosResponse) => {
      if (res) return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getForecastData = async (): Promise<IForecastApiResponse> => {
  return axios
    .get(forecastAdress)
    .then((res: AxiosResponse) => {
      if (res) return res.data;
      else throw new Error();
    })
    .catch((err) => console.log(err));
};

export const getMockData = async (): Promise<IData> => {
  return new Promise((resolve, reject) => {
    resolve(weatherData);
  });
};

export const getForecastMockData = async (): Promise<IForecastApiResponse> => {
  return new Promise((resolve, reject) => {
    resolve(mockForecast);
  });
}
