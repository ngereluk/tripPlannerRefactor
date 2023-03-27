import {
  MapContainer,
  Marker,
  TileLayer,
  GeoJSON,
  GeoJSONProps,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import StaticPathLabel from "./staticPathLabel";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
//import DetectZoom from "./detectZoom";
import { RightHandMenu } from "./rightHandMenu";
import { GenerateTripInfo } from "./generateTripInfoBtn";
import { tripCoordObj, SegmentData } from "../types";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";

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

interface mapProps {
  geojsonObjects: GeoJSONProps["data"][];
  setGeojsonObjects: Dispatch<SetStateAction<GeoJSONProps["data"][]>>;
  zoomToSiteCoord: {
    lat: number;
    lng: number;
  };
  setZoomToSiteCoord: Dispatch<
    SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  //lastClickedLong: number;
  //setLastClickedLong: Dispatch<SetStateAction<number>>;
}
interface innerMapProps {
  geojsonObjects: GeoJSONProps["data"][];
  setGeojsonObjects: Dispatch<SetStateAction<GeoJSONProps["data"][]>>;
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
}
const MyMapContainer = ({
  geojsonObjects,
  setGeojsonObjects,
  zoomToSiteCoord,
  setZoomToSiteCoord,
}: mapProps) => {
  const [coordinatesArray, setCoordinatesArray] = useState<
    {
      long: number;
      lat: number;
    }[]
  >([]);
  const [clearBtnBkrnd, setClearBtnBkrnd] = useState("white");
  const [undoBtnBkrnd, setUndoBtnBkrnd] = useState("white");
  const [newTripBtnBkrnd, setNewTripBtnBkrnd] = useState("white");

  const [tripCoordWithBool, setTripCoordWithBool] = useState<tripCoordObj[]>(
    []
  );
  const [segmentCoordinates, setSegmentCoordinates] = useState<SegmentData[]>(
    []
  );
  const [tripInfoViz, sestTripInfoViz] = useState(false);
  const [tripInfoTitleViz, setTripInfoTitleViz] = useState(false);
  const [tripForecastTitleViz, setTripForecastTitleViz] = useState(false);
  const [tripForecastViz, sestTripForecastViz] = useState(false);
  const [siteInfoPanelViz, setSiteInfoPanelViz] = useState(false);
  const [lastClickedLong, setLastClickedLong] = useState<number>(0);
  const [siteMenuViz, setSiteMenuViz] = useState(true);
  const [undoBtnViz, setUndoBtnViz] = useState(true);
  const [clearBtnViz, setClearBtnViz] = useState(true);
  const [generateTripBtnViz, setGenrateTripBtnViz] = useState(false);
  const [clearTripBtnViz, setClearTripBtnViz] = useState(false);
  const [tripInfoBtnBkrnd, setTripInfoBtnBkrnd] = useState("white");
  const [userError, setUserError] = useState("");

  useEffect(() => {
    if (geojsonObjects.length > 0) {
      setGenrateTripBtnViz(true);
    }
  }, [geojsonObjects]);

  function clearTrip() {
    let updatedCoordinatesArray = [...coordinatesArray];
    updatedCoordinatesArray = [];
    setCoordinatesArray(updatedCoordinatesArray);

    let updatedGeoJSON = [...geojsonObjects];
    updatedGeoJSON = [];
    setGeojsonObjects(updatedGeoJSON);
    sestTripInfoViz(false);
    setTripInfoTitleViz(false);
    setTripForecastTitleViz(false);
    sestTripForecastViz(false);
    setClearTripBtnViz(false);
    setUndoBtnViz(true);
    setClearBtnViz(true);
    setLastClickedLong(0);
  }

  function undo() {
    if (coordinatesArray.length > 2) {
      const updatedCoordinatesArray = [...coordinatesArray];
      updatedCoordinatesArray.splice(coordinatesArray.length - 1, 1);
      setCoordinatesArray(updatedCoordinatesArray);
    } else {
      const updatedGeoJSON = [...geojsonObjects];
      updatedGeoJSON.splice(geojsonObjects.length - 1, 1);
      setGeojsonObjects(updatedGeoJSON);
      let updatedCoordinatesArray = [...coordinatesArray];
      updatedCoordinatesArray = [];
      setCoordinatesArray(updatedCoordinatesArray);
      setLastClickedLong(0);
    }
  }

  function clear() {
    let updatedCoordinatesArray = [...coordinatesArray];
    updatedCoordinatesArray = [];
    setCoordinatesArray(updatedCoordinatesArray);

    let updatedGeoJSON = [...geojsonObjects];
    updatedGeoJSON = [];
    setGeojsonObjects(updatedGeoJSON);
    setLastClickedLong(0);
  }

  return (
    <MapContainer
      center={[50.814061, -115.163614]}
      zoom={10}
      scrollWheelZoom={false}
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
      }}
      zoomControl={false}
    >
      {" "}
      <div
        style={{
          position: "absolute",
          zIndex: "10002",
          display: "flex",
          padding: "1%",
          backgroundColor: "white",
          paddingTop: "1%",
          left: "86%",
          top: "75%",
          width: "10%",
          borderRadius: "25px",
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
          alignItems: "center",
          justifyContent: "flex-start",
          cursor: "pointer",
        }}
      >
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
      </div>
      <div
        style={{
          position: "absolute",
          zIndex: "10002",
          display: userError === "" ? "none" : "flex",
          padding: "1%",
          backgroundColor: "white",
          paddingTop: "1%",
          left: "85%",
          top: "2%",
          width: "10%",
          borderRadius: "25px",
          boxShadow:
            "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            paddingTop: "10%",
            paddingRight: "2%",
          }}
        >
          <img src="/alert.svg" style={{ height: "2vh" }} />
        </div>
        <div style={{ paddingRight: "7%", paddingLeft: "7%" }}>
          <div style={{ color: "black", fontWeight: "bold" }}>{userError}</div>
        </div>
        <div
          onClick={() => {
            setUserError("");
          }}
        >
          <img src="/close.svg" style={{ height: "1.5vh" }} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          color: "black",
          zIndex: "10001",
          width: "30%",
          paddingTop: "1%",
          paddingLeft: "1%",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <RightHandMenu
            geojsonObjects={geojsonObjects}
            setZoomToSiteCoord={setZoomToSiteCoord}
            zoomToSiteCoord={zoomToSiteCoord}
            tripCoordWithBool={tripCoordWithBool}
            segmentCoordinates={segmentCoordinates}
            tripInfoViz={tripInfoViz}
            sestTripInfoViz={sestTripInfoViz}
            tripInfoTitleViz={tripInfoTitleViz}
            tripForecastViz={tripForecastViz}
            sestTripForecastViz={sestTripForecastViz}
            siteInfoPanelViz={siteInfoPanelViz}
            setSiteInfoPanelViz={setSiteInfoPanelViz}
            lastClickedLong={lastClickedLong}
            setLastClickedLong={setLastClickedLong}
            setSiteMenuViz={setSiteMenuViz}
            siteMenuViz={siteMenuViz}
            tripForecastTitleViz={tripForecastTitleViz}
            setTripForecastTitleViz={setTripForecastTitleViz}
          />
        </div>
        <KananaskisMap
          geojsonObjects={geojsonObjects}
          setGeojsonObjects={setGeojsonObjects}
          zoomToSiteCoord={zoomToSiteCoord}
          coordinatesArray={coordinatesArray}
          setCoordinatesArray={setCoordinatesArray}
          lastClickedLong={lastClickedLong}
          setLastClickedLong={setLastClickedLong}
        />
      </div>
      <div
        style={{
          zIndex: "10000",
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "8%",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "40%",
            paddingLeft: "2%",
          }}
        >
          <div
            style={{
              display: generateTripBtnViz ? "flex" : "none",
              justifyContent: "center",
              paddingLeft: "3%",
              paddingRight: "3%",
              borderRadius: "25px",
              backgroundColor: tripInfoBtnBkrnd,
              boxShadow:
                "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
            }}
            onMouseEnter={() => setTripInfoBtnBkrnd("grey")}
            onMouseLeave={() => setTripInfoBtnBkrnd("white")}
          >
            <GenerateTripInfo
              geojsonObjects={geojsonObjects}
              setTripCoordWithBool={setTripCoordWithBool}
              setSegmentCoordinates={setSegmentCoordinates}
              tripCoordWithBool={tripCoordWithBool}
              segmentCoordinates={segmentCoordinates}
              sestTripInfoViz={sestTripInfoViz}
              setTripInfoTitleViz={setTripInfoTitleViz}
              sestTripForecastViz={sestTripForecastViz}
              setSiteInfoPanelViz={setSiteInfoPanelViz}
              setSiteMenuViz={setSiteMenuViz}
              setTripForecastTitleViz={setTripForecastTitleViz}
              setClearTripBtnViz={setClearTripBtnViz}
              setGenrateTripBtnViz={setGenrateTripBtnViz}
              setUndoBtnViz={setUndoBtnViz}
              setClearBtnViz={setClearBtnViz}
              setUserError={setUserError}
            />
          </div>
          <div
            style={{
              display: clearTripBtnViz === true ? "flex" : "none",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: newTripBtnBkrnd,
              paddingLeft: "3%",
              paddingRight: "3%",
              borderRadius: "25px",
              paddingTop: "1%",
              paddingBottom: "1%",
              boxShadow:
                "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
            }}
            onMouseEnter={() => setNewTripBtnBkrnd("grey")}
            onMouseLeave={() => setNewTripBtnBkrnd("white")}
            onClick={clearTrip}
          >
            <img
              src={"/undo.svg"}
              style={{ height: "2.7vh", paddingRight: "1vh" }}
            />
            <div
              style={{
                fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
                color: "black",
              }}
            >
              Start a New Trip
            </div>
          </div>
          <div
            style={{
              display: undoBtnViz === true ? "flex" : "none",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: undoBtnBkrnd,
              paddingLeft: "3%",
              paddingRight: "3%",
              borderRadius: "25px",
              boxShadow:
                "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
            }}
            onMouseEnter={() => setUndoBtnBkrnd("grey")}
            onMouseLeave={() => setUndoBtnBkrnd("white")}
            onClick={undo}
          >
            <img
              src={"/undo.svg"}
              style={{ height: "2.7vh", paddingRight: "1vh" }}
            />
            <div
              style={{
                fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
                color: "black",
              }}
            >
              Undo Marker Click
            </div>
          </div>
          <div
            style={{
              display: clearBtnViz === true ? "flex" : "none",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: clearBtnBkrnd,
              whiteSpace: "nowrap",
              paddingLeft: "3%",
              paddingRight: "3%",
              borderRadius: "25px",
              boxShadow:
                "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
            }}
            onMouseEnter={() => setClearBtnBkrnd("grey")}
            onMouseLeave={() => setClearBtnBkrnd("white")}
            onClick={clear}
          >
            <img
              src={"/clear.svg"}
              style={{ height: "4vh", paddingRight: "1vh" }}
            />
            <div
              style={{
                padding: "2%",
                fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
                color: "black",
              }}
            >
              Clear Path
            </div>
          </div>
        </div>{" "}
      </div>
    </MapContainer>
  );
};

