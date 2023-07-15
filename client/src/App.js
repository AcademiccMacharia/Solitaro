import './App.css';
import Login from './components/authorization/login';
import Signup from './components/authorization/signup';
import LandingPage from './components/landing-page/landing';
import Homepage from './components/homepage/Homepage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';
import ProfilePosts from './components/profile/ProfilePosts';
import ProfilePhotos from './components/profile/ProfilePhotos';


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
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/profile',
        element: <Profile />,
        children: [
          {
          path: '/profile',
          element: <ProfilePosts />
        },
        {
          path: '/profile/photos',
          element: <ProfilePhotos />
        }
      ]
      },
    ]
  },
])


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
