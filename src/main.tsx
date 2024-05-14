import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.css';
import Login from './auth/Login';
import Register from './auth/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './app/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminCourses from './courses/AdminCourses';
import AddCourse from './courses/AddCourse';
import AddSection from './courses/sections/AddSection';
import UpdateCourse from "./courses/UpdateCourse";
import UserCourses from "./courses/UserCourses";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <div />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin/courses',
    element: <AdminCourses />,
  },
  {
    path: '/user/courses',
    element: <UserCourses />,
  },
  {
    path: '/admin/add-section/:courseId',
    element: <AddSection />,
  },
  {
    path: '/admin/update-course/:courseId',
    element: <UpdateCourse />,
  },
  {
    path: '/user',
    element: (
      <Layout>
        <div>user</div>
      </Layout>
    ),
  },
  {
    path: '/admin/add-course/:adminId',
    element: <AddCourse />,
  },
  {
    path: '/admin/add-section/:courseId',
    element: <AddSection />,
  },
  {
    path: '/admin/update-course/:courseId',
    element: <UpdateCourse />,
  }
]);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position="bottom-right" />
  </StrictMode>
);
