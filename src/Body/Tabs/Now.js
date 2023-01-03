import { useEffect, useState } from "react";
import { ErrorModal } from "../../ErrorModal";
import { getWeather } from "../../Services/apiService";
import { Data } from "./Data";
import { Map } from "./Map";

export function Now() {
  const [errorMassage, setErrorMassage] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await getWeather();
        const data = await response.json();
        if (data.cod !== 200) {
          throw Error(data.message);
        }
        setWeatherData(data);
      } catch (error) {
        setErrorMassage(error.message);
      }
    })();
  }, []);
  return (
    <>
      <Data data={weatherData} />
      <Map />
      <ErrorModal
        message={errorMassage}
        handleClose={() => setErrorMassage(null)}
      />
    </>
  );
}
