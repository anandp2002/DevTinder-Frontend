import Login from './components/Login';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Profile from './components/Profile';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
