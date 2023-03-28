import { useEffect, useState } from "react";
import { tripCoordObj, SegmentData, TripInfoObj } from "../types";

export interface tripInfoProps {
  tripCoordWithBool: tripCoordObj[];
  segmentCoordinates: SegmentData[];
  tripInfoViz: boolean;
}

export const TripInfo = ({
  tripCoordWithBool,
  segmentCoordinates,
  tripInfoViz,
}: tripInfoProps) => {
  const [tripData, setTripData] = useState<TripInfoObj[]>([]);
  const numberOfDays = tripData.filter(
    (item) => item.isTrailHead === undefined
  ).length;
  let numDaysCounter = 1;
  function mergeArrays(
    markerArray: TripInfoObj[],
    segmentArray: TripInfoObj[]
  ) {
    const result = (
      markerArray.length > segmentArray.length ? markerArray : segmentArray
    )
      .map((_: TripInfoObj, i: number) => [markerArray[i], segmentArray[i]])
      .flat()
      .filter(Boolean);

    return result;
  }
  function configureTripInfo() {
    const markerArray = tripCoordWithBool;
    const segmentArray = segmentCoordinates;
    const mergedArray = mergeArrays(markerArray, segmentArray);
    return mergedArray;
  }

  useEffect(() => {
    const data = configureTripInfo() as TripInfoObj[];
    setTripData(data);
    for (let item of tripData) {
    }
  }, [tripInfoViz]);
  {
    if (tripInfoViz === true) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#70757a",
            fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
          }}
        >
          {tripData.map((dataItem, index) => {
            {
              if (index === 0) {
                return (
                  <div style={{ paddingTop: "2%" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: "4%",
                        fontWeight: "bold",
                        fontSize: "1.19rem",
                      }}
                    >
                      <div style={{ paddingRight: "1%" }}>Day 1</div>
                      <img src="/trailStart.svg" style={{ height: "2.4vh" }} />
                    </div>
                    <div style={{ paddingLeft: "6%", fontSize: "0.9rem" }}>
                      Start your trip at the trailhead -
                      {" " + dataItem.markerName}
                    </div>
                  </div>
                );
              }
              if (index === 1 && dataItem.segmentLength) {
                return (
                  <div>
                    <div
                      key={Math.random()}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingLeft: "6%",
                      }}
                    >
                      <div style={{ paddingRight: "1.5%", fontSize: "0.9rem" }}>
                        Distance:{" "}
                        {" " +
                          (dataItem.segmentLength / 1000).toFixed(2) +
                          " km" +
                          " "}{" "}
                        Gross Elevation Gain:{" "}
                        {" " + dataItem.segmentGrossElevation + " m"}
                      </div>
                    </div>
                  </div>
                );
              }
              if (index === 2) {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      borderBottom: "solid #70757a",
                      paddingLeft: "6%",
                      paddingBottom: "3%",
                      fontSize: "0.9rem",
                    }}
                  >
                    Night 1 Campsite:{" " + dataItem.markerName}
                  </div>
                );
              }

              if (index === tripData.length - 2 && dataItem.segmentLength) {
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      paddingTop: "2%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: "4%",
                        fontWeight: "bold",
                        fontSize: "1.19rem",
                      }}
                    >
                      <div style={{ paddingRight: "2%" }}>
                        Day {" " + numberOfDays}
                      </div>
                      <img src="/finish.svg" style={{ height: "2.4vh" }} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        paddingLeft: "6%",
                        fontSize: "0.9rem",
                      }}
                    >
                      <div>
                        Distance:
                        {" " +
                          (dataItem.segmentLength / 1000).toFixed(2) +
                          " km" +
                          " "}{" "}
                        Gross Elevation Gain:{" "}
                        {" " + dataItem.segmentGrossElevation + " m"}
                      </div>
                    </div>
                  </div>
                );
              }
              if (index === tripData.length - 1) {
                return (
                  <div
                    style={{
                      borderBottom: "solid #70757a",
                      paddingLeft: "6%",
                      paddingBottom: "2%",
                      fontSize: "0.9rem",
                    }}
                  >
                    Finish your trip at the trail end -
                    {" " + dataItem.markerName}
                  </div>
                );
              } else {
                if (dataItem.isTrailHead !== undefined) {
                  return (
                    <div
                      key={Math.random()}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        borderBottom: "solid #70757a",
                        paddingLeft: "6%",
                        paddingBottom: "2%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{ paddingBottom: "1%", fontSize: "0.9rem" }}
                        >
                          Night {numDaysCounter} Campsite:
                          {" " + dataItem.markerName}
                        </div>
                      </div>
                    </div>
                  );
                } else if (dataItem.segmentLength !== undefined) {
                  numDaysCounter = numDaysCounter + 1;

                  return (
                    <div
                      key={Math.random()}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "2%",
                      }}
                    >
                      <div
                        style={{
                          paddingLeft: "4%",
                          paddingRight: "3%",
                          fontWeight: "bold",
                          fontSize: "1.19rem",
                        }}
                      >
                        Day {numDaysCounter}
                        <img
                          src="/frontCountry.svg"
                          style={{ height: "2.5vh" }}
                        />
                      </div>
                      <div style={{ paddingLeft: "6%", fontSize: "0.9rem" }}>
                        Distance:
                        {" " +
                          (dataItem.segmentLength / 1000).toFixed(2) +
                          " km" +
                          " "}
                        Gross Elevation Gain:
                        {" " + dataItem.segmentGrossElevation + " m"}
                      </div>
                    </div>
                  );
                }
              }
            }
          })}
        </div>
      );
    } else {
      return <></>;
    }
  }
};

export default TripInfo;
