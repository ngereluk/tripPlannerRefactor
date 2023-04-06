import {
  Marker,
  TileLayer,
  GeoJSON,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { api } from "~/utils/api";
import { icon } from "leaflet";
import dynamic from "next/dynamic";
import StaticPathLabel from "./staticPathLabel";
import { MyGeoJson } from "../types";

const DetectZoom = dynamic(() => import("./detectZoom"), {
  ssr: false,
});

const blueMapMarker = icon({
  iconUrl: "/blueMapMarker.svg",
  iconSize: [32, 32],
});
const greenMapMarker = icon({
  iconUrl: "/greenMapMarker.svg",
  iconSize: [32, 32],
});
const redMapMarker = icon({
  iconUrl: "/redMapMarker.svg",
  iconSize: [32, 32],
});

interface kananaskisMapProps {
  geojsonObjects: MyGeoJson[]; //GeoJSONProps["data"][];
  setGeojsonObjects: Dispatch<SetStateAction<MyGeoJson[]>>;
  zoomToSiteCoord: {
    lat: number;
    lng: number;
  };
  coordinatesArray: {
    long: number;
    lat: number;
  }[];
  setCoordinatesArray: Dispatch<
    SetStateAction<
      {
        long: number;
        lat: number;
      }[]
    >
  >;
  lastClickedLong: number;
  setLastClickedLong: Dispatch<SetStateAction<number>>;
  setRouteDataLoading: Dispatch<SetStateAction<boolean>>;
  setRouteDataError: Dispatch<SetStateAction<boolean>>;
  drivingDirections: MyGeoJson | undefined;
}

export const KananaskisMap = ({
  geojsonObjects,
  setGeojsonObjects,
  zoomToSiteCoord,
  coordinatesArray,
  setCoordinatesArray,
  lastClickedLong,
  setLastClickedLong,
  setRouteDataLoading,
  setRouteDataError,
  drivingDirections,
}: kananaskisMapProps) => {
  const [segmentLengthOpacity, setSegmentLengthOpacity] = useState("none");
  const {
    data: staticRouteData,
    isLoading: staticRouteDataIsLoading,
    isError: staticRouteDataIsError,
  } = api.getStaticRouteData.getData.useQuery();

  const { mutateAsync } = api.openRouteService.getRouteData.useMutation();

  async function getORSData(coordinatesMapToArray: number[][]) {
    if (coordinatesMapToArray !== undefined) {
      const res = await mutateAsync({
        coordinates: coordinatesMapToArray,
      });
      setGeojsonObjects([res.geojsonObject]);
    }
  }

  useEffect(() => {
    if (staticRouteDataIsLoading) {
      setRouteDataLoading(true);
    }
    if (!staticRouteDataIsLoading) {
      setRouteDataLoading(false);
    }
  }, [staticRouteDataIsLoading]);
  useEffect(() => {
    if (staticRouteDataIsError) {
      setRouteDataError(true);
    }
    if (!staticRouteDataIsError) {
      setRouteDataError(false);
    }
  }, [staticRouteDataIsError]);

  useEffect(() => {
    if (coordinatesArray.length > 1) {
      const coordinatesMapToArray = coordinatesArray.map((x) => [
        x.long,
        x.lat,
      ]);
      const fetchRouteData = async () => {
        await getORSData(coordinatesMapToArray);
      };
      fetchRouteData().catch(console.error);
    }
  }, [coordinatesArray]);

  const map = useMap();
  useEffect(() => {
    if (
      zoomToSiteCoord.lat == 50.814061 &&
      zoomToSiteCoord.lng == -115.163614
    ) {
      map.setZoom(10);
    } else {
      map.setView(zoomToSiteCoord, 13);
    }
  }, [zoomToSiteCoord]);

  useEffect(() => {
    console.log("drivingDirections ", drivingDirections);
  });

  function setRouteCoordinates(long: number, lat: number) {
    if (
      coordinatesArray.length == 0 ||
      //@ts-ignore
      (long !== coordinatesArray[coordinatesArray.length - 1].long &&
        //@ts-ignore
        lat !== coordinatesArray[coordinatesArray.length - 1].lat)
    ) {
      const updatedCoordinatesArray = [
        ...coordinatesArray,
        { long: long, lat: lat },
      ];
      setCoordinatesArray(updatedCoordinatesArray);
    }
  }

  return (
    <>
      <DetectZoom setSegmentLengthOpacity={setSegmentLengthOpacity} />

      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {/* el for routes added by user click */}
      {geojsonObjects.map((data) => {
        return (
          <GeoJSON
            key={JSON.stringify(data)}
            attribution="&copy; credits due..."
            //@ts-ignore
            data={data}
          />
        );
      })}
      {/* el for static generated routes */}
      {staticRouteData &&
        staticRouteData.StaticRouteLengths.map((data) => {
          return (
            <GeoJSON
              key={JSON.stringify(data)}
              attribution="&copy; credits due..."
              //@ts-ignore
              data={data.geoJson}
              style={{ color: "#b0afae" }}
            >
              <Tooltip permanent={true} direction="auto">
                <StaticPathLabel
                  segmentLengthOpacity={segmentLengthOpacity}
                  distance={
                    //@ts-ignore
                    data.geoJson.features[0].properties.segments[0].distance
                  }
                />
              </Tooltip>
            </GeoJSON>
          );
        })}
      {/* el for driving directions that can optionally be generated by user when creating trip plan */}
      {
        drivingDirections && (
          //  drivingDirections.map((data) => {
          // return (
          <GeoJSON
            key={Math.random()}
            style={{ color: "#b00e0e" }}
            attribution="&copy; credits due..."
            //@ts-ignore
            data={drivingDirections}
          />
        )
        //   );
        // })
      }
      {/*Aster Lake */}
      <Marker
        position={[50.580097, -115.20417]}
        icon={lastClickedLong === -115.20417 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.20417, 50.580097);
            setLastClickedLong(-115.20417);
          },
        }}
      >
        <Tooltip>Aster Lake </Tooltip>
      </Marker>

      {/*Point */}
      <Marker
        position={[50.627449, -115.178892]}
        icon={lastClickedLong === -115.178892 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.178892, 50.627449);
            setLastClickedLong(-115.178892);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Point
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/*  Three Isle Lake*/}
      <Marker
        position={[50.630093, -115.267343]}
        icon={lastClickedLong === -115.267343 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.267343, 50.630093);
            setLastClickedLong(-115.267343);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Three Isle Lake
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Forks */}
      <Marker
        position={[50.634741, -115.232454]}
        icon={lastClickedLong === -115.232454 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.232454, 50.634741);
            setLastClickedLong(-115.232454);
          },
        }}
      >
        <Tooltip>
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Forks
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Turbine Canyon */}
      <Marker
        position={[50.686718, -115.275096]}
        icon={lastClickedLong === -115.275096 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.275096, 50.686718);
            setLastClickedLong(-115.275096);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Turbine Canyon
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Elbow lake */}
      <Marker
        position={[50.637443, -115.009242]}
        icon={lastClickedLong === -115.009242 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.009242, 50.637443);
            setLastClickedLong(-115.009242);
          },
        }}
      >
        {" "}
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Elbow Lake
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Quaite Valley */}
      <Marker
        position={[51.053327, -115.11447]}
        icon={lastClickedLong === -115.11447 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.11447, 51.053327);
            setLastClickedLong(-115.11447);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Quaite Valley
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Big Elbow */}
      <Marker
        position={[50.723768, -114.859643]}
        icon={lastClickedLong === -114.859643 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-114.859643, 50.723768);
            setLastClickedLong(-114.859643);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Big Elbow
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Jewel Bay */}
      <Marker
        position={[51.023576, -115.082083]}
        icon={lastClickedLong === -115.082083 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.082083, 51.023576);
            setLastClickedLong(-115.082083);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Jewel Bay
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Mount Romulus */}
      <Marker
        position={[50.76182, -114.98882]}
        icon={lastClickedLong === -114.98882 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-114.98882, 50.76182);
            setLastClickedLong(-114.98882);
          },
        }}
      >
        {" "}
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Mount Romulus
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Tombstone */}
      <Marker
        position={[50.675607, -114.973031]}
        icon={lastClickedLong === -114.973031 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-114.973031, 50.675607);
            setLastClickedLong(-114.973031);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Tombstone
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Lillian Lake */}
      <Marker
        position={[50.863738, -115.252657]}
        icon={lastClickedLong === -115.252657 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.252657, 50.863738);
            setLastClickedLong(-115.252657);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Lillian Lake
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Ribbon Falls */}
      <Marker
        position={[50.892203, -115.229125]}
        icon={lastClickedLong === -115.229125 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.229125, 50.892203);
            setLastClickedLong(-115.229125);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Ribbon Falls
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Ribbon Lake */}
      <Marker
        position={[50.886506, -115.248081]}
        icon={lastClickedLong === -115.248081 ? redMapMarker : blueMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.24808, 50.886506);
            setLastClickedLong(-115.248081);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Ribbon Lake
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* North Inner Lakes Day Use */}
      <Marker
        position={[50.631716, -115.141244]}
        icon={lastClickedLong === -115.141244 ? redMapMarker : greenMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.141244, 50.631716);
            setLastClickedLong(-115.141244);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              North Inner Lakes Day Use Area
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Galatea Day Use Area/ Lake Trailhead */}
      <Marker
        position={[50.861035, -115.176086]}
        icon={lastClickedLong === -115.176086 ? redMapMarker : greenMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.176086, 50.861035);
            setLastClickedLong(-115.176086);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Galatea Day Use Area
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Ribbon Falls/Lake Trail Head */}
      <Marker
        position={[50.93298, -115.14843]}
        icon={lastClickedLong === -115.14843 ? redMapMarker : greenMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.14843, 50.93298);
            setLastClickedLong(-115.14843);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Ribbon Creek Day Use Area
            </div>
          </div>
        </Tooltip>
      </Marker>
      {/* Heart Creek Day Use Area */}
      <Marker
        position={[51.048008, -115.165736]}
        icon={lastClickedLong === -115.165736 ? redMapMarker : greenMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.165736, 51.048008);
            setLastClickedLong(-115.165736);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Heart Creek Day Use Area
            </div>
          </div>{" "}
        </Tooltip>
      </Marker>
      {/* Barrier Dam Day Use Area */}
      <Marker
        position={[51.032824, -115.040435]}
        icon={lastClickedLong === -115.040435 ? redMapMarker : greenMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.040435, 51.032824);
            setLastClickedLong(-115.040435);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Barrier Dam Day Use Area
            </div>
          </div>{" "}
        </Tooltip>
      </Marker>
      {/* Elbow Pass Day Use Area*/}
      <Marker
        position={[50.63541, -115.023372]}
        icon={lastClickedLong === -115.023372 ? redMapMarker : greenMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.023372, 50.63541);
            setLastClickedLong(-115.023372);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Elbow Pass Day Use Area
            </div>
          </div>{" "}
        </Tooltip>
      </Marker>
      {/* Little Elbow Provincial Recreation Area */}
      <Marker
        position={[50.789153, -114.869912]}
        icon={lastClickedLong === -114.869912 ? redMapMarker : greenMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-114.869912, 50.789153);
            setLastClickedLong(-114.869912);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Little Elbow Provincial Recreation Area
            </div>
          </div>{" "}
        </Tooltip>
      </Marker>
      {/* Buller Mountain Day Use Area 50.868806, -115.354490 */}
      <Marker
        position={[50.868806, -115.35449]}
        icon={lastClickedLong === -115.35449 ? redMapMarker : greenMapMarker}
        eventHandlers={{
          click: () => {
            setRouteCoordinates(-115.35449, 50.868806);
            setLastClickedLong(-115.35449);
          },
        }}
      >
        <Tooltip>
          {" "}
          <div style={{ padding: "1vh" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1vh",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Buller Mountain Day Use Area
            </div>
          </div>{" "}
        </Tooltip>
      </Marker>
    </>
  );
};

export default KananaskisMap;
