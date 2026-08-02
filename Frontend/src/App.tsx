import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AIAssistant from "./pages/AIAssistant";
import Destinations from "./pages/Destinations";
import TripPlanner from "./pages/TripPlanner";
import Hotels from "./pages/Hotels";
import Culinary from "./pages/Culinary";
import Culture from "./pages/Culture";

export default function App() {
  return (
    <Routes>
      <Route

    path="/trip-planner"

    element={<TripPlanner />}

/>

      <Route path="/" element={<Home />} />

      <Route path="/destinations" element={<Destinations />} />

      <Route path="/trip-planner" element={<TripPlanner />} />

      <Route path="/hotels" element={<Hotels />} />

      <Route path="/culinary" element={<Culinary />} />

      <Route path="/culture" element={<Culture />} />

      <Route path="/ai-chat" element={<AIAssistant />} />

    </Routes>
  );
}