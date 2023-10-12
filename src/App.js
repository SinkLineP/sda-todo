import {Routes, Route, Navigate} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import SelectProjects from "./pages/SelectProjects";
import Tasks from "./pages/Tasks";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Layout />}>
          <Route path={"/project-list"} element={<SelectProjects />} />
          <Route path={"/project-list/:project_id"} element={<Tasks />} />

          {/* auto redirect from "/" to "/project-list" */}
          <Route
            path="/"
            element={<Navigate to="/project-list" replace />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
