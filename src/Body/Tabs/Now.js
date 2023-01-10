import { useEffect, useState } from "react";
import { ErrorModal } from "../../ErrorModal";
import { getWeather } from "../../Services/apiService";
import { Data } from "./Data";
import { Map } from "./Map";

export function Now({ weatherData, setWeatherData }) {
  const [errorMassage, setErrorMassage] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await getWeather();
        const data = await response.json();
        if (+data.cod !== 200) {
          console.log("NOW");
          throw Error(data.message);
        }
        setWeatherData(data);
      } catch (error) {
        setErrorMassage(error.message);
      }
    })();
  }, [setWeatherData]);
  return (
    <>
      <Data data={weatherData} />
      <Map weatherData={weatherData} />
      <ErrorModal
        message={errorMassage}
        handleClose={() => setErrorMassage(null)}
      />
    </>
  );
}
