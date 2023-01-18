import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../../Services/apiService";
import { setErrorMessage } from "../../Services/stateService";
import { Data } from "./Data";
import { Map } from "./Map";

export function Now() {
  const [weatherData, setWeatherData] = useState(null);

  const searchParams = useSelector((state) => state.searchParams);

  const dispatch = useDispatch();

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
        dispatch(setErrorMessage(error.message));
      }
    })();
  }, [searchParams, dispatch]);
  return (
    <>
      <Data data={weatherData} />
      <Map weatherData={weatherData} />
    </>
  );
}
