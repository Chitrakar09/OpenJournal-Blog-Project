import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "./index.css";
import App from "./App.jsx";
import { Protected } from "./components/index.js";
import { LoginPage, Signup, AddPost, AllPost, EditPost, Home, Post,InitialPage } from './Pages'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<InitialPage/>}></Route>
      <Route path="home" element={<Home />} />
      <Route path="/login" element={<Protected requireLogin={false}><LoginPage /></Protected>} />
      <Route path="/signup" element={<Protected requireLogin={false}><Signup /></Protected>} />
      <Route path="/addPost" element={<Protected requireLogin><AddPost /></Protected>} />
      <Route path="/allPost" element={<Protected requireLogin><AllPost /></Protected>} />
      <Route path="/editPost/:postId" element={<Protected requireLogin><EditPost /></Protected>} />
      <Route path="/post/:postId" element={<Protected requireLogin><Post /></Protected>} />
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
