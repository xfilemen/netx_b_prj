import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Detail from "./routes/detail";
import Home from "./routes/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movie" element={<Detail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
