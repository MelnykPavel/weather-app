import { Button, Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { SearchBar } from "./SearchBar";
import { Forecast } from "./Tabs/Forecast";
import { Now } from "./Tabs/Now";
import { setShowSearchBar } from "../Services/stateService";

import "./body.scss";

export function Body() {
  const dispatch = useDispatch();

  const handleShowBar = () => dispatch(setShowSearchBar(true));

  return (
    <>
      <Button className="my-4" variant="primary" onClick={handleShowBar}>
        Search
      </Button>
      <SearchBar />
      <Tabs
        defaultActiveKey="now"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="now" title="Now">
          <Now />
        </Tab>
        <Tab eventKey="forecast" title="Forecast">
          <Forecast />
        </Tab>
      </Tabs>
    </>
  );
}
