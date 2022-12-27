import { useEffect, useState } from "react";
import { ErrorModal } from "../../ErrorModal";
import { getWeather } from "../../Services/apiService";
import { Map } from "./Map";
import { TimeSelector } from "./TimeSelector";

export function Now() {
  const [errorMassage, setErrorMassage] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const weather = await getWeather();
        const response = await weather.json();
        console.log("response", response);
        if (response.cod !== 200) {
          throw Error(response.message);
        }
      } catch (error) {
        setErrorMassage(error.message);
      }
    })();
  }, []);
  return (
    <>
      <TimeSelector id={"now"} />
      <Map />
      <ErrorModal
        message={errorMassage}
        handleClose={() => setErrorMassage(null)}
      />
    </>
  );
}
