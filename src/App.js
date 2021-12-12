import { Routes, Route } from "react-router-dom";
import History from "./components/History";
import Game from "./components/Game";
import Home from "./components/Home";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}
