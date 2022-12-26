import { useEffect } from "react";
import { getWeather } from "../../Services/apiService";
import { Map } from "./Map";
import { TimeSelector } from "./TimeSelector";

export function Now() {
  useEffect(() => {
    (async function () {
      const weather = await getWeather();
      const response = await weather.json();
      console.log("response", response);
    })();
  }, []);
  return (
    <>
      <TimeSelector id={"now"} />
      <Map />
    </>
  );
}
