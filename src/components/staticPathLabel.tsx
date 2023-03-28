interface staticPathLabelProps {
  segmentLengthOpacity: string;
  distance: number;
}
export const StaticPathLabel = ({
  segmentLengthOpacity,
  distance,
}: staticPathLabelProps) => {
  return (
    <div
      style={{
        backgroundColor: "black !important",
        display: segmentLengthOpacity,
        fontWeight: "bold",
      }}
    >
      {(distance / 1000).toFixed(2) + " km"}
    </div>
  );
};

export default StaticPathLabel;
