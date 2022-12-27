import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ErrorModal } from "../ErrorModal";
import {
  defaultSearchParams,
  getForecast,
  getWeather,
} from "../Services/apiService";

export function ExportDataForm() {
  const [errorMassage, setErrorMessage] = useState(null);

  const dataFormats = ["json", "xml", "html"];
  const dataEndpoints = ["Current Weather Data", "5 day weather forecast"];

  const handleSubmit = (e) => {
    e.preventDefault();

    const getDataEndpoint = e.target.endpoint.value;
    const getDataFormat = e.target.format.value;

    if (!getDataEndpoint) {
      setErrorMessage("Please choose endpoint");
      return;
    }

    const get =
      getDataEndpoint === "Current Weather Data" ? getWeather : getForecast;

    get({
      ...defaultSearchParams,
      getDataEndpoint,
    })
      .then((response) => response.text())
      .then((data) => {
        const objData = JSON.parse(data);
        if (objData.cod !== 200) throw Error(objData.message);

        window
          .open()
          .document.body.append(
            (document.createElement(
              "p"
            ).innerText = `${getDataEndpoint}, data format: ${getDataFormat}`),
            document.createElement("hr"),
            `${data}`
          );
      })
      .catch((error) => setErrorMessage(error.message));
    // (async function () {
    //     const weather =
    //       getDataEndpoint === "Current Weather Data"
    //         ? await getWeather(null, getDataFormat)
    //         : await getForecast(null, getDataFormat);

    //     const response = await weather.text();

    //     return window
    //       .open()
    //       .document.body.append(
    //         (document.createElement(
    //           "p"
    //         ).innerText = `${getDataEndpoint}, data format: ${getDataFormat}`),
    //         document.createElement("hr"),
    //         `${response}`
    //       );
    //   })();
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h5 className="my-4">Export</h5>
        <Form.Group className="my-4">
          <Form.Label>
            Choose current or 5 day forecast weather data:
          </Form.Label>
          {dataEndpoints.map((endpoint) => (
            <Form.Check
              type="radio"
              id={endpoint}
              label={endpoint}
              key={endpoint}
              name="endpoint"
              value={endpoint}
            />
          ))}
        </Form.Group>
        <Form.Group className="my-4">
          <Form.Label>Setting format data for export:</Form.Label>
          <Form.Select name="format" defaultChecked="json">
            {dataFormats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button className="w-100" variant="warning" type="submit">
          Export
        </Button>
      </Form>
      <ErrorModal
        message={errorMassage}
        handleClose={() => setErrorMessage(null)}
      />
    </>
  );
}
