import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { DetailPage } from '@/pages/detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/detail/:cityId',
    element: <DetailPage />,
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
