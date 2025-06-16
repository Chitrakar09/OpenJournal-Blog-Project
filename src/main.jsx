import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import { LoginPage, Signup, AddPost, AllPost, EditPost, Home, Post } from './Pages'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addPost" element={<AddPost />} />
      <Route path="/allPost" element={<AllPost />} />
      <Route path="/editPost" element={<EditPost />} />
      <Route path="/post" element={<Post />} />
    </Route>
  )
)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
