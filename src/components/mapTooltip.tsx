import Link from "next/link";

export interface mapTooltipProps {
  markerName: string;
}

export const MapTooltip = (props: mapTooltipProps) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "white",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>{props.markerName}</div>
      <div>Maker type (campground, trailhead)</div>
      <div>
        {" "}
        <img
          src="mountRomulus.jpeg"
          alt="SVG as an image"
          style={{ height: "15vh" }}
        />
      </div>
      <div
        style={{
          width: "80%",
          paddingBottom: "3%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          style={{
            height: "25%",
            width: "80%",
            backgroundColor: "blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
          href="https://www.albertaparks.ca/parks/kananaskis/elbow-sheep-wpp/information-facilities/camping/mount-romulus-backcountry/"
          target="_blank"
        >
          <div>Details</div>
        </Link>
      </div>{" "}
    </div>
  );
};
export default MapTooltip;
