import { GoogleMap, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
import { defaultSearchParams } from "../../Services/apiService";

export function Map({ weatherData }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });

  const center = {
    lat: weatherData?.coord.lat || +defaultSearchParams.lat,
    lng: weatherData?.coord.lon || +defaultSearchParams.lon,
  };

  let iconURL = ``;

  if (weatherData) {
    iconURL = `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`;
  }
  console.log(`weatherData`, weatherData);
  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: "500px", width: "100%" }}
          center={center}
          zoom={10}
        >
          <InfoWindow position={center}>
            <div>
              <img className="weather-icon" alt="icon" src={iconURL}></img>
              <b>{weatherData?.main.temp}°</b>
            </div>
          </InfoWindow>
        </GoogleMap>
      )}
    </>
  );
}
