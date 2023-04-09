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
import NavbarA from "./pages/admin-pages/components/NavbarA";
import CoursesA from "./pages/admin-pages/CoursesA";
import CreateCourse from "./pages/admin-pages/CreateCourse";
import ModifyCourse from "./pages/admin-pages/ModifyCourse";
import NavbarS from "./pages/student-pages/components/NavbarS";
import CoursesS from "./pages/student-pages/CoursesS";
import Course from "./pages/student-pages/Course";
import MyCoursesS from "./pages/student-pages/MyCourses";

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
                <NavbarS />
                <HomeS />
              </Suspense>
            }
          />
          <Route
            path="/s/courses"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <NavbarS />
                <CoursesS />
              </Suspense>
            }
          />
          <Route
            path="/s/my-courses"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <NavbarS />
                <MyCoursesS />
              </Suspense>
            }
          />
          <Route
            path="/s/courses/:id"
            element={
              <Suspense
                fallback={
                  <div className="grid place-items-center h-screen bg-black">
                    <CircleSpinner size={60} />
                  </div>
                }
              >
                <NavbarS />
                <Course />
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
                <NavbarA />
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
                <NavbarA />
                <CoursesA />
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
