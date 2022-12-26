import { useEffect } from "react";
import { getForecast } from "../../Services/apiService";
import { Map } from "./Map";
import { TimeSelector } from "./TimeSelector";

export function Forecast() {
  useEffect(() => {
    (async function () {
      const weather = await getForecast();
      const response = await weather.json();
      console.log("response", response);
    })();
  }, []);
  return (
    <>
      <TimeSelector id={"forecast"} />
      <Map />
    </>
  );
}
