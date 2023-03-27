import { SiteInfoPanelData } from "../types";

interface siteInfoPanelProps {
  siteInfoPanelData: SiteInfoPanelData;
  siteInfoPanelViz: boolean;
}

const SiteInfoPanel = (props: siteInfoPanelProps) => {
  {
    if (props.siteInfoPanelData.name != "" && props.siteInfoPanelViz === true) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "black",
            backgroundColor: "white",
            borderRadius: "0px 0px 25px 25px",
            height: "80vh",
            overflowY: "auto",
          }}
        >
          <img
            src={props.siteInfoPanelData.imageUrl}
            style={{ width: "100%" }}
          />
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
              {props.siteInfoPanelData.name +
                (props.siteInfoPanelData.isCampsite === true
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
              {props.siteInfoPanelData.park}
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
            {props.siteInfoPanelData.amenities.map((amenity) => (
              <div
                key={amenity + Math.random().toString()}
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
                <div>{amenity[1]}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "5%" }}>
            <div>Number of sites:{" " + props.siteInfoPanelData.noSites}</div>
            <div>Water Source:{" " + props.siteInfoPanelData.waterSource}</div>
            <div>Coordinates:{" " + props.siteInfoPanelData.coordinates}</div>
            <a href={props.siteInfoPanelData.linkToGovtSite} target="_blank">
              Link to Offical Information Page
            </a>
            <div style={{ paddingTop: "3%" }}>
              {props.siteInfoPanelData.description}
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
