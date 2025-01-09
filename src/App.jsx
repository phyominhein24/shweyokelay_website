import "./App.css";
import "./i18n";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BookingPage from "./pages/BookingPage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./components/layouts/MainLayout";
import MultiStepForm from "./components/MultiStepForm";
import { Provider } from "react-redux";
import SearchPage from "./pages/SearchPage";
import { store } from "./redux/store";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* temp */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/step" element={<MultiStepForm />} />
        {/* logged in user */}
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    )
  );

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
