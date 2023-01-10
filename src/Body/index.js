import { useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import { SearchBar } from "./SearchBar";
import { Now } from "./Tabs/Now";
import { Forecast } from "./Tabs/Forecast";
import "./body.scss";

export function Body() {
  const [showBar, setShowBar] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const handleCloseBar = () => setShowBar(false);
  const handleShowBar = () => setShowBar(true);

  return (
    <>
      <Button className="my-4" variant="primary" onClick={handleShowBar}>
        Search
      </Button>
      <SearchBar
        show={showBar}
        handleClose={handleCloseBar}
        setWeatherData={setWeatherData}
      />
      <Tabs
        defaultActiveKey="now"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="now" title="Now">
          <Now weatherData={weatherData} setWeatherData={setWeatherData} />
        </Tab>
        <Tab eventKey="forecast" title="Forecast">
          <Forecast />
        </Tab>
      </Tabs>
    </>
  );
}
