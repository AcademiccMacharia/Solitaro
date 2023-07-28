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
import EditProfile from './components/settings/EditProfile';
import Account from './components/settings/Account';
import Verification from './components/settings/Verification';
import DeleteAcc from './components/settings/DeleteAcc';
import Feed from './components/homepage/Feed';
import Foryou from './components/homepage/Foryou';
import Message from './components/message/Message';
import Notifications from './components/notifications/Notifications';
import AllNotifications from './components/notifications/AllNotifications';
import CommentNotifications from './components/notifications/CommentNotifications';
import LikeNotifications from './components/notifications/LikeNotifications';
import UserProfile from './components/homepage/UserProfile';
import ProfileVideo from './components/profile/ProfileVideo';
import Relationships from './components/profile/Relationships';
import Followers from './components/profile/Followers';
import Following from './components/profile/Following';
import UserPosts from './components/homepage/UserPosts';


const router = createBrowserRouter([
  {
    path: '/landing',
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
        element: <Homepage />,
        children: [{
          path: '/home/feed',
          element: <Feed />
        },
        {
          path: '/home',
          element: <Foryou />,
        }
        ]
      },
      {
        path: '/settings',
        element: <Settings />,
        children: [
          {
            path: '/settings',
            element: <Account />
          },
          {
            path: '/settings/editprofile',
            element: <EditProfile />
          },
          {
            path: '/settings/verification',
            element: <Verification />
          },
          {
            path: '/settings/deleteaccount',
            element: <DeleteAcc />
          }
        ]
      },
      {
        path: '/messages',
        element: <Message />
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
          },
          {
            path: '/profile/videos',
            element: <ProfileVideo />
          }
        ]
      },
      {
        path: '/notifications',
        element: <Notifications />,
        children: [
          {
          path: '/notifications',
          element: <AllNotifications />
        },
        {
          path: '/notifications/comment',
          element: <CommentNotifications />
        },
        {
          path: '/notifications/likes',
          element: <LikeNotifications />
        }
      ]
      },
      {
        path: '/singleprofile',
        element: <UserProfile />,
      },
      {
        path: '/relationships',
        element: <Relationships />,
        children: [{
          path: '/relationships',
          element: <Followers />
        },
        {
          path: '/relationships/following',
          element: <Following />
        }
      ]
      },
      {
        path: '/user/:userId',
        element: <UserProfile />,
        children: [{
          path: '/user/:userId',
          element: <UserPosts />
        }]
      }
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
