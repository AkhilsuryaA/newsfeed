import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import View from "./components/view";

function App() {
  return (
    <>
      <Router>
        <View />
      </Router>
    </>
  );
}

export default App;
