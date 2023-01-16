import moment from "moment";
import { Col, Row, Table } from "react-bootstrap";

export function Data({ data }) {
  let iconURL = ``;
  if (data) {
    iconURL = `http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`;
  }
  return (
    <>
      <Row className="dayDescription">
        <Col sm={12} md={6}>
          <span>{moment.unix(data?.dt).format("MMMM Do YYYY, HH:mm")}</span>
        </Col>
        <Col sm={12} md={6}>
          <img alt="icon" src={iconURL}></img>
          <span>{data?.main.temp} ℃</span>
        </Col>
      </Row>
      <Table bordered size="sm">
        <tbody>
          <tr>
            <td>
              <b>Weather:</b>
            </td>

            <td colSpan={2}>{data?.weather[0].description}</td>
            <td colSpan={2}>{data?.weather[0].main}</td>
          </tr>
          <tr>
            <td>
              <b>Temperature:</b>
            </td>
            <td>{data?.main.feels_like}</td>
            <td>{data?.main.temp}</td>
            <td>{data?.main.temp_min}</td>
            <td>{data?.main.temp_max}</td>
          </tr>
          <tr>
            <td>
              <b>Wind speed:</b>
            </td>
            <td colSpan={4}>{data?.wind.speed}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
