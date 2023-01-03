import { useEffect, useState } from "react";
import { ErrorModal } from "../../ErrorModal";
import { getForecast } from "../../Services/apiService";
import { Map } from "./Map";
import { TimeSelector } from "./TimeSelector";

export function Forecast() {
  const [errorMassage, setErrorMassage] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const response = await getForecast();
        const data = await response.json();
        if (data.cod !== 200) {
          throw Error(data.message);
        }
        setForecastData(data);
      } catch (error) {
        setErrorMassage(error.message);
      }
    })();
  }, []);

  return (
    <>
      <TimeSelector data={forecastData} />
      <Map />
      <ErrorModal
        message={errorMassage}
        handleClose={() => setErrorMassage(null)}
      />
    </>
  );
}
