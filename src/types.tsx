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

export interface TripInfoObj {
  coordinate?: number[];
  isTrailHead?: boolean;
  markerName?: string;
  segmentGrossElevation?: number;
  segmentLength?: number;
}

export interface MyGeoJson {
  bbox: number[];
  features: MyGeoJsonFeatures[];
  metadata: MyGeoJsonMetadata;
  type: string;
}

export interface MyGeoJsonFeatures {
  bbox: number[];
  type: string;
  properties: MyGeoJsonFeaturesProperities;
  geometry: MyGeoJsonFeaturesGeometry;
}

export interface MyGeoJsonFeaturesProperities {
  ascent: number;
  descent: number;
  segments: MyGeoJsonFeaturesProperitiesSegments[];
  summary: MyGeoJsonFeaturesProperitiesSummary;
  way_points: number[];
  type: string;
}

export interface MyGeoJsonFeaturesProperitiesSegments {
  ascent: number;
  descent: number;
  distance: number;
  duration: number;
  steps: MyGeoJsonFeaturesProperitiesSegmentsSteps[];
}

export interface MyGeoJsonFeaturesProperitiesSegmentsSteps {
  distance: number;
  duration: number;
  instruction: string;
  name: string;
  type: number;
  way_points: number[];
}

export interface MyGeoJsonFeaturesProperitiesSummary {
  distance: number;
  duration: number;
}

export interface MyGeoJsonFeaturesGeometry {
  coordinates: number[][];
  type: string;
}

export interface MyGeoJsonMetadata {
  attribution: string;
  service: string;
  timestamp: number;
  query: MyGeoJsonMetadataQuery;
  engine: MyGeoJsonMetadataEngine;
}

export interface MyGeoJsonMetadataQuery {
  coordinates: number[][];
  elevation: boolean;
  format: string;
  profile: string;
}

export interface MyGeoJsonMetadataEngine {
  build_date: string;
  graph_date: string;
  version: string;
}

export interface AddressObj {
  geometry: AddressGeometry;
  properties: AddressProperities;
  type: string;
}

export interface AddressGeometry {
  coordinates: number[];
  type: string;
}

export interface AddressProperities {
  accuracy: string;
  confidence: number;
  continent: string;
  continent_gid: string;
  country: string;
  country_a: string;
  country_gid: string;
  county: string;
  county_gid: string;
  gid: string;
  housenumber: string;
  id: string;
  label: string;
  layer: string;
  locality?: string;
  locality_gid: string;
  match_type: string;
  name: string;
  region: string;
  region_a: string;
  region_gid: string;
  source: string;
  source_id: string;
  street: string;
  postalcode?: string;
}
