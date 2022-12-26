import { Offcanvas } from "react-bootstrap";
import { ExportDataForm } from "./ExportDataForm";
import { SearchForm } from "./SearchForm";

export function SearchBar({ show, handleClose }) {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Search</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchForm />
        <ExportDataForm />
      </Offcanvas.Body>
    </Offcanvas>
  );
}
