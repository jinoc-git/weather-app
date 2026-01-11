import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { DetailPage } from '@/pages/detail';
import { MainLayout } from '@/app/layout';

const AppRoot = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppRoot />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/detail/:cityId',
        element: <DetailPage />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
