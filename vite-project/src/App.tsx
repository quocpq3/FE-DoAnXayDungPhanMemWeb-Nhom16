import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/route";
import "animate.css";

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
