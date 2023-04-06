import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { AddressObj, tripCoordObj, MyGeoJson } from "../types";
import LoadingMsg from "../components/loadingMsg";
import ErrorMsg from "../components/errrorMsg";

interface drivingRoutePlannerProps {
  directionsViz: boolean;
  drivingDirections: MyGeoJson | undefined;
  setDrivingDirections: Dispatch<SetStateAction<MyGeoJson | undefined>>;
  tripCoordWithBool: tripCoordObj[];
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
  loadingMsgHeight: string;
  setLoadingMsgHeight: Dispatch<SetStateAction<string>>;
  loadingMsgWidth: string;
  setLoadingMsgWidth: Dispatch<SetStateAction<string>>;
  loadingMsgPaddingBottom: string;
  setAdrForUserVerification: Dispatch<SetStateAction<AddressObj[] | undefined>>;
  adrForUserVerification: AddressObj[] | undefined;
  selectedAdrId: string;
  setSelectedAdrId: Dispatch<SetStateAction<string>>;
  getDirectionsBtnDisabled: boolean;
  setGetDirectionsBtnDisabled: Dispatch<SetStateAction<boolean>>;
}

export const DrivingRoutePlanner = ({
  directionsViz,
  drivingDirections,
  setDrivingDirections,
  tripCoordWithBool,
  address,
  setAddress,
  loadingMsgHeight,
  setLoadingMsgHeight,
  loadingMsgWidth,
  setLoadingMsgWidth,
  loadingMsgPaddingBottom,
  setAdrForUserVerification,
  adrForUserVerification,
  setSelectedAdrId,
  selectedAdrId,
  setGetDirectionsBtnDisabled,
  getDirectionsBtnDisabled,
}: drivingRoutePlannerProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [adrSelectedByUser, setAdrSelectedByUser] = useState<AddressObj>();
  //   const [getDirectionsBtnDisabled, setGetDirectionsBtnDisabled] =
  //     useState<boolean>(true);
  const [hasSelectedFromMultiple, setHasSelectedFromMultiple] =
    useState<boolean>(false);
  const [selectedAdrCoordinates, setSelectedAdrCoordinates] = useState<
    number[]
  >([0, 0]);
  const [trailHeadCoordinates, setTrailHeadCoordinates] = useState<number[]>([
    0, 0,
  ]);
  setLoadingMsgHeight("50%");
  setLoadingMsgWidth("50%");
  const {
    isLoading: drivingDataIsLoading,
    isError: drivingDataIsError,
    mutateAsync: getDrivingData,
  } = api.getDrivingDirections.getRouteData.useMutation();

  const {
    isLoading: adrCoordDataIsLoading,
    isError: adrCoordDataIsError,
    mutateAsync: getAdrCoord,
  } = api.getAddressCoordinates.getData.useMutation();

  async function getDrivingRouteData() {
    if (adrSelectedByUser !== undefined && tripCoordWithBool[0] !== undefined) {
      setSelectedAdrCoordinates(adrSelectedByUser.geometry.coordinates);
      const startAndEndCoord = [selectedAdrCoordinates, trailHeadCoordinates];

      const res = await getDrivingData({
        coordinates: startAndEndCoord,
      });
      setDrivingDirections(res.geojsonObject);
    }
  }

  //used to set button abled/disabled onClick and styles after user is done typeing
  function debounceInput() {
    console.log("getDirectionsBtnDisabled 1 ", getDirectionsBtnDisabled);

    const setDisabledState = setTimeout(() => {
      setGetDirectionsBtnDisabled(false);
      console.log("getDirectionsBtnDisabled 2 ", getDirectionsBtnDisabled);
    }, 1000);
    return () => clearTimeout(setDisabledState);
  }

  //selectedAdrId is set when user selects adr from the options returned
  useEffect(() => {
    console.log("adr selected ", selectedAdrId);
    const selectedAdr = adrForUserVerification?.filter(
      (adr) => adr.properties.id === selectedAdrId
    )[0];
    console.log("adrForUserVerification ", adrForUserVerification);
    setAdrSelectedByUser(selectedAdr);
  }, [selectedAdrId]);

  //adrSelectedByUser set either when user has selected from multiple or if only one result is returned
  useEffect(() => {
    if (adrSelectedByUser !== undefined) {
      console.log("selected adr set and coordinates retrieved");
      setSelectedAdrCoordinates(adrSelectedByUser.geometry.coordinates);
    }
  }, [adrSelectedByUser]);

  //after the address is selected and the coordinates determined, the route is retrieved
  useEffect(() => {
    console.log("route data fetched");
    const fetchDrivingData = async () => {
      await getDrivingRouteData();
    };
    fetchDrivingData().catch(console.error);
  }, [selectedAdrCoordinates]);

  useEffect(() => {
    if (tripCoordWithBool[0] !== undefined) {
      setTrailHeadCoordinates(tripCoordWithBool[0].coordinate);
      setHasSelectedFromMultiple(true);
    }
  }, [adrSelectedByUser]);

  async function getDirections() {
    const res = await getAdrCoord({
      address: address,
    });
    //@ts-ignore
    if (res.addressObj.length > 1) {
      setAdrForUserVerification(res.addressObj);
      setHasSelectedFromMultiple(false);
    } else {
      setAdrSelectedByUser(res.addressObj[0]);
    }
  }

  return (
    <div
      style={{
        display: directionsViz === true ? "block" : "none",
        overflowY: "auto",
        height: "25vh",
        fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", padding: "2%" }}>
        <label>Enter departure address:</label>
        <input
          onChange={(e) => {
            debounceInput();
            setAddress(e.target.value);
          }}
          style={{ width: "60%" }}
          value={address}
        />{" "}
      </div>
      <div style={{ paddingTop: "1%", paddingLeft: "2%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: getDirectionsBtnDisabled
              ? "rgba(26, 115, 232,0.2)"
              : "rgba(26, 115, 232,0.5)",
            width: "30%",
            color: getDirectionsBtnDisabled ? "grey" : "black",
            padding: "1.4%",
            borderRadius: "25px",
            boxShadow:
              "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
            cursor: "pointer",
          }}
          onClick={() => !getDirectionsBtnDisabled && void getDirections()}
        >
          <div> Get Directions</div>
        </div>
      </div>
      {(drivingDataIsError || adrCoordDataIsError) && <ErrorMsg />}
      {(adrCoordDataIsLoading || drivingDataIsLoading) && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingMsg
            loadingMsgPaddingBottom={loadingMsgPaddingBottom}
            loadingMsgHeight={loadingMsgHeight}
            loadingMsgWidth={loadingMsgWidth}
          />
        </div>
      )}
      {!adrCoordDataIsLoading &&
        !drivingDataIsLoading &&
        adrForUserVerification &&
        !hasSelectedFromMultiple && (
          <div style={{ padding: "2%" }}>
            Your search returned multiple results. Please click on the correct
            address in the list below:
          </div>
        )}
      {!adrCoordDataIsLoading &&
        !drivingDataIsLoading &&
        adrForUserVerification &&
        !hasSelectedFromMultiple &&
        adrForUserVerification.map((address, index) => {
          return (
            <div
              key={address.properties.id}
              style={{
                display: "flex",
                flexDirection: "row",
                color: hoveredIndex === index ? "blue" : "black",
                paddingTop: "0.5%",
                paddingBottom: "0.5%",
                paddingLeft: "2%",
                cursor: "pointer",
              }}
              onMouseEnter={() => {
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setHoveredIndex(-1);
              }}
              onClick={() => {
                setSelectedAdrId(address.properties.id);
              }}
            >
              <div style={{ paddingRight: "2%" }}>
                {address.properties.name}
              </div>
              {address.properties.locality && (
                <div style={{ paddingRight: "2%" }}>
                  {address.properties.locality}
                </div>
              )}
              {!address.properties.locality && (
                <div style={{ paddingRight: "2%" }}>
                  {address.properties.county}
                </div>
              )}
              <div>{address.properties.postalcode}</div>
            </div>
          );
        })}
      {!adrCoordDataIsLoading &&
        !drivingDataIsLoading &&
        adrSelectedByUser &&
        drivingDirections &&
        drivingDirections.features[0] && (
          <div style={{ paddingTop: "3%", paddingLeft: "3.5%" }}>
            <div>
              Distance:
              {" " +
                `${(
                  drivingDirections.features[0].properties.summary.distance /
                  1000
                ).toFixed(2)}` +
                " km"}
            </div>
            <div>
              Estimated Drive Time:
              {" " +
                `${drivingDirections.features[0].properties.summary.duration}`}
            </div>

            {selectedAdrCoordinates[0] &&
              selectedAdrCoordinates[1] &&
              trailHeadCoordinates[0] &&
              trailHeadCoordinates[1] && (
                <a
                  href={
                    "https://www.google.com/maps/dir/?api=1&origin=" +
                    `${selectedAdrCoordinates[1]}` +
                    "," +
                    `${selectedAdrCoordinates[0]}` +
                    "&destination=" +
                    `${trailHeadCoordinates[1]}` +
                    "," +
                    `${trailHeadCoordinates[0]}` +
                    "&ttype=arr&time=12%3A00&date=07%2F30"
                    //data=2m3!6e0!7e2!8j1691508000!3e0
                  }
                  target="_blank"
                >
                  View Route in Google Maps
                </a>
              )}
          </div>
        )}
    </div>
  );
};

export default DrivingRoutePlanner;
