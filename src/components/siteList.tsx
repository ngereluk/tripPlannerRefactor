import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SiteInfoPanelData } from "../types";

interface siteListProps {
  siteMenuViz: boolean;
  setZoomToSiteCoord: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  setSiteMenuViz: Dispatch<SetStateAction<boolean>>;
  setSiteInfoPanelData: Dispatch<SetStateAction<SiteInfoPanelData>>;
  setSiteInfoPanelViz: Dispatch<SetStateAction<boolean>>;
  setLastClickedLong: Dispatch<SetStateAction<number>>;
}

export const SiteList = (props: siteListProps) => {
  const [selectedMarker, setSelectedMarker] = useState<string>("");

  async function getStaticMarkerData() {
    const res = await fetch("/api/getStaticMarkerInfo", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        selectedMarker: selectedMarker,
      }),
    });
    if (res !== null) {
      const resJson = (await res.json()) as SiteInfoPanelData;
      props.setSiteInfoPanelData(resJson);
    }
  }

  useEffect(() => {
    getStaticMarkerData();
  }, [selectedMarker]);

  return (
    <div
      style={{
        display: props.siteMenuViz === false ? "none" : "block",
        overflowY: "auto",
        height: "80vh",
        width: "100%",
        paddingLeft: "4%",
        paddingRight: "4%",
        fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
        fontSize: "0.8rem",
      }}
    >
      <div
        style={{
          padding: "4%",
          borderBottom: "solid #70757a",
        }}
        onClick={() => {
          setSelectedMarker("Aster Lake");
          props.setLastClickedLong(-115.20417);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.580097,
            lng: -115.20417,
          });
        }}
      >
        Aster Lake
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Big Elbow");
          props.setLastClickedLong(-114.859643);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.723768,
            lng: -114.859643,
          });
        }}
      >
        Big Elbow
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Elbow Lake");
          props.setLastClickedLong(-115.009242);
          props.setSiteInfoPanelViz(true);
          props.setSiteMenuViz(false);
          props.setZoomToSiteCoord({
            lat: 50.637443,
            lng: -115.009242,
          });
        }}
      >
        Elbow Lake
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Forks");
          props.setLastClickedLong(-115.232454);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.634741,
            lng: -115.232454,
          });
        }}
      >
        Forks
      </div>

      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Jewel Bay");
          props.setLastClickedLong(-115.082083);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 51.023576,
            lng: -115.082083,
          });
        }}
      >
        Jewel Bay{" "}
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Lillian Lake");
          props.setLastClickedLong(-115.252657);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.863738,
            lng: -115.252657,
          });
        }}
      >
        Lillian Lake{" "}
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Mount Romulus");
          props.setLastClickedLong(-114.98882);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.76182,
            lng: -114.98882,
          });
        }}
      >
        Mount Romulus{" "}
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Point");
          props.setLastClickedLong(-115.178892);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.627449,
            lng: -115.178892,
          });
        }}
      >
        Point{" "}
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Quaite Valley");
          props.setLastClickedLong(-115.11447);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 51.053327,
            lng: -115.11447,
          });
        }}
      >
        Quaite Valley{" "}
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Ribbon Falls");
          props.setLastClickedLong(-115.229125);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.892203,
            lng: -115.229125,
          });
        }}
      >
        Ribbon Falls{" "}
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Ribbon Lake");
          props.setLastClickedLong(-115.248081);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.886506,
            lng: -115.248081,
          });
        }}
      >
        Ribbon Lake{" "}
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Three Isle Lake");
          props.setLastClickedLong(-115.267343);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.630093,
            lng: -115.267343,
          });
        }}
      >
        Three Isle Lake{" "}
      </div>
      <div
        style={{ padding: "4%", borderBottom: "solid #70757a" }}
        onClick={() => {
          setSelectedMarker("Tombstone");
          props.setLastClickedLong(-114.973031);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.675607,
            lng: -114.973031,
          });
        }}
      >
        Tombstone{" "}
      </div>
      <div
        style={{ padding: "4%" }}
        onClick={() => {
          setSelectedMarker("Turbine Canyon");
          props.setLastClickedLong(-115.275096);
          props.setSiteMenuViz(false);
          props.setSiteInfoPanelViz(true);
          props.setZoomToSiteCoord({
            lat: 50.686718,
            lng: -115.275096,
          });
        }}
      >
        Turbine Canyon{" "}
      </div>
    </div>
  );
};

export default SiteList;
