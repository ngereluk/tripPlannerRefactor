import { string } from "zod";

export interface tripCoordObj {
  coordinate: number[];
  isTrailHead: boolean;
  markerName: string;
}

export interface SegmentData {
  segmentGrossElevation: number;
  segmentLength: number;
}

export interface ItineraryObj {
  isNight: boolean;
  isDay: boolean;
  dailyElevation: number;
  dailyDistance: number;
  markerName: string;
}

export interface Forecast {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  description: string;
  days: DailyWeather[];
  alerts: [];
  currentConditions: CurrentConditions;
}

export interface DailyWeather {
  datetime: string;
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype: string[];
  snow: number;
  snowdepth: number;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  description: string;
  icon: string;
  stations: string[];
  source: string;
  hours: HourlyForecast[];
}

export interface HourlyForecast {
  cloudcover: number;
  conditions: string;
  datetime: string;
  datetimeEpoch: number;
  dew: number;
  feelslike: number;
  humidity: number;
  icon: string;
  precip: number;
  precipprob: number;
  preciptype: null;
  pressure: number;
  severerisk: number;
  snow: number;
  snowdepth: number;
  solarenergy: number;
  solarradiation: number;
  source: string;
  stations: string[];
  temp: number;
  uvindex: number;
  visibility: number;
  winddir: number;
  windgust: number;
  windspeed: number;
}

export interface CurrentConditions {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  precipprob: number;
  snow: number;
  snowdepth: number;
  preciptype: null;
  windgust: null;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: null;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  conditions: string;
  icon: string;
  stations: string[];
  source: string;
  sunrise: string;
  sunriseEpoch: number;
  sunset: string;
  sunsetEpoch: number;
  moonphase: number;
}

export interface SiteInfoPanelData {
  name: string;
  noSites: number;
  coordinates: string;
  park: string;
  description: string;
  imageUrl: string;
  waterSource: string;
  amenities: string[][];
  isCampsite: boolean;
  linkToGovtSite: string;
}

export interface NameAndCoordinates {
  coordinates: number[];
  markerName: string;
}
