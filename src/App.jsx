import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout.page";
import Dashboard from "./pages/Dashboard.page";
import Home from "./pages/Home.page";

function App() {
  return <>
    <Routes>
      <Route path="" element={<Layout />} >
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </>;
}

export default App;
