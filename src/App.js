import { Container } from "react-bootstrap";

import { Body } from "./Body";
import { Header } from "./Header";
import { ErrorModal } from "./ErrorModal";

function App() {
  return (
    <>
      <Container>
        <Header />
        <Body />
      </Container>
      <ErrorModal />
    </>
  );
}

export default App;
