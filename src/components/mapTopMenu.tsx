import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GenerateTripInfo } from "./generateTripInfoBtn";
import {
  tripCoordObj,
  SegmentData,
  Forecast,
  MyGeoJson,
  AddressObj,
} from "../types";

export interface mapTopMenuProps {
  geojsonObjects: MyGeoJson[]; //GeoJSONProps["data"][];
  setGeojsonObjects: Dispatch<SetStateAction<MyGeoJson[]>>;
  coordinatesArray: {
    long: number;
    lat: number;
  }[];
  setCoordinatesArray: Dispatch<
    SetStateAction<
      {
        long: number;
        lat: number;
      }[]
    >
  >;
  setTripInfoViz: Dispatch<SetStateAction<boolean>>;
  setTripInfoTitleViz: Dispatch<SetStateAction<boolean>>;
  setTripForecastTitleViz: Dispatch<SetStateAction<boolean>>;
  setTripForecastViz: Dispatch<SetStateAction<boolean>>;
  setLastClickedLong: Dispatch<SetStateAction<number>>;
  setTripCoordWithBool: Dispatch<SetStateAction<tripCoordObj[]>>;
  setSegmentCoordinates: Dispatch<SetStateAction<SegmentData[]>>;
  setSiteInfoPanelViz: Dispatch<SetStateAction<boolean>>;
  setSiteMenuViz: Dispatch<SetStateAction<boolean>>;
  setUserError: Dispatch<SetStateAction<string>>;
  setTripForecast: Dispatch<SetStateAction<Forecast | undefined>>;
  setTripInfoIsLoading: Dispatch<SetStateAction<boolean>>;
  setTripInfoLoadingError: Dispatch<SetStateAction<boolean>>;
  setZoomToSiteCoord: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setDirectionsTitleViz: Dispatch<SetStateAction<boolean>>;
  setdDrectionsViz: Dispatch<SetStateAction<boolean>>;
  setDrivingDirections: Dispatch<SetStateAction<MyGeoJson | undefined>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setAdrForUserVerification: Dispatch<SetStateAction<AddressObj[] | undefined>>;
  setSelectedAdrId: Dispatch<SetStateAction<string>>;
  setGetDirectionsBtnDisabled: Dispatch<SetStateAction<boolean>>;
}

