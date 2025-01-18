import "./App.css";
import Context from "./components/Context";
import LazyLoading from "./components/lazy";
import MimeComponent from "./components/memo";
import Reducer from "./components/Reducer";
import UseCallbackComponent from "./components/usecallback";
import UseMemoComponent from "./components/usememo";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import DataFetcher from "./components/usequery";

const Layout = () => <h1>Layout Page</h1>;
const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;

const UserProfile = () => {
  const { userId } = useParams();
  return (
    <div className="card">
      <h3>User Profile: {userId}</h3>
      <nav>
        <Link to="posts">Posts</Link> | <Link to="settings">Settings</Link>
      </nav>
      <Outlet />
    </div>
  );
};
const UserPosts = () => <h2>User Posts</h2>;
const UserSettings = () => <h2>User Settings</h2>;

const Login = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return <h2>Login Page</h2>;
};

const LoginUse = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
    // navigate(-1);
    // navigate(+1);
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Dashboard = () => <h2>Dashboard</h2>;

const NotFound = () => <h2>404 - Page Not Found</h2>;
function App() {
  const isLoggedIn = false;
  return (
    <>
      <Router>
        <nav className="card">
          <Link to="/">Home</Link>
          <span> </span>
          <Link to="/about">About</Link>
          <span> </span>
          <Link to="/contact">Contact</Link>
          <span> </span>
          <Link to="/users/123">User</Link>
          <span> </span>
          <Link to="/login">Login</Link>
          <span> </span>
          <Link to="/LoginUse">Login Use</Link>
        </nav>
        <Routes>
          {/* Dynamic and Nested */}
          <Route path="/users/:userId" element={<UserProfile />}>
            <Route path="posts" element={<UserPosts />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
          {/* Redirecting*/}
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} />} />
          <Route path="/LoginUse" element={<LoginUse />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Nested Redirect */}
          {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Simple routing */}
          <Route index element={<Layout />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div className="container">
          <Reducer />
          <Context />
          <MimeComponent />
          <UseMemoComponent />
          <UseCallbackComponent />
          <LazyLoading />
          <QueryClientProvider client={queryClient}>
            <DataFetcher />
          </QueryClientProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
