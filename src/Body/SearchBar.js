import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { defaultSearchParams } from "../Services/apiService";
import { ExportDataForm } from "./ExportDataForm";
import { SearchForm } from "./SearchForm";

export function SearchBar({ show, handleClose, setWeatherData }) {
  const [savedParams, setSavedParams] = useState(defaultSearchParams);
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Search</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchForm
          handleCloseBar={handleClose}
          setWeatherData={setWeatherData}
          savedParams={savedParams}
          setSavedParams={setSavedParams}
        />
        <ExportDataForm />
      </Offcanvas.Body>
    </Offcanvas>
  );
}
