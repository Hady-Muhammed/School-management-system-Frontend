import { Suspense } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import { CircleSpinner, WaveSpinner } from "react-spinners-kit";
import SignIn from "./pages/SignIn";
import LoggedInGuard from "./guards/LoggedInRoutes";
import StudentGuard from "./guards/StudentGuard";
import TeacherGuard from "./guards/TeacherGuard";
import HomeS from "./pages/student-pages/HomeS";
import HomeT from "./pages/teacher-pages/HomeT";
import AdminGuard from "./guards/AdminGuard";
import HomeA from "./pages/admin-pages/HomeA";
import Navbar from "./pages/admin-pages/components/Navbar";
import Courses from "./pages/admin-pages/Courses";
import CreateCourse from "./pages/admin-pages/CreateCourse";
import ModifyCourse from "./pages/admin-pages/ModifyCourse";

function App() {
  const location = useLocation();
  return (
    <>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Navigate to="/signin" />}></Route>
        <Route element={<LoggedInGuard />}>
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
        <Route element={<StudentGuard />}>
          <Route
            path="/s/"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <HomeS />
              </Suspense>
            }
          />
        </Route>
        <Route element={<TeacherGuard />}>
          <Route
            path="/t/"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <HomeT />
              </Suspense>
            }
          />
        </Route>
        <Route element={<AdminGuard />}>
          <Route
            path="/a/"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <Navbar />
                <HomeA />
              </Suspense>
            }
          />
          <Route
            path="/a/courses"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <Navbar />
                <Courses />
              </Suspense>
            }
          />
          <Route
            path="/a/courses/new-course"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <CreateCourse />
              </Suspense>
            }
          />
          <Route
            path="/a/courses/:id"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <ModifyCourse />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
