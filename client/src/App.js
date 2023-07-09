import './App.css';
import Login from './components/authorization/login';
import LandingPage from './components/landing-page/landing';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
  path: '/login',
  element: <Login />
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
