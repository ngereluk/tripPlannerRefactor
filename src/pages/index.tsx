import dynamic from "next/dynamic";
import React, { useState } from "react";
import { MyGeoJson } from "../types";

const MyMapContainer = dynamic(() => import("../components/mapContainer"), {
  ssr: false,
});
export default function Home() {
  const [geojsonObjects, setGeojsonObjects] = useState<MyGeoJson[]>([]);
  const [zoomToSiteCoord, setZoomToSiteCoord] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 50.814061, lng: -115.163614 }); //default value is map defulat center

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <MyMapContainer
        geojsonObjects={geojsonObjects}
        setGeojsonObjects={setGeojsonObjects}
        zoomToSiteCoord={zoomToSiteCoord}
        setZoomToSiteCoord={setZoomToSiteCoord}
      />
    </div>
  );
}
