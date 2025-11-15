import React from "react";
import posts from "./posts.json";
import Post from "./Post";

function App() {
  return (
    <div>
      <h2>Create post</h2>
      <h3>Recent posts</h3>
      {posts.map((post, idx) => (
        <Post key={idx} author={post.author} text={post.text} />
      ))}
    </div>
  );
}

export default App;
