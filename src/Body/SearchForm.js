import { Button, Form } from "react-bootstrap";
import { getWeather, defaultSearchParams } from "../Services/apiService";

export function SearchForm() {
  //defaultProps
  const { lat, lon, unit, lang } = defaultSearchParams;

  const units = ["standard", "metric", "imperial"];

  const languages = [
    { code: "en", label: "English" },
    { code: "ru", label: "Russian" },
    { code: "sv", label: "Swedish" },
    { code: "zh_cn", label: "Chinese Simplified" },
    { code: "fi", label: "Finnish" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      lat: e.target.lat.value,
      lon: e.target.lon.value,
      units: e.target.units.value,
      lang: e.target.lang.value,
    };

    const weather = await getWeather(data);
    const response = await weather.json();
    console.log("response", response);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-4">
        <Form.Label>latitude</Form.Label>
        <Form.Control
          type="text"
          name="lat"
          placeholder="41.94353"
          defaultValue={lat}
        />
        <Form.Text className="text-muted" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Longitude</Form.Label>
        <Form.Control
          type="text"
          name="lon"
          placeholder="2.17435"
          defaultValue={lon}
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
