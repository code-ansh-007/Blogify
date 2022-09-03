import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import Feed from './Feed';
import CreatePost from './CreatePost';
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path = "/createpost" element = {<CreatePost/>}/>
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </>
  );
}

export default App;
