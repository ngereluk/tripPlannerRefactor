import { Dispatch, SetStateAction, useState } from "react";
import { tripCoordObj, Forecast } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "~/utils/api";
import LoadingMsg from "./loadingMsg";
import ErrorMsg from "./errrorMsg";

export interface tripForecastProps {
  tripCoordWithBool: tripCoordObj[];
  setTripInfoViz: Dispatch<SetStateAction<boolean>>;
  tripForecastViz: boolean;
  tripForecast: Forecast | undefined;
  setTripForecast: Dispatch<SetStateAction<Forecast | undefined>>;
  loadingMsgHeight: string;
  setLoadingMsgHeight: Dispatch<SetStateAction<string>>;
  loadingMsgWidth: string;
  setLoadingMsgWidth: Dispatch<SetStateAction<string>>;
  loadingMsgPaddingBottom: string;
  setLoadingMsgPaddingBottom: Dispatch<SetStateAction<string>>;
}

export const TripForecast = ({
  tripCoordWithBool,
  setTripInfoViz,
  tripForecastViz,
  tripForecast,
  setTripForecast,
  loadingMsgHeight,
  setLoadingMsgHeight,
  loadingMsgWidth,
  setLoadingMsgWidth,
  loadingMsgPaddingBottom,
  setLoadingMsgPaddingBottom,
}: tripForecastProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [forecastHeight, setForecastHeight] = useState("15vh");
  setLoadingMsgHeight("50%");
  setLoadingMsgWidth("50%");
  setLoadingMsgPaddingBottom("5%");
  const {
    isLoading: forecastDataIsLoading,
    isError: forecastDataIsError,
    mutateAsync: getForecastData,
  } = api.getTripForecast.getData.useMutation();

  async function getForecast() {
    if (startDate != null && endDate != null) {
      const formattedStartDate = startDate.toLocaleDateString("sv");
      const formattedEndDate = endDate.toLocaleDateString("sv");

      setTripInfoViz(false);
      const trailHeadLong = tripCoordWithBool[0]?.coordinate[0]?.toString();
      const trailHeadLat = tripCoordWithBool[0]?.coordinate[1]?.toString();

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
  {
    if (forecastDataIsLoading) {
      return (
        <LoadingMsg
          loadingMsgPaddingBottom={loadingMsgPaddingBottom}
          loadingMsgHeight={loadingMsgHeight}
          loadingMsgWidth={loadingMsgWidth}
        />
      );
    }
    if (forecastDataIsError) {
      return (
        <div style={{ paddingTop: "5%" }}>
          {" "}
          <ErrorMsg />
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: tripForecastViz === true ? "block" : "none",
            overflowY: "auto",
            height: forecastHeight,
            fontFamily: "'Google Sans',Roboto,Arial,sans-serif",
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
                onClick={() => void getForecast()}
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
                color: "black",
                fontSize: "0.8rem",
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
                        High:{" " + `${dailyForecast.tempmax}` + "°C"}
                      </div>
                      <div>Low:{" " + `${dailyForecast.tempmin}` + "°C"}</div>
                      <div>
                        Feels Like:{" " + `${dailyForecast.feelslike} ` + "°C"}
                      </div>
                      <div>
                        Precipitation:{" " + `${dailyForecast.precip}` + " mm"}
                      </div>
                      <div>
                        Conditions:{" " + `${dailyForecast.conditions}`}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    }
  }
};

export default TripForecast;
