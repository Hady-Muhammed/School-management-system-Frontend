import { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { CircleSpinner, WaveSpinner } from "react-spinners-kit";
import LoggedInRoutes from "./guards/LoggedInRoutes";
import SignIn from "./pages/SignIn";

function App() {
  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.key}>
        {/* LoggedIn Guard */}
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/signin"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <SignIn />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <WaveSpinner size={60} />
                  </div>
                }
              >
                <SignUp />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
