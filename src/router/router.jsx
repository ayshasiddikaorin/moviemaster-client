// src/router/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../components/PrivateRoute";

// Pages
import HomePage from "../pages/Home/HomePage";
import AllMoviesPage from "../pages/Movies/AllMoviesPage";
import AddMoviePage from "../pages/Movies/AddMoviePage";
import MyCollectionPage from "../pages/Movies/MyCollectionPage";
import UpdateMoviePage from "../pages/Movies/UpdateMoviePage";
import MovieDetailsPage from "../pages/Movies/MovieDetailsPage";
import AboutPage from "../pages/About/AboutPage";
import ContactPage from "../pages/Contact/ContactPage"; // ✅ New line added
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies", element: <AllMoviesPage /> },
      { path: "movie/:id", element: <MovieDetailsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> }, // ✅ Contact route added

      // Private Routes
      {
        path: "add-movie/:id?",
        element: (
          <PrivateRoute>
            <AddMoviePage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-collection",
        element: (
          <PrivateRoute>
            <MyCollectionPage />
          </PrivateRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdateMoviePage />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
