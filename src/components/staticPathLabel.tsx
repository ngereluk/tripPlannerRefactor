import { isPropertySignature } from "typescript";

interface staticPathLabelProps {
  segmentLengthOpacity: string;
  distance: number;
}
export const StaticPathLabel = (props: staticPathLabelProps) => {
  return (
    <div
      style={{
        backgroundColor: "black !important",
        display: props.segmentLengthOpacity,
        fontWeight: "bold",
      }}
    >
      {(props.distance / 1000).toFixed(2) + " km"}
    </div>
  );
};

export default StaticPathLabel;
