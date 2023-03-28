import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "~/utils/api";
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

export const SiteList = ({
  siteMenuViz,
  setZoomToSiteCoord,
  setSiteMenuViz,
  setSiteInfoPanelData,
  setSiteInfoPanelViz,
  setLastClickedLong,
}: siteListProps) => {
  const [selectedMarker, setSelectedMarker] = useState<string>("");
  const {
    isLoading: siteDataIsLoading,
    isError: siteDataIsError,
    isSuccess: siteDataIsSuccess,
    mutateAsync,
  } = api.getStaticMarkerInfo.getMarkerData.useMutation();

  async function getStaticMarkerData() {
    if (selectedMarker !== "") {
      const res = await mutateAsync({
        selectedMarker: selectedMarker,
      });
      setSiteInfoPanelData(res.markerData);
    }
  }

  useEffect(() => {
    getStaticMarkerData();
  }, [selectedMarker]);

  return (
    <div
      style={{
        display: siteMenuViz === false ? "none" : "block",
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
          setLastClickedLong(-115.20417);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-114.859643);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.009242);
          setSiteInfoPanelViz(true);
          setSiteMenuViz(false);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.232454);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.082083);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.252657);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-114.98882);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.178892);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.11447);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.229125);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.248081);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.267343);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-114.973031);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
          setLastClickedLong(-115.275096);
          setSiteMenuViz(false);
          setSiteInfoPanelViz(true);
          setZoomToSiteCoord({
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
