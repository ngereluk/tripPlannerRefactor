import { useState, Dispatch, SetStateAction } from "react";
import { useMapEvents } from "react-leaflet";

interface myComponentProps {
  setSegmentLengthOpacity: Dispatch<SetStateAction<string>>;
}

function DetectZoom({ setSegmentLengthOpacity }: myComponentProps) {
  const [zoomLevel, setZoomLevel] = useState(10);

  const mapEvents = useMapEvents({
    zoomend: () => {
      setZoomLevel(mapEvents.getZoom());
    },
  });

  if (zoomLevel > 11) {
    setSegmentLengthOpacity("block");
  }
  if (zoomLevel <= 11) {
    setSegmentLengthOpacity("none");
  }
  return null;
}

export default DetectZoom;
