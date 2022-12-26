import { Button, Form } from "react-bootstrap";
import { getForecast, getWeather } from "../Services/apiService";

export function ExportDataForm() {
  const dataFormats = ["JSON", "XML", "HTML"];
  const dataEndpoints = ["Current Weather Data", "5 day weather forecast"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const getDataEndpoint = e.target.endpoint.value;
    const getDataFormat = e.target.format.value;

    (async function () {
      const weather =
        getDataEndpoint === "Current Weather Data"
          ? await getWeather(null, getDataFormat.toLowerCase())
          : await getForecast(null, getDataFormat.toLowerCase());

      const response = await weather.text();

      return window
        .open()
        .document.body.append(
          (document.createElement(
            "p"
          ).innerText = `${getDataEndpoint}, Data format: ${getDataFormat}`),
          document.createElement("hr"),
          `${response}`
        );
    })();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-4">
        <Form.Label>Choose current or 5 day forecast weather data:</Form.Label>
        {dataEndpoints.map((endpoint) => (
          <Form.Check
            type="radio"
            id={endpoint}
            label={endpoint}
            key={endpoint}
            name="endpoint"
            value={endpoint}
            defaultChecked={endpoint === "Current Weather Data"}
          />
        ))}
      </Form.Group>
      <Form.Group className="my-4">
        <Form.Label>Setting format data for export:</Form.Label>
        {dataFormats.map((format) => (
          <Form.Check
            type="radio"
            id={format}
            label={format}
            key={format}
            name="format"
            value={format}
            defaultChecked={format === "JSON"}
          />
        ))}
      </Form.Group>

      <Button className="w-100" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
