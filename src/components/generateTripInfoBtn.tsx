import { Dispatch, SetStateAction, useEffect } from "react";
//import { GeoJSONProps } from "react-leaflet";
import { api } from "~/utils/api";
import { tripCoordObj, SegmentData, MyGeoJson } from "../types";
import _ from "lodash";

interface generateTripInfoProps {
  geojsonObjects: MyGeoJson[]; //GeoJSONProps["data"][];
  setTripCoordWithBool: Dispatch<SetStateAction<tripCoordObj[]>>;
  setSegmentCoordinates: Dispatch<SetStateAction<SegmentData[]>>;
  setTripInfoViz: Dispatch<SetStateAction<boolean>>;
  setTripInfoTitleViz: Dispatch<SetStateAction<boolean>>;
  setTripForecastViz: Dispatch<SetStateAction<boolean>>;
  setSiteInfoPanelViz: Dispatch<SetStateAction<boolean>>;
  setSiteMenuViz: Dispatch<SetStateAction<boolean>>;
  setTripForecastTitleViz: Dispatch<SetStateAction<boolean>>;
  setClearTripBtnViz: Dispatch<SetStateAction<boolean>>;
  setGenrateTripBtnViz: Dispatch<SetStateAction<boolean>>;
  setUndoBtnViz: Dispatch<SetStateAction<boolean>>;
  setClearBtnViz: Dispatch<SetStateAction<boolean>>;
  setUserError: Dispatch<SetStateAction<string>>;
  setTripInfoIsLoading: Dispatch<SetStateAction<boolean>>;
  setTripInfoLoadingError: Dispatch<SetStateAction<boolean>>;
}
export const GenerateTripInfo = ({
  geojsonObjects,
  setTripCoordWithBool,
  setSegmentCoordinates,
  setTripInfoViz,
  setTripInfoTitleViz,
  setTripForecastViz,
  setSiteInfoPanelViz,
  setSiteMenuViz,
  setTripForecastTitleViz,
  setClearTripBtnViz,
  setGenrateTripBtnViz,
  setUndoBtnViz,
  setClearBtnViz,
  setUserError,
  setTripInfoIsLoading,
  setTripInfoLoadingError,
}: generateTripInfoProps) => {
  const { mutateAsync: getMarkers } =
    api.getStaticMarkerName.getData.useMutation();
  const {
    isLoading: routeDataIsLoading,
    isError: routeDataIsError,
    mutateAsync: getRouteData,
  } = api.getRouteDataForTrip.getData.useMutation();

  async function getStaticRouteData(segmentCoordinates: number[][]) {
    const res = await getRouteData({ segmentCoordinates: segmentCoordinates });
    return res;
  }

  async function getStaticMarkerNameAndCoord() {
    const res = await getMarkers();
    const data = res.MarkerNamesAndCoord;
    return data;
  }

  useEffect(() => {
    if (routeDataIsLoading) {
      setTripInfoIsLoading(true);
    }
    if (!routeDataIsLoading) {
      setTripInfoIsLoading(false);
    }
  }, [routeDataIsLoading]);

  useEffect(() => {
    if (routeDataIsError) {
      setTripInfoLoadingError(true);
    }
    if (!routeDataIsError) {
      setTripInfoLoadingError(false);
    }
  }, [routeDataIsError]);

  async function generateTripInfo() {
    //hide the menu with the list of campsites
    setSiteInfoPanelViz(false);

    //get campsite names and corresponding coordinates
    const inputCoordWithCampsiteBool = [] as tripCoordObj[];

    const markerNameJSON = await getStaticMarkerNameAndCoord();
    if (markerNameJSON !== undefined && geojsonObjects[0] !== undefined) {
      //compare the inpute coordinates of each marker (inside geojsonObjects) to the master list of site names and coordinates
      //to find the names for each site. Also add an isTrailhead bool set to false which will be properly initiallized in the next step
      //@ts-ignore
      const coordinates = geojsonObjects[0].metadata.query.coordinates; //as number[][];
      //@ts-ignore
      for (const coord of coordinates) {
        const markerNameObj = markerNameJSON.find(
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
    //the master list of the coordinates of all trailheads
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
    //the coordinates of all markers clicked by the user
    const tripInputCoordinates =
      //@ts-ignore
      geojsonObjects[0].metadata.query.coordinates;

    //pull out the starting and ending points
    const startingPoint = tripInputCoordinates[0];
    const endingPoint = tripInputCoordinates[tripInputCoordinates.length - 1];

    //the trip must start and end at a trail head -check the start and enpoint to see if they are in the master trailHeadCoordinates list
    const startingPointIsTrailHead = _.findIndex(
      trailHeadCoordinates,
      function (el: number[]) {
        //@ts-ignore
        return el[0] == startingPoint[0] && el[1] == startingPoint[1];
      }
    );

    const endPointIsTrailHead = _.findIndex(
      trailHeadCoordinates,
      function (el: number[]) {
        //@ts-ignore
        return el[0] == endingPoint[0] && el[1] == endingPoint[1];
      }
    );

    if (startingPointIsTrailHead !== -1 && endPointIsTrailHead !== -1) {
      //if they have started and ended their route at a trail head, the trip plan can be created
      for (const coordinateObj of tripInputCoordinates) {
        if (
          _.findIndex(trailHeadCoordinates, function (el: number[]) {
            return el[0] == coordinateObj[0] && el[1] == coordinateObj[1];
          }) !== -1
        ) {
          const objIndex = _.findIndex(
            inputCoordWithCampsiteBool,
            function (el: tripCoordObj) {
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

      setTripCoordWithBool(inputCoordWithCampsiteBool);
    }
    //if the trip dosent start and end with a trailhead, display error to user and hide
    //the generate trip button
    if (startingPointIsTrailHead === -1 || endPointIsTrailHead === -1) {
      setUserError("Your trip must start and end at a trail head.");
      setGenrateTripBtnViz(false);
      setSiteMenuViz(true);
      return;
    }
    //pair up coords to get segment data
    const dailyTotals = [] as SegmentData[];
    for (const coordinate of tripInputCoordinates.slice(0, -1)) {
      if (coordinate) {
        const coordinatePair = [
          coordinate,
          tripInputCoordinates[
            _.findIndex(tripInputCoordinates, function (el: number[]) {
              return el[0] == coordinate[0] && el[1] == coordinate[1];
            }) + 1
          ],
        ];
        //@ts-ignore
        const staticData = await getStaticRouteData(coordinatePair);

        dailyTotals.push(staticData);
      }
    }
    //once the trip info is generated, show the trip info, forecast components and their corresponding tittles (which act as toggles)
    //and hide the generate trip info, undo and clear btns
    setSegmentCoordinates(dailyTotals);
    setTripInfoViz(true);
    setTripInfoTitleViz(true);
    setTripForecastViz(true);
    setTripForecastTitleViz(true);
    setClearTripBtnViz(true);
    setGenrateTripBtnViz(false);
    setUndoBtnViz(false);
    setClearBtnViz(false);
    setSiteMenuViz(false);
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        whiteSpace: "nowrap",
        cursor: "pointer",
        fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
      }}
      onClick={() => void generateTripInfo()}
    >
      {" "}
      <img
        src={"/generate.svg"}
        style={{ height: "2.7vh", paddingRight: "1vh", fontSize: "0.8rem" }}
      />
      Generate Itinerary
    </div>
  );
};

export default GenerateTripInfo;
