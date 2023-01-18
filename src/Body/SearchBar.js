import { useSelector, useDispatch } from "react-redux";
import { Offcanvas } from "react-bootstrap";
import { setShowSearchBar } from "../Services/stateService";
import { ExportDataForm } from "./ExportDataForm";
import { SearchForm } from "./SearchForm";

export function SearchBar() {
  const showSearchBar = useSelector((state) => state.showSearchBar);

  const dispatch = useDispatch();

  const handleClose = () => dispatch(setShowSearchBar(false));
  return (
    <Offcanvas show={showSearchBar} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Search</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchForm handleCloseBar={handleClose} />
        <ExportDataForm />
      </Offcanvas.Body>
    </Offcanvas>
  );
}
