import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { SiteInfoPanelData } from "../types";
import LoadingMsg from "../components/loadingMsg";
import ErrorMsg from "../components/errrorMsg";

interface siteInfoPanelProps {
  siteInfoPanelViz: boolean;
  selectedMarker: string;
  loadingMsgHeight: string;
  loadingMsgWidth: string;
  loadingMsgPaddingBottom: string;
}

const SiteInfoPanel = ({
  siteInfoPanelViz,
  selectedMarker,
  loadingMsgHeight,
  loadingMsgWidth,
  loadingMsgPaddingBottom,
}: siteInfoPanelProps) => {
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
  const {
    isLoading: siteDataIsLoading,
    isError: siteDataIsError,
    isSuccess: siteDataIsSuccess,
    mutateAsync,
  } = api.getStaticMarkerInfo.getMarkerData.useMutation();

  async function getMarkerData() {
    if (selectedMarker !== "") {
      const res = await mutateAsync({
        selectedMarker: selectedMarker,
      });
      setSiteInfoPanelData(res.markerData);
    }
  }

  useEffect(() => {
    const fetchRouteData = async () => {
      await getMarkerData();
    };
    fetchRouteData().catch(console.error);
  }, [selectedMarker]);

  {
    if (siteDataIsLoading) {
      return (
        <LoadingMsg
          loadingMsgPaddingBottom={loadingMsgPaddingBottom}
          loadingMsgHeight={loadingMsgHeight}
          loadingMsgWidth={loadingMsgWidth}
        />
      );
    }
    if (siteDataIsError) {
      return <ErrorMsg />;
    }
    if (
      siteInfoPanelData.name != "" &&
      siteInfoPanelViz === true &&
      siteDataIsSuccess
    ) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "black",
            backgroundColor: "white",
            borderRadius: "0px 0px 25px 25px",
            paddingBottom: "10%",
          }}
        >
          <img src={siteInfoPanelData.imageUrl} style={{ width: "100%" }} />
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column",
              color: "#202124",
              height: "60px",
              fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
              fontSize: "1.375rem",
              paddingLeft: "7%",
              paddingTop: "15%",
              paddingBottom: "15%",
            }}
          >
            <div
              style={{
                display: "flex",
                color: "#202124",
                fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
                fontSize: "1.375rem",
                paddingRight: "2%",
              }}
            >
              {siteInfoPanelData.name +
                (siteInfoPanelData.isCampsite === true
                  ? " Backcountry Campground"
                  : "")}
            </div>
            <div
              style={{
                display: "flex",
                color: "#70757a",
                fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
                fontSize: "1.19rem",
              }}
            >
              {" "}
              {siteInfoPanelData.park}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              borderTop: "solid #70757a",
              borderBottom: "solid #70757a",
              paddingTop: "2%",
              paddingBottom: "4%",
              paddingLeft: "5%",
            }}
          >
            {siteInfoPanelData.amenities.map((amenity) => (
              <div
                key={Math.random()}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "3%",
                  paddingRight: "2%",
                  width: "30%",
                }}
              >
                <img
                  src={amenity[0]}
                  style={{ maxHeight: "2vh", paddingRight: "8%" }}
                />
                <div style={{ fontSize: "0.8rem" }}>{amenity[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "5%" }}>
            <div style={{ fontSize: "0.8rem" }}>
              Number of sites:{" " + siteInfoPanelData.noSites.toString()}
            </div>
            <div style={{ fontSize: "0.8rem" }}>
              Water Source:{" " + siteInfoPanelData.waterSource}
            </div>
            <div style={{ fontSize: "0.8rem" }}>
              {siteInfoPanelData.coordinates[0] &&
                siteInfoPanelData.coordinates[1] &&
                " Lat: " +
                  ` ${siteInfoPanelData.coordinates[0]}` +
                  " Long: " +
                  `${siteInfoPanelData.coordinates[1]}`}
            </div>
            <a
              href={siteInfoPanelData.linkToGovtSite}
              target="_blank"
              style={{ fontSize: "0.8rem" }}
            >
              Link to Offical Information Page
            </a>
            <div style={{ paddingTop: "3%", fontSize: "0.8rem" }}>
              {siteInfoPanelData.description}
            </div>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  }
};

export default SiteInfoPanel;
