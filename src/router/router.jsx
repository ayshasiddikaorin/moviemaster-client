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
import ContactPage from "../pages/Contact/ContactPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import ForgotPasswordPage from "../pages/Auth/ForgotPasswordPage"; 
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
      { path: "contact", element: <ContactPage /> },

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

  //  Auth Routes
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> }, 
  { path: "*", element: <NotFoundPage /> },
]);
