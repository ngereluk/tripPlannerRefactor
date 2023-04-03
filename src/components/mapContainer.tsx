import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { RightHandMenu } from "./rightHandMenu";
import { tripCoordObj, SegmentData, Forecast, MyGeoJson } from "../types";
import MapLegend from "./mapLegend";
import MapTopMenu from "./mapTopMenu";
import KananaskisMap from "../components/kananaskisMap";
import LoadingMsg from "../components/loadingMsg";

interface myMapContainerProps {
  geojsonObjects: MyGeoJson[];
  setGeojsonObjects: Dispatch<SetStateAction<MyGeoJson[]>>;
  zoomToSiteCoord: {
    lat: number;
    lng: number;
  };
  setZoomToSiteCoord: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
}
const MyMapContainer = ({
  geojsonObjects,
  setGeojsonObjects,
  zoomToSiteCoord,
  setZoomToSiteCoord,
}: myMapContainerProps) => {
  const [coordinatesArray, setCoordinatesArray] = useState<
    {
      long: number;
      lat: number;
    }[]
  >([]);
  const [tripCoordWithBool, setTripCoordWithBool] = useState<tripCoordObj[]>(
    []
  );
  const [segmentCoordinates, setSegmentCoordinates] = useState<SegmentData[]>(
    []
  );
  const [tripInfoViz, setTripInfoViz] = useState(false);
  const [tripInfoTitleViz, setTripInfoTitleViz] = useState(false);
  const [tripForecastTitleViz, setTripForecastTitleViz] = useState(false);
  const [tripForecastViz, setTripForecastViz] = useState(false);
  const [siteInfoPanelViz, setSiteInfoPanelViz] = useState(false);
  const [lastClickedLong, setLastClickedLong] = useState<number>(0);
  const [siteMenuViz, setSiteMenuViz] = useState(true);
  const [userError, setUserError] = useState("");
  const [tripForecast, setTripForecast] = useState<Forecast>();
  const [tripInfoIsLoading, setTripInfoIsLoading] = useState<boolean>(false);
  const [tripInfoLoadingError, setTripInfoLoadingError] =
    useState<boolean>(false);
  const [routeDataLoading, setRouteDataLoading] = useState<boolean>(false);
  const [routeDataError, setRouteDataError] = useState<boolean>(false);

  useEffect(() => {
    if (tripInfoLoadingError) {
      setUserError("Failed to load data. Please refresh the page.");
    }
  }, [tripInfoLoadingError]);

  useEffect(() => {
    if (routeDataError) {
      setUserError("Failed to load data. Please refresh the page.");
    }
  }, [routeDataError]);

  return (
    <MapContainer
      center={[50.814061, -115.163614]}
      zoom={10}
      scrollWheelZoom={false}
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
      zoomControl={false}
    >
      {" "}
      <div
        style={{
          position: "absolute",
          zIndex: "10002",
          display: "flex",
          padding: "1%",
          backgroundColor: "white",
          paddingTop: "1%",
          left: "86%",
          top: "75%",
          width: "10%",
          borderRadius: "25px",
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
          alignItems: "center",
          justifyContent: "flex-start",
          cursor: "pointer",
        }}
      >
        <MapLegend />
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: "10002",
          display: userError === "" ? "none" : "flex",
          padding: "1%",
          backgroundColor: "white",
          paddingTop: "1%",
          left: "85%",
          top: "2%",
          width: "10%",
          borderRadius: "25px",
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            paddingTop: "10%",
            paddingRight: "2%",
          }}
        >
          <img src="/alert.svg" style={{ height: "2vh" }} />
        </div>
        <div style={{ paddingRight: "7%", paddingLeft: "7%" }}>
          <div style={{ color: "black", fontWeight: "bold" }}>{userError}</div>
        </div>
        <div
          onClick={() => {
            setUserError("");
          }}
        >
          <img src="/close.svg" style={{ height: "1.5vh" }} />
        </div>
      </div>
      <div
        style={{
          display: routeDataLoading ? "block" : "none",
          position: "absolute",
          zIndex: "10002",
          backgroundColor: "white",
          padding: "5%",
          left: "40%",
          top: "30%",
          width: "20%",
          borderRadius: "25px",
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <LoadingMsg />
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          color: "black",
          zIndex: "10001",
          width: "30%",
          paddingTop: "1%",
          paddingLeft: "1%",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <RightHandMenu
            setZoomToSiteCoord={setZoomToSiteCoord}
            tripCoordWithBool={tripCoordWithBool}
            segmentCoordinates={segmentCoordinates}
            tripInfoViz={tripInfoViz}
            setTripInfoViz={setTripInfoViz}
            tripInfoTitleViz={tripInfoTitleViz}
            tripForecastViz={tripForecastViz}
            setTripForecastViz={setTripForecastViz}
            siteInfoPanelViz={siteInfoPanelViz}
            setSiteInfoPanelViz={setSiteInfoPanelViz}
            setLastClickedLong={setLastClickedLong}
            setSiteMenuViz={setSiteMenuViz}
            siteMenuViz={siteMenuViz}
            tripForecastTitleViz={tripForecastTitleViz}
            tripForecast={tripForecast}
            setTripForecast={setTripForecast}
            tripInfoIsLoading={tripInfoIsLoading}
          />
        </div>
        <KananaskisMap
          geojsonObjects={geojsonObjects}
          setGeojsonObjects={setGeojsonObjects}
          zoomToSiteCoord={zoomToSiteCoord}
          coordinatesArray={coordinatesArray}
          setCoordinatesArray={setCoordinatesArray}
          lastClickedLong={lastClickedLong}
          setLastClickedLong={setLastClickedLong}
          setRouteDataLoading={setRouteDataLoading}
          setRouteDataError={setRouteDataError}
        />
      </div>
      <div
        style={{
          zIndex: "10000",
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "8%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "40%",
            paddingLeft: "2%",
          }}
        >
          <MapTopMenu
            geojsonObjects={geojsonObjects}
            setGeojsonObjects={setGeojsonObjects}
            coordinatesArray={coordinatesArray}
            setCoordinatesArray={setCoordinatesArray}
            setTripInfoViz={setTripInfoViz}
            setTripInfoTitleViz={setTripInfoTitleViz}
            setTripForecastTitleViz={setTripForecastTitleViz}
            setTripForecastViz={setTripForecastViz}
            setLastClickedLong={setLastClickedLong}
            setTripCoordWithBool={setTripCoordWithBool}
            setSegmentCoordinates={setSegmentCoordinates}
            setSiteInfoPanelViz={setSiteInfoPanelViz}
            setSiteMenuViz={setSiteMenuViz}
            setUserError={setUserError}
            setTripForecast={setTripForecast}
            setTripInfoIsLoading={setTripInfoIsLoading}
            setTripInfoLoadingError={setTripInfoLoadingError}
            setZoomToSiteCoord={setZoomToSiteCoord}
          />
        </div>{" "}
      </div>
    </MapContainer>
  );
};

export default MyMapContainer;
