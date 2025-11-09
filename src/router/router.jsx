import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import AllMoviesPage from "../pages/Movies/AllMoviesPage";
import AddMoviePage from "../pages/Movies/AddMoviePage";
import MyCollectionPage from "../pages/Movies/MyCollectionPage";
import UpdateMoviePage from "../pages/Movies/UpdateMoviePage";
import MovieDetailsPage from "../pages/Movies/MovieDetailsPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/movies", element: <AllMoviesPage /> },
      { path: "/add-movie", element: <AddMoviePage /> },
      { path: "/my-collection", element: <MyCollectionPage /> },
      { path: "/update/:id", element: <UpdateMoviePage /> },
      { path: "/movie/:id", element: <MovieDetailsPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