export const MapTopMenu = ({
  geojsonObjects,
  setGeojsonObjects,
  coordinatesArray,
  setCoordinatesArray,
  setTripInfoViz,
  setTripInfoTitleViz,
  setTripForecastTitleViz,
  setTripForecastViz,
  setLastClickedLong,
  setTripCoordWithBool,
  setSegmentCoordinates,
  setSiteInfoPanelViz,
  setSiteMenuViz,
  setUserError,
  setTripForecast,
  setTripInfoIsLoading,
  setTripInfoLoadingError,
  setZoomToSiteCoord,
  setDirectionsTitleViz,
  setdDrectionsViz,
  setDrivingDirections,
  setAddress,
  setAdrForUserVerification,
  setGetDirectionsBtnDisabled,
  setSelectedAdrId,
}: mapTopMenuProps) => {
  const [generateTripBtnViz, setGenrateTripBtnViz] = useState(false);
  const [clearTripBtnViz, setClearTripBtnViz] = useState(false);
  const [tripInfoBtnBkrnd, setTripInfoBtnBkrnd] = useState("white");
  const [undoBtnViz, setUndoBtnViz] = useState(true);
  const [clearBtnViz, setClearBtnViz] = useState(true);
  const [clearBtnBkrnd, setClearBtnBkrnd] = useState("white");
  const [undoBtnBkrnd, setUndoBtnBkrnd] = useState("white");
  const [newTripBtnBkrnd, setNewTripBtnBkrnd] = useState("white");

  useEffect(() => {
    if (geojsonObjects.length > 0) {
      setGenrateTripBtnViz(true);
    }
  }, [geojsonObjects]);

  function clearTrip() {
    let updatedCoordinatesArray = [...coordinatesArray];
    updatedCoordinatesArray = [];
    setCoordinatesArray(updatedCoordinatesArray);

    let updatedGeoJSON = [...geojsonObjects];
    updatedGeoJSON = [];
    setGeojsonObjects(updatedGeoJSON);
    setTripInfoViz(false);
    setTripInfoTitleViz(false);
    setTripForecastTitleViz(false);
    setTripForecastViz(false);
    setClearTripBtnViz(false);
    setUndoBtnViz(true);
    setClearBtnViz(true);
    setLastClickedLong(0);
    setTripForecast(undefined);
    setSiteMenuViz(true);
    setZoomToSiteCoord({
      lat: 50.814061,
      lng: -115.163614,
    });
    setSiteInfoPanelViz(false);
    setDirectionsTitleViz(false);
    setdDrectionsViz(false);
    setDrivingDirections(undefined);
    setAddress("");
    setAdrForUserVerification([]);
    setSelectedAdrId("");
    setGetDirectionsBtnDisabled(true);
  }

  function undo() {
    if (coordinatesArray.length > 2) {
      const updatedCoordinatesArray = [...coordinatesArray];
      updatedCoordinatesArray.splice(coordinatesArray.length - 1, 1);
      setCoordinatesArray(updatedCoordinatesArray);
    } else {
      const updatedGeoJSON = [...geojsonObjects];
      updatedGeoJSON.splice(geojsonObjects.length - 1, 1);
      setGeojsonObjects(updatedGeoJSON);
      let updatedCoordinatesArray = [...coordinatesArray];
      updatedCoordinatesArray = [];
      setCoordinatesArray(updatedCoordinatesArray);
      setLastClickedLong(0);
    }
  }

  function clear() {
    let updatedCoordinatesArray = [...coordinatesArray];
    updatedCoordinatesArray = [];
    setCoordinatesArray(updatedCoordinatesArray);

    let updatedGeoJSON = [...geojsonObjects];
    updatedGeoJSON = [];
    setGeojsonObjects(updatedGeoJSON);
    setLastClickedLong(0);
  }

  return (
    <>
      <div
        style={{
          display: generateTripBtnViz ? "flex" : "none",
          justifyContent: "center",
          paddingLeft: "3%",
          paddingRight: "3%",
          borderRadius: "25px",
          backgroundColor: tripInfoBtnBkrnd,
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
        }}
        onMouseEnter={() => setTripInfoBtnBkrnd("grey")}
        onMouseLeave={() => setTripInfoBtnBkrnd("white")}
      >
        <GenerateTripInfo
          geojsonObjects={geojsonObjects}
          setTripCoordWithBool={setTripCoordWithBool}
          setSegmentCoordinates={setSegmentCoordinates}
          setTripInfoViz={setTripInfoViz}
          setTripInfoTitleViz={setTripInfoTitleViz}
          setTripForecastViz={setTripForecastViz}
          setSiteInfoPanelViz={setSiteInfoPanelViz}
          setSiteMenuViz={setSiteMenuViz}
          setTripForecastTitleViz={setTripForecastTitleViz}
          setClearTripBtnViz={setClearTripBtnViz}
          setGenrateTripBtnViz={setGenrateTripBtnViz}
          setUndoBtnViz={setUndoBtnViz}
          setClearBtnViz={setClearBtnViz}
          setUserError={setUserError}
          setTripInfoIsLoading={setTripInfoIsLoading}
          setTripInfoLoadingError={setTripInfoLoadingError}
          setDirectionsTitleViz={setDirectionsTitleViz}
          setdDrectionsViz={setdDrectionsViz}
        />
      </div>
      <div
        style={{
          display: clearTripBtnViz === true ? "flex" : "none",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: newTripBtnBkrnd,
          paddingLeft: "3%",
          paddingRight: "3%",
          borderRadius: "25px",
          paddingTop: "1%",
          paddingBottom: "1%",
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
        }}
        onMouseEnter={() => setNewTripBtnBkrnd("grey")}
        onMouseLeave={() => setNewTripBtnBkrnd("white")}
        onClick={clearTrip}
      >
        <img
          src={"/undo.svg"}
          style={{ height: "2.7vh", paddingRight: "1vh" }}
        />
        <div
          style={{
            fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
            color: "black",
            fontSize: "0.8rem",
          }}
        >
          Start a New Trip
        </div>
      </div>
      <div
        style={{
          display: undoBtnViz === true ? "flex" : "none",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: undoBtnBkrnd,
          paddingLeft: "3%",
          paddingRight: "3%",
          borderRadius: "25px",
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
        }}
        onMouseEnter={() => setUndoBtnBkrnd("grey")}
        onMouseLeave={() => setUndoBtnBkrnd("white")}
        onClick={undo}
      >
        <img
          src={"/undo.svg"}
          style={{ height: "2.7vh", paddingRight: "1vh" }}
        />
        <div
          style={{
            fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
            color: "black",
            fontSize: "0.8rem",
          }}
        >
          Undo Marker Click
        </div>
      </div>
      <div
        style={{
          display: clearBtnViz === true ? "flex" : "none",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: clearBtnBkrnd,
          whiteSpace: "nowrap",
          paddingLeft: "3%",
          paddingRight: "3%",
          borderRadius: "25px",
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
        }}
        onMouseEnter={() => setClearBtnBkrnd("grey")}
        onMouseLeave={() => setClearBtnBkrnd("white")}
        onClick={clear}
      >
        <img
          src={"/clear.svg"}
          style={{ height: "4vh", paddingRight: "1vh" }}
        />
        <div
          style={{
            padding: "2%",
            fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
            color: "black",
            fontSize: "0.8rem",
          }}
        >
          Clear Path
        </div>
      </div>
    </>
  );
};

export default MapTopMenu;
