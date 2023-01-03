import { Table } from "react-bootstrap";

export function Data({ data }) {
  return (
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td>
            <b>Weather</b>
          </td>
          <td>{data?.weather[0].description}</td>
          <td>{data?.weather[0].main}</td>
        </tr>
        <tr>
          <td>
            <b>Main</b>
          </td>
          <td>{data?.main.feels_like}</td>
          <td>{data?.main.temp}</td>
          <td>{data?.main.temp_min}</td>
          <td>{data?.main.temp_max}</td>
        </tr>
        <tr>
          <td>
            <b>Wind</b>
          </td>
          <td>{data?.wind.speed}</td>
        </tr>
      </tbody>
    </Table>
  );
}
