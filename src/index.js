import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

// Import Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Pages
import Home from './pages/Home/Home';
import OurRecipes from './pages/OurRecipes/OurRecipes';
import Detail from './pages/Detail/Detail';
import Favorite from './pages/Favorite/Favorite';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import AllUsers from './pages/AllUsers/AllUsers';
import FoodList from './pages/FoodList/FoodList';
import AddFood from './pages/AddFood/AddFood';
import ErrorPage from './pages/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/our-recipes",
        element:
          localStorage.getItem("role") === "admin" ? (
            <FoodList />
          ) : (
            <OurRecipes/>
          ),
      },
      {
        path: "/detail/:foodID",
        element: <Detail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/favorite",
        element: localStorage.getItem("token") ? <Favorite /> : <ErrorPage />,
      },
      {
        path: "/profile",
        element: localStorage.getItem("token") ? <Profile /> : <ErrorPage />,
      },
      {
        path: "/all-users",
        element:
          localStorage.getItem("role") === "admin" ? (
            <AllUsers />
          ) : (
            <ErrorPage />
          ),
      },
      {
        path: "/add-food",
        element:
          localStorage.getItem("role") === "admin" ? (
            <AddFood />
          ) : (
            <ErrorPage />
          ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