const KananaskisMap = (props: innerMapProps) => {
  //, setStaticRouteData] = useState([]);
  const [isCampsite, setIsCampsite] = useState(true);
  const [segmentLengthOpacity, setSegmentLengthOpacity] = useState("none");
  const {
    data: staticRouteData,
    isLoading,
    isError,
    isSuccess,
  } = api.getStaticRouteData.getData.useQuery();
  //if is loading
  //if is error
  const {
    data: orsData,
    isLoading: orsIsLoading,
    isError: orsIsError,
    isSuccess: orsIsSuccess,
    refetch: orsRefetch,
  } = api.openRouteService.getRouteData.useQuery(
    {
      coordinates: [50.814061, -115.163614],
      authorization: "5b3ce3597851110001cf62487304b26a75f24a8cb943fa137eb6a204",
    },
    { enabled: false }
  );
  // const onClick = () => { orsRefetch() }

  async function fetchORSData(coordinatesMapToArray: number[][]) {
    orsRefetch();
    // try {
    //   const res = await fetch("/api/openRouteService", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       coordinates: coordinatesMapToArray,
    //       authorization:
    //         "5b3ce3597851110001cf62487304b26a75f24a8cb943fa137eb6a204",
    //     }),
    //   });
    //   const resJson = await res.json();
    //   return resJson.geojsonObject as unknown as GeoJSONProps["data"];
    // } catch (e: any) {
    //   console.log("error fetching route ", e);
    // }
    //console.log("orsData ", orsData);
  }

  const map = useMap();
  useEffect(() => {
    if (
      props.zoomToSiteCoord.lat == 50.814061 &&
      props.zoomToSiteCoord.lng == -115.163614
    ) {
      map.setZoom(10);
    } else {
      map.setView(props.zoomToSiteCoord, 13);
    }
  }, [props.zoomToSiteCoord]);

  useEffect(() => {
    if (props.coordinatesArray.length > 1) {
      const coordinatesMapToArray = props.coordinatesArray.map((x) => [
        x.long,
        x.lat,
      ]);
      (async () => {
        let routeData = await fetchORSData(coordinatesMapToArray);
        if (routeData != undefined) {
          props.setGeojsonObjects([routeData]);
        }
      })();
    }
  }, [props.coordinatesArray]);

  function setRouteCoordinates(long: number, lat: number) {
    if (
      props.coordinatesArray.length == 0 ||
      (long !==
        //@ts-ignore
        props.coordinatesArray[props.coordinatesArray.length - 1].long &&
        //@ts-ignore
        lat !== props.coordinatesArray[props.coordinatesArray.length - 1].lat)
    ) {
      const updatedCoordinatesArray = [
        ...props.coordinatesArray,
        { long: long, lat: lat },
      ];
      props.setCoordinatesArray(updatedCoordinatesArray);
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
      {/* el for routes added by user clicks */}
      {props.geojsonObjects.map((data) => {
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
        staticRouteData.StaticRouteData.map((data, i) => {
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
      {/*Aster Lake */}
      <Marker
        position={[50.580097, -115.20417]}
        icon={
          props.lastClickedLong === -115.20417 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.20417, 50.580097);
            props.setLastClickedLong(-115.20417);
          },
        }}
      >
        <Tooltip>Aster Lake </Tooltip>
      </Marker>

      {/*Point */}
      <Marker
        position={[50.627449, -115.178892]}
        icon={
          props.lastClickedLong === -115.178892 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.178892, 50.627449);
            props.setLastClickedLong(-115.178892);
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
        icon={
          props.lastClickedLong === -115.267343 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.267343, 50.630093);
            props.setLastClickedLong(-115.267343);
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
        icon={
          props.lastClickedLong === -115.232454 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.232454, 50.634741);
            props.setLastClickedLong(-115.232454);
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
        icon={
          props.lastClickedLong === -115.275096 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.275096, 50.686718);
            props.setLastClickedLong(-115.275096);
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
        icon={
          props.lastClickedLong === -115.009242 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.009242, 50.637443);
            props.setLastClickedLong(-115.009242);
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
        icon={
          props.lastClickedLong === -115.11447 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.11447, 51.053327);
            props.setLastClickedLong(-115.11447);
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
        icon={
          props.lastClickedLong === -114.859643 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-114.859643, 50.723768);
            props.setLastClickedLong(-114.859643);
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
        icon={
          props.lastClickedLong === -115.082083 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.082083, 51.023576);
            props.setLastClickedLong(-115.082083);
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
        icon={
          props.lastClickedLong === -114.98882 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-114.98882, 50.76182);
            props.setLastClickedLong(-114.98882);
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
        icon={
          props.lastClickedLong === -114.973031 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-114.973031, 50.675607);
            props.setLastClickedLong(-114.973031);
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
        icon={
          props.lastClickedLong === -115.252657 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.252657, 50.863738);
            props.setLastClickedLong(-115.252657);
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
        icon={
          props.lastClickedLong === -115.229125 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.229125, 50.892203);
            props.setLastClickedLong(-115.229125);
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
        icon={
          props.lastClickedLong === -115.248081 ? redMapMarker : blueMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(true);
            setRouteCoordinates(-115.24808, 50.886506);
            props.setLastClickedLong(-115.248081);
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
        icon={
          props.lastClickedLong === -115.141244 ? redMapMarker : greenMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(false);
            setRouteCoordinates(-115.141244, 50.631716);
            props.setLastClickedLong(-115.141244);
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
        icon={
          props.lastClickedLong === -115.176086 ? redMapMarker : greenMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(false);
            setRouteCoordinates(-115.176086, 50.861035);
            props.setLastClickedLong(-115.176086);
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
        icon={
          props.lastClickedLong === -115.14843 ? redMapMarker : greenMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(false);
            setRouteCoordinates(-115.14843, 50.93298);
            props.setLastClickedLong(-115.14843);
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
        icon={
          props.lastClickedLong === -115.165736 ? redMapMarker : greenMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(false);
            setRouteCoordinates(-115.165736, 51.048008);
            props.setLastClickedLong(-115.165736);
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
        icon={
          props.lastClickedLong === -115.040435 ? redMapMarker : greenMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(false);
            setRouteCoordinates(-115.040435, 51.032824);
            props.setLastClickedLong(-115.040435);
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
        icon={
          props.lastClickedLong === -115.023372 ? redMapMarker : greenMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(false);
            setRouteCoordinates(-115.023372, 50.63541);
            props.setLastClickedLong(-115.023372);
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
        icon={
          props.lastClickedLong === -114.869912 ? redMapMarker : greenMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(false);
            setRouteCoordinates(-114.869912, 50.789153);
            props.setLastClickedLong(-114.869912);
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
        icon={
          props.lastClickedLong === -115.35449 ? redMapMarker : greenMapMarker
        }
        eventHandlers={{
          click: () => {
            setIsCampsite(false);
            setRouteCoordinates(-115.35449, 50.868806);
            props.setLastClickedLong(-115.35449);
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

export default MyMapContainer;
