import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ErrorModal } from "../../ErrorModal";
import { getWeather } from "../../Services/apiService";
import { Data } from "./Data";
import { Map } from "./Map";

export function Now() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const searchParams = useSelector((state) => state.searchParams);

  useEffect(() => {
    (async function () {
      try {
        const response = await getWeather(searchParams);
        const data = await response.json();
        if (+data.cod !== 200) {
          throw Error(data.message);
        }
        setWeatherData(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    })();
  }, [searchParams]);
  return (
    <>
      <Data data={weatherData} />
      <Map weatherData={weatherData} />
      <ErrorModal
        message={errorMessage}
        handleClose={() => setErrorMessage(null)}
      />
    </>
  );
}
