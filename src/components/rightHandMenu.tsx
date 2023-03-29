import React, { useState, Dispatch, SetStateAction } from "react";
import { tripCoordObj, SegmentData } from "../types";
import TripInfo from "./tripInfo";
import TripForecast from "./tripForecast";
import SiteList from "./siteList";
import SiteInfoPanel from "./siteInfoPanel";
import { SiteInfoPanelData, Forecast } from "../types";

interface rightHandMenuProps {
  setZoomToSiteCoord: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  tripCoordWithBool: tripCoordObj[];
  segmentCoordinates: SegmentData[];
  tripInfoViz: boolean;
  setTripInfoViz: Dispatch<SetStateAction<boolean>>;
  tripInfoTitleViz: boolean;
  tripForecastViz: boolean;
  siteInfoPanelViz: boolean;
  setSiteInfoPanelViz: Dispatch<SetStateAction<boolean>>;
  setLastClickedLong: Dispatch<SetStateAction<number>>;
  setSiteMenuViz: Dispatch<SetStateAction<boolean>>;
  siteMenuViz: boolean;
  setTripForecastViz: Dispatch<SetStateAction<boolean>>;
  tripForecastTitleViz: boolean;
  tripForecast: Forecast | undefined;
  setTripForecast: Dispatch<SetStateAction<Forecast | undefined>>;
  tripInfoIsLoading: boolean;
}

export const RightHandMenu = ({
  setZoomToSiteCoord,
  tripCoordWithBool,
  segmentCoordinates,
  tripInfoViz,
  setTripInfoViz,
  tripInfoTitleViz,
  tripForecastViz,
  siteInfoPanelViz,
  setSiteInfoPanelViz,
  setLastClickedLong,
  setSiteMenuViz,
  siteMenuViz,
  setTripForecastViz,
  tripForecastTitleViz,
  tripForecast,
  setTripForecast,
  tripInfoIsLoading,
}: rightHandMenuProps) => {
  const [arrowIcon, setarrowIcon] = useState("/upArrow.svg");
  const [selectedMarker, setSelectedMarker] = useState<string>("");

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
        fontSize: "0.8rem",
        borderRadius: "25px",
        boxShadow:
          "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          borderRadius: "25px",
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
        }}
      >
        <div>
          <div>
            <div
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                padding: "3%",
                display: tripInfoTitleViz === true ? "flex" : "none",
                color: "black",
                backgroundColor: "rgba(26, 115, 232,0.5)",
                fontSize: "1rem",
                borderRadius: " 25px 25px 0px 0px",
              }}
              onClick={() => {
                const newViz = !tripInfoViz;
                setTripInfoViz(newViz);
              }}
            >
              <div>Your Trip Plan</div>
            </div>
            <TripInfo
              tripCoordWithBool={tripCoordWithBool}
              segmentCoordinates={segmentCoordinates}
              tripInfoViz={tripInfoViz}
              tripInfoIsLoading={tripInfoIsLoading}
            />
          </div>
          <div
            style={{
              display: tripForecastTitleViz ? "block" : "none",
              backgroundColor: "rgba(26, 115, 232,0.5)",
              fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
              padding: "3%",
              color: "black",
              fontSize: "1rem",
              borderTop: "solid #70757a",
              borderBottom: "solid #70757a",
            }}
            onClick={() => {
              const newForecastViz = !tripForecastViz;
              setTripForecastViz(newForecastViz);
            }}
          >
            Trip Forecast
          </div>
          <TripForecast
            tripCoordWithBool={tripCoordWithBool}
            setTripInfoViz={setTripInfoViz}
            tripForecastViz={tripForecastViz}
            tripForecast={tripForecast}
            setTripForecast={setTripForecast}
          />{" "}
          <div style={{ padding: "4%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "4%",
                backgroundColor: "rgba(26, 115, 232,0.5)",
                borderRadius: "25px",
                boxShadow:
                  "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
                cursor: "pointer",
              }}
              onClick={() => {
                const newMenuViz = !siteMenuViz;
                setSiteMenuViz(newMenuViz);
                const icon =
                  siteMenuViz === false ? "/upArrow.svg" : "/downArrow.svg";
                setarrowIcon(icon);
                setSiteInfoPanelViz(false);
              }}
            >
              <div style={{ fontSize: "1rem" }}>Backcountry Sites</div>
              <div style={{ display: "flex", flexGrow: "1" }}></div>
              <img
                src={arrowIcon}
                style={{
                  height: arrowIcon === "/downArrow.svg" ? "2.4vh" : "1.8vh",
                }}
              />
            </div>
          </div>
          <SiteList
            siteMenuViz={siteMenuViz}
            setZoomToSiteCoord={setZoomToSiteCoord}
            setSiteMenuViz={setSiteMenuViz}
            setSiteInfoPanelViz={setSiteInfoPanelViz}
            setLastClickedLong={setLastClickedLong}
            setSelectedMarker={setSelectedMarker}
          />
        </div>
        <div>
          <SiteInfoPanel
            siteInfoPanelViz={siteInfoPanelViz}
            selectedMarker={selectedMarker}
          />
        </div>
      </div>
    </div>
  );
};
export default RightHandMenu;
