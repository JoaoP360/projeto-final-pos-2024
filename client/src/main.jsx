import { StrictMode } from 'react';
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App.jsx';

// Pages
import Home from './pages/Home.jsx';

// Routes
import userRoutes from './routes/userRoutes';
import todosRoutes from './routes/todosRoutes';
import albunsRoutes from './routes/albunsRoutes.jsx';
import photosRoutes from './routes/photosRoutes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      ...userRoutes,
      ...todosRoutes,
      ...albunsRoutes,
      ...photosRoutes,
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)