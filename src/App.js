import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./config/route-config";
import MtButtons from "./components/common/buttons/MtButtons";

import DefaultInput from "./components/common/inputs/DefaultInput";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
