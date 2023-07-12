import './App.css';
import Login from './components/authorization/login';
import Signup from './components/authorization/signup';
import LandingPage from './components/landing-page/landing';
import Homepage from './components/homepage/Homepage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';


const router = createBrowserRouter([
  {
    path: '/soli',
    element: <LandingPage />,
  },
  {
  path: '/login',
  element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '/home',
        element: <Homepage />
      },
      {
        path: '/profile',
        element: <h1>Profile</h1>
      },
    ]
  }
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
