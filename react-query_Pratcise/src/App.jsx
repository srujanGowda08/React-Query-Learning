import "./App.css";
import Posts from "./components/PostsTraditional";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostsRQ from "./components/PostsRQ";
import Home from "./components/Home";
import PostDetailRQ from "./components/PostDetailRQ";
// import PostDetails from "./components/PostDetails";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts" element={<Posts />} />
          <Route exact path="/rq-posts" element={<PostsRQ />} />
          <Route exact path="/rq-posts/:postId" element={<PostDetailRQ />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
