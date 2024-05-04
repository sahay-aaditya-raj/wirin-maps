import TextDirectionsComponent from "./components/mapDirectionText";
import VisualMap from './components/visualMap';

import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
          <Route path="/textMap" element={<TextDirectionsComponent />} />
          <Route path='/visualMap' element={<VisualMap />} />
    </Routes>
  );
}

export default App;
