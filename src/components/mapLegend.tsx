export const MapLegend = () => {
  return (
    <div style={{ paddingRight: "4%", paddingLeft: "4%" }}>
      <div style={{ color: "black", fontWeight: "bold", fontSize: "16px" }}>
        Legend
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "8%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "2%",
          }}
        >
          <img
            src="/blueMapMarker.svg"
            style={{ height: "2vh", paddingRight: "3%" }}
          />
          <div style={{ color: "black", fontSize: "14px" }}>
            Backcountry Campsite
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "4%",
          }}
        >
          <img
            src="/greenMapMarker.svg"
            style={{ height: "2vh", paddingRight: "3%" }}
          />
          <div style={{ color: "black", fontSize: "14px" }}>
            Trailhead/Parking
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: "2%",
          }}
        >
          <img
            src="/redMapMarker.svg"
            style={{ height: "2vh", paddingRight: "3%" }}
          />
          <div style={{ color: "black", fontSize: "14px" }}>
            Most Recently Clicked Marker
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
