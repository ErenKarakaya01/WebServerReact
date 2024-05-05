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
import UpdateCourse from "./courses/UpdateCourse";

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
    path: '/user',
    element: (
      <Layout>
        <div>user</div>
      </Layout>
    ),
  },
  {
    path: '/admin/courses',
    element: <AdminCourses />,
  },
  {
    path: '/admin/add-course/:adminId',
    element: <AddCourse />,
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
