import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import Feed from './Feed';
import Blog from './Blog';
import './App.css'
import PostForm from './PostForm';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/feed' element={<SignUp />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
