import { GenerateTripInfo } from "./generateTripInfoBtn";
import { GeoJSONProps, useMap } from "react-leaflet";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { tripCoordObj, SegmentData } from "../types";
import TripInfo from "./tripInfo";
import TripForecast from "./tripForecast";
import SiteList from "./siteList";
import SiteInfoPanel from "./siteInfoPanel";
import { SiteInfoPanelData } from "../types";

interface rightHandMenuProps {
  geojsonObjects: GeoJSONProps["data"][];
  setZoomToSiteCoord: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  zoomToSiteCoord: {
    lat: number;
    lng: number;
  };
  tripCoordWithBool: tripCoordObj[];
  segmentCoordinates: SegmentData[];
  tripInfoViz: boolean;
  sestTripInfoViz: Dispatch<SetStateAction<boolean>>;
  tripInfoTitleViz: boolean;
  tripForecastViz: boolean;
  siteInfoPanelViz: boolean;
  setSiteInfoPanelViz: Dispatch<SetStateAction<boolean>>;
  lastClickedLong: number;
  setLastClickedLong: Dispatch<SetStateAction<number>>;
  setSiteMenuViz: Dispatch<SetStateAction<boolean>>;
  siteMenuViz: boolean;
  sestTripForecastViz: Dispatch<SetStateAction<boolean>>;
  tripForecastTitleViz: boolean;
  setTripForecastTitleViz: Dispatch<SetStateAction<boolean>>;
}

export const RightHandMenu = (props: rightHandMenuProps) => {
  const [arrowIcon, setarrowIcon] = useState("/upArrow.svg");
  const [siteInfoPanelData, setSiteInfoPanelData] = useState<SiteInfoPanelData>(
    {
      name: "",
      noSites: 0,
      coordinates: "",
      park: "",
      description: "",
      imageUrl: "",
      waterSource: "",
      amenities: [],
      isCampsite: true,
      linkToGovtSite: "",
    }
  );

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
                display: props.tripInfoTitleViz === true ? "flex" : "none",
                color: "black",
                backgroundColor: "rgba(26, 115, 232,0.5)",
                fontSize: "1.2rem",
                borderRadius: " 25px 25px 0px 0px",
              }}
              onClick={() => {
                const newViz = !props.tripInfoViz;
                props.sestTripInfoViz(newViz);
              }}
            >
              <div>Your Trip Plan</div>
            </div>
            <TripInfo
              tripCoordWithBool={props.tripCoordWithBool}
              segmentCoordinates={props.segmentCoordinates}
              tripInfoViz={props.tripInfoViz}
              sestTripInfoViz={props.sestTripInfoViz}
            />
          </div>
          <div
            style={{
              display: props.tripForecastTitleViz ? "block" : "none",
              backgroundColor: "rgba(26, 115, 232,0.5)",
              fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
              padding: "3%",
              color: "black",
              fontSize: "1.2rem",
              borderTop: "solid #70757a",
              borderBottom: "solid #70757a",
            }}
            onClick={() => {
              const newForecastViz = !props.tripForecastViz;
              props.sestTripForecastViz(newForecastViz);
            }}
          >
            Trip Forecast
          </div>
          <TripForecast
            tripCoordWithBool={props.tripCoordWithBool}
            sestTripInfoViz={props.sestTripInfoViz}
            tripForecastViz={props.tripForecastViz}
            sestTripForecastViz={props.sestTripForecastViz}
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
                const newMenuViz = !props.siteMenuViz;
                props.setSiteMenuViz(newMenuViz);
                const icon =
                  props.siteMenuViz === false
                    ? "/upArrow.svg"
                    : "/downArrow.svg";
                setarrowIcon(icon);
                props.setSiteInfoPanelViz(false);
              }}
            >
              <div>Backcounrty Sites</div>
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
            siteMenuViz={props.siteMenuViz}
            setZoomToSiteCoord={props.setZoomToSiteCoord}
            setSiteMenuViz={props.setSiteMenuViz}
            setSiteInfoPanelData={setSiteInfoPanelData}
            setSiteInfoPanelViz={props.setSiteInfoPanelViz}
            setLastClickedLong={props.setLastClickedLong}
          />
        </div>
        <div>
          <SiteInfoPanel
            siteInfoPanelData={siteInfoPanelData}
            siteInfoPanelViz={props.siteInfoPanelViz}
          />
        </div>
      </div>
    </div>
  );
};
export default RightHandMenu;
