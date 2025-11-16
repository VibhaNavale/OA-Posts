import React, { useState } from "react";
import postsData from "./posts.json";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";

function App() {
  const [posts, setPosts] = useState(postsData);

  function handleAddPost(post) {
    setPosts([{ ...post }, ...posts]);
  }

  const getPostText = (post) => post.text || post.post || post.post_text;

  return (
    <div>
      <h2>Create post</h2>
      <CreatePostForm onAddPost={handleAddPost} />
      <h3>Recent posts</h3>
      {posts.map((post, idx) => {
        const key = post.id || idx;
        const author = post.author || "";
        const text = getPostText(post).trim() || "";
        <Post key={key} author={author} text={text} />
      })}
    </div>
  );
}

export default App;
