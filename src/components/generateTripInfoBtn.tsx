import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GeoJSONProps } from "react-leaflet";
import { api } from "~/utils/api";
import { tripCoordObj, SegmentData } from "../types";
import { NameAndCoordinates } from "../types";
var _ = require("lodash");

interface generateTripInfoProps {
  geojsonObjects: GeoJSONProps["data"][];
  setTripCoordWithBool: Dispatch<SetStateAction<tripCoordObj[]>>;
  setSegmentCoordinates: Dispatch<SetStateAction<SegmentData[]>>;
  sestTripInfoViz: Dispatch<SetStateAction<boolean>>;
  tripCoordWithBool: tripCoordObj[];
  segmentCoordinates: SegmentData[];
  setTripInfoTitleViz: Dispatch<SetStateAction<boolean>>;
  sestTripForecastViz: Dispatch<SetStateAction<boolean>>;
  setSiteInfoPanelViz: Dispatch<SetStateAction<boolean>>;
  setSiteMenuViz: Dispatch<SetStateAction<boolean>>;
  setTripForecastTitleViz: Dispatch<SetStateAction<boolean>>;
  setClearTripBtnViz: Dispatch<SetStateAction<boolean>>;
  setGenrateTripBtnViz: Dispatch<SetStateAction<boolean>>;
  setUndoBtnViz: Dispatch<SetStateAction<boolean>>;
  setClearBtnViz: Dispatch<SetStateAction<boolean>>;
  setUserError: Dispatch<SetStateAction<string>>;
}
export const GenerateTripInfo = (props: generateTripInfoProps) => {
  // const [markerNameJSON, setMarkerNameJSON] = useState<NameAndCoordinates[]>();
  const {
    isLoading: siteDataIsLoading,
    isError: siteDataIsError,
    isSuccess: siteDataIsSuccess,
    mutateAsync: getMarkers,
  } = api.getStaticMarkerName.getData.useMutation();
  const {
    isLoading: routeDataIsLoading,
    isError: routeDataIsError,
    isSuccess: routeDataIsSuccess,
    mutateAsync: getRouteData,
  } = api.getRouteDataForTrip.getData.useMutation();

  async function getStaticRouteData(segmentCoordinates: number[][]) {
    const res = await getRouteData({ segmentCoordinates: segmentCoordinates });
    return res;
  }

  async function getStaticMarkerName() {
    const res = await getMarkers();
    const data = res.MarkerNamesAndCoord;
    //setMarkerNameJSON(data);
    return data;
  }

  async function generateTripInfo() {
    props.setSiteMenuViz(false);
    props.setSiteInfoPanelViz(false);
    //////////////////////////////////////
    //get campsite names
    let inputCoordWithCampsiteBool = [] as tripCoordObj[];

    const markerNameJSON = await getStaticMarkerName();
    console.log("markerNameJSON ", markerNameJSON);
    if (markerNameJSON !== undefined) {
      //@ts-ignore
      for (let coord of props.geojsonObjects[0].metadata.query.coordinates) {
        const markerNameObj = markerNameJSON.find(
          //@ts-ignore
          (markerNameStaticObj) =>
            markerNameStaticObj.coordinates[0] === coord[0] &&
            markerNameStaticObj.coordinates[1] === coord[1]
        );
        if (markerNameObj !== undefined) {
          inputCoordWithCampsiteBool.push({
            coordinate: coord,
            isTrailHead: false,
            markerName: markerNameObj.markerName,
          });
        }
      }
    }
    ///////////////////////////////////////////
    const trailHeadCoordinates = [
      [-115.35449, 50.868806],
      [-114.869912, 50.789153],
      [-115.023372, 50.63541],
      [-115.040435, 51.032824],
      [-115.165736, 51.048008],
      [-115.14843, 50.93298],
      [-115.176086, 50.861035],
      [-115.141244, 50.631716],
    ];
    const tripInputCoordinates =
      //@ts-ignore
      props.geojsonObjects[0].metadata.query.coordinates;

    const startingPoint = tripInputCoordinates[0];
    const endingPoint = tripInputCoordinates[tripInputCoordinates.length - 1];

    const startingPointIsTrailHead = _.findIndex(
      trailHeadCoordinates,
      function (el: any) {
        return el[0] == startingPoint[0] && el[1] == startingPoint[1];
      }
    );

    const endPointIsTrailHead = _.findIndex(
      trailHeadCoordinates,
      function (el: any) {
        return el[0] == endingPoint[0] && el[1] == endingPoint[1];
      }
    );

    if (startingPointIsTrailHead !== -1 && endPointIsTrailHead !== -1) {
      //if they have started and ended their route at a trail head, the trip plan can be created
      for (let coordinateObj of tripInputCoordinates) {
        if (
          _.findIndex(trailHeadCoordinates, function (el: any) {
            return el[0] == coordinateObj[0] && el[1] == coordinateObj[1];
          }) !== -1
        ) {
          let objIndex = _.findIndex(
            inputCoordWithCampsiteBool,
            function (el: any) {
              return (
                el.coordinate[0] == coordinateObj[0] &&
                el.coordinate[1] == coordinateObj[1]
              );
            }
          );
          //@ts-ignore
          inputCoordWithCampsiteBool[objIndex].isTrailHead = true;
        }
      }
      props.setTripCoordWithBool(inputCoordWithCampsiteBool);
    }
    if (startingPointIsTrailHead === -1 || endPointIsTrailHead === -1) {
      props.setUserError("Your trip must start and end at a trail head.");
      props.setGenrateTripBtnViz(false);
      return;
    }
    //pair up coords to get segment data
    /// CHANGE TO IGNORE INTER ROUTE TRAILHEADS
    let dailyTotals = [] as SegmentData[];

    for (let coordinate of tripInputCoordinates.slice(0, -1)) {
      const coordinatePair = [
        coordinate,
        tripInputCoordinates[
          _.findIndex(tripInputCoordinates, function (el: any) {
            return el[0] == coordinate[0] && el[1] == coordinate[1];
          }) + 1
        ],
      ];

      const staticData = await getStaticRouteData(coordinatePair);

      dailyTotals.push(staticData);
    }
    props.setSegmentCoordinates(dailyTotals);
    props.sestTripInfoViz(true);
    props.setTripInfoTitleViz(true);
    props.sestTripForecastViz(true);
    props.setTripForecastTitleViz(true);
    props.setClearTripBtnViz(true);
    props.setGenrateTripBtnViz(false);
    props.setUndoBtnViz(false);
    props.setClearBtnViz(false);
    /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        // backgroundColor: tripInfoBtnBkrnd,
        whiteSpace: "nowrap",
        // paddingTop: "10%",
        //paddingBottom: "10%",
        // paddingLeft: "13%",
        //paddingRight: "13%",

        cursor: "pointer",
        fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
        // borderRadius: "25px",
        // boxShadow:
        //   "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
        // height: "100%",
        //width: "18vh",
      }}
      // onMouseEnter={() => setTripInfoBtnBkrnd("grey")}
      // onMouseLeave={() => setTripInfoBtnBkrnd("white")}
      onClick={generateTripInfo}
    >
      {" "}
      <img
        src={"/generate.svg"}
        style={{ height: "2.7vh", paddingRight: "1vh" }}
      />
      Generate Itinerary
    </div>
  );
};

export default GenerateTripInfo;
