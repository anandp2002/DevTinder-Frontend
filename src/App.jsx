import Login from './components/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Profile from './components/Profile';
import Body from './components/Body';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
