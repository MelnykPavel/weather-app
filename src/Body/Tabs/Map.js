import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { defaultSearchParams } from "../../Services/apiService";

export function Map() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const center = {
    lat: defaultSearchParams.lat,
    lng: defaultSearchParams.lon,
  };

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ height: "500px", width: "500px" }}
          center={center}
          zoom={7}
        />
      )}
    </>
  );
}
