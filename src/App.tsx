import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignIn from './pages/SignIn';
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
