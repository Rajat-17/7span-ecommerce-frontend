// routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
// import AuthGuard from "../guards/AuthGuard";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* <Route
          path="/"
          element={
            <AuthGuard>
              <Products />s
            </AuthGuard>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}