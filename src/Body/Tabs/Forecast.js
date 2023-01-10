import { useEffect, useState } from "react";
import { ErrorModal } from "../../ErrorModal";
import { getForecast } from "../../Services/apiService";
import { Map } from "./Map";
import { TimeSelector } from "./TimeSelector";

export function Forecast() {
  const [errorMassage, setErrorMassage] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await getForecast();
        const data = await response.json();

        if (+data.cod !== 200) {
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
      <TimeSelector
        data={forecastData}
        currentData={currentData}
        setCurrentData={setCurrentData}
      />
      <Map weatherData={currentData} />
      <ErrorModal
        message={errorMassage}
        handleClose={() => setErrorMassage(null)}
      />
    </>
  );
}
