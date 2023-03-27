import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { tripCoordObj, Forecast } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "~/utils/api";

export interface tripForecastProps {
  tripCoordWithBool: tripCoordObj[];
  sestTripInfoViz: Dispatch<SetStateAction<boolean>>;
  tripForecastViz: boolean;
  sestTripForecastViz: Dispatch<SetStateAction<boolean>>;
}

export const TripForecast = (props: tripForecastProps) => {
  const [tripForecast, setTripForecast] = useState<Forecast>();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [forecastHeight, setForecastHeight] = useState("15vh");
  const {
    isLoading: forecastDataIsLoading,
    isError: forecastDataIsError,
    isSuccess: forecastDataIsSuccess,
    mutateAsync: getForecastData,
  } = api.getTripForecast.getData.useMutation();

  async function getForecast() {
    if (startDate != null && endDate != null) {
      const formattedStartDate = startDate.toLocaleDateString("sv");
      const formattedEndDate = endDate.toLocaleDateString("sv");

      props.sestTripInfoViz(false);
      //@ts-ignore
      const trailHeadLong = props.tripCoordWithBool[0].coordinate[0].toString();
      //@ts-ignore
      const trailHeadLat = props.tripCoordWithBool[0].coordinate[1].toString();

      const res = await getForecastData({
        trailHeadLong: trailHeadLong,
        trailHeadLat: trailHeadLat,
        formattedStartDate: formattedStartDate,
        formattedEndDate: formattedEndDate,
      });
      setTripForecast(res.forecast);
      setForecastHeight("31vh");
    }
  }

  return (
    <div
      style={{
        display: props.tripForecastViz === true ? "block" : "none",
        overflowY: "auto",
        height: forecastHeight,
        scrollbarColor: "black !important",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingBottom: "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "2%",
            paddingTop: "2%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ paddingRight: "18%" }}>
              <div style={{ paddingBottom: "2%" }}>Start Date</div>
              <div style={{ paddingBottom: "5%" }}>
                {" "}
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                />
              </div>
            </div>
            <div>
              <div style={{ paddingBottom: "2%" }}>End Date</div>
              <div style={{ paddingBottom: "5%" }}>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                />
              </div>{" "}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(26, 115, 232,0.5)",
              width: "30%",
              color: "black",
              padding: "1%",
              borderRadius: "25px",
              boxShadow:
                "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
            }}
            onClick={getForecast}
          >
            <div> Get Forecast</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            paddingTop: "2%",
            paddingLeft: "2%",
            fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
          }}
        >
          {tripForecast &&
            tripForecast.days.map((dailyForecast) => {
              return (
                <div
                  key={Math.random()}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    paddingTop: "1%",
                    paddingBottom: "1%",
                    paddingLeft: "2%",
                    fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>
                    {dailyForecast.datetime}
                  </div>
                  <div style={{}}>
                    High:{" " + dailyForecast.tempmax + "°C"}
                  </div>
                  <div>Low:{" " + dailyForecast.tempmin + "°C"}</div>
                  <div>Feels Like:{" " + dailyForecast.feelslike + "°C"}</div>
                  <div>Precipitation:{" " + dailyForecast.precip + " mm"}</div>
                  <div>Conditions:{" " + dailyForecast.conditions}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TripForecast;
