import { useEffect, useState } from "react";
import { useRoutes, Link, useLocation } from "react-router-dom";
import { supabase } from "./client.js";
import ShowCreators from "./pages/ShowCreators.jsx";
import ViewCreator from "./pages/ViewCreator.jsx";
import AddCreator from "./pages/AddCreator.jsx";
import EditCreator from "./pages/EditCreator.jsx";

export default function App() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();

  async function loadCreators() {
    const { data, error } = await supabase.from("creators").select("*");
    if (error) {
      setErrorMsg(error.message);
      setCreators([]);
    } else {
      const normalized =
        (data || []).map((row) => ({
          ...row,
          imageURL: row.imageURL ?? row.image_url ?? row.image,
        })) || [];
      setCreators(normalized);
      setErrorMsg("");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadCreators();
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      loadCreators();
    }
  }, [location.pathname, location.key]);

  const routes = useRoutes([
    {
      path: "/",
      element: <ShowCreators creators={creators} loading={loading} errorMsg={errorMsg} />,
      children: [
        { path: "creators/new", element: <AddCreator /> },
        { path: "creators/:id", element: <ViewCreator /> },
        { path: "creators/:id/edit", element: <EditCreator /> },
      ],
    },
    { path: "*", element: <div>Not Found</div> },
  ]);

  return (
    <div className="container">
      {routes}
    </div>
  );
}
