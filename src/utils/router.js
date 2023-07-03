import { createBrowserRouter } from "react-router-dom";
import DetailsPage from "../pages/DetailsPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <NotFoundPage />
    },
    {
        path: "/details/:factory_id/:month_number",
        element: <DetailsPage />,
        errorElement: <NotFoundPage />
    },
])

export default router;