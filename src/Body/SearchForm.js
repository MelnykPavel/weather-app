import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { getWeather, defaultSearchParams } from "../Services/apiService";

export function SearchForm({ handleCloseBar, setWeatherData }) {
  //defaultProps
  const { lat, lon, unit, lang } = defaultSearchParams;

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

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-4">
        <Form.Label>City:</Form.Label>
        <Form.Select
          name="city"
          defaultValue={cities[0]}
          onChange={handleCitySelect}
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
          value={selectedCity?.lat || lat}
          onChange={() => {}}
        />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="text"
          name="lon"
          placeholder="2.17435"
          value={selectedCity?.lon || lon}
          onChange={() => {}}
        />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Units of measurement:</Form.Label>
        {units.map((unitItem) => (
          <Form.Check
            type="radio"
            id={unitItem}
            label={unitItem}
            key={unitItem}
            name="units"
            value={unitItem}
            defaultChecked={unit === unitItem}
          />
        ))}
      </Form.Group>
      <Form.Group className="my-4">
        <Form.Label>Language:</Form.Label>
        <Form.Select name="lang" defaultValue={lang}>
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
