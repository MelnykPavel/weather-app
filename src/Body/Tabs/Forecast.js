import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../../Services/apiService";
import { setErrorMessage } from "../../Services/stateService";
import { Data } from "./Data";
import { Map } from "./Map";
import { TimeSelector } from "./TimeSelector";

export function Forecast() {
  const [forecastData, setForecastData] = useState(null);

  const searchParams = useSelector((state) => state.searchParams);

  const forecastSelectedData = useSelector(
    (state) => state.forecastSelectedData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const response = await getForecast(searchParams);
        const data = await response.json();
        if (+data.cod !== 200) {
          throw Error(data.message);
        }
        setForecastData(data);
      } catch (error) {
        dispatch(setErrorMessage(error.message));
      }
    })();
  }, [searchParams, dispatch]);

  const weatherData = forecastData
    ? {
        ...forecastData?.list[0],
        coord: forecastData?.city.coord,
      }
    : null;

  return (
    <>
      <TimeSelector data={forecastData} />
      <Data data={forecastSelectedData || weatherData} />

      <Map weatherData={forecastSelectedData || weatherData} />
    </>
  );
}
