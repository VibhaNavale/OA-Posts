import React, { useState } from "react";
import postsData from "./posts.json";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";

function App() {
  const [posts, setPosts] = useState(postsData);

  function handleAddPost(post) {
    setPosts([{ ...post }, ...posts]);
  }

  return (
    <div>
      <h2>Create post</h2>
      <CreatePostForm onAddPost={handleAddPost} />
      <h3>Recent posts</h3>
      {posts.map((post, idx) => (
        <Post key={idx} author={post.author} text={post.text} />
      ))}
    </div>
  );
}

export default App;
