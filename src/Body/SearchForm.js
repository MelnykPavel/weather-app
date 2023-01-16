import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getWeather } from "../Services/apiService";

export function SearchForm({
  handleCloseBar,
  setWeatherData,
  savedParams,
  setSavedParams,
}) {
  const units = ["standard", "metric", "imperial"];

  const cities = [
    { label: "Tallinn", lat: 59.437, lon: 24.7536 },
    { label: "Tartu", lat: 58.378, lon: 26.729 },
    { label: "Pärnu", lat: 58.3917, lon: 24.4953 },
    { label: "Kuressaare", lat: 58.255, lon: 22.4919 },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "ru", label: "Russian" },
    { code: "sv", label: "Swedish" },
    { code: "zh_cn", label: "Chinese Simplified" },
    { code: "fi", label: "Finnish" },
  ];

  const [selectedCity, setSelectedCity] = useState(null);

  const handleCitySelect = (e) => {
    const selectedCityObj = cities.find(
      (city) => city.label === e.target.value
    );
    setSelectedCity(selectedCityObj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      lat: e.target.lat.value,
      lon: e.target.lon.value,
      units: e.target.units.value,
      lang: e.target.lang.value,
    };

    const response = await getWeather(params);
    const data = await response.json();

    handleCloseBar();
    setWeatherData(data);
  };

  const handleOnChange = (e) => {
    switch (e.target.name) {
      case "city":
        setSavedParams({ ...savedParams, city: e.target.value });
        break;
      case "lat":
        setSavedParams({ ...savedParams, lat: e.target.value });
        break;
      case "lon":
        setSavedParams({ ...savedParams, lon: e.target.value });
        break;
      case "units":
        setSavedParams({ ...savedParams, units: e.target.id });
        break;
      case "lang":
        setSavedParams({ ...savedParams, lang: e.target.value });
        break;
      default:
        break;
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-4">
        <Form.Label>City:</Form.Label>
        <Form.Select
          name="city"
          defaultValue={savedParams.city || cities[0]}
          onChange={(handleCitySelect, handleOnChange)}
        >
          {cities.map((city) => (
            <option value={city.label} key={city.label}>
              {city.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-4">
        <Form.Label>latitude</Form.Label>
        <Form.Control
          type="text"
          name="lat"
          placeholder="41.94353"
          value={selectedCity?.lat || savedParams.lat}
          onChange={handleOnChange}
        />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="text"
          name="lon"
          placeholder="2.17435"
          value={selectedCity?.lon || savedParams.lon}
          onChange={handleOnChange}
        />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Units of measurement:</Form.Label>
        {units.map((unit) => (
          <Form.Check
            type="radio"
            id={unit}
            label={unit}
            key={unit}
            name="units"
            defaultChecked={savedParams.units === unit}
            onChange={handleOnChange}
          />
        ))}
      </Form.Group>
      <Form.Group className="my-4">
        <Form.Label>Language:</Form.Label>
        <Form.Select
          name="lang"
          defaultValue={savedParams.lang}
          onChange={handleOnChange}
        >
          {languages.map((language) => (
            <option value={language.code} key={language.code}>
              {language.label}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button className="w-100" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
