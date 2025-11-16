// Before data validation code

// import React from "react";
// import posts from "./posts.json";
// import Post from "./Post";

// function App() {
//   return (
//     <div>
//       <h2>Create post</h2>
//       <h2>Recent posts</h2>
//       {posts.map((post, idx) => (
//         <Post key={idx} author={post.author} text={post.text} />
//       ))}
//     </div>
//   );
// }

// export default App;


import posts from './posts.json';
import Post from './Post';

const getPostText = (post) => post.text || post.post || post.post_text;

const App = () => (
  <main>
    <h2>Create post</h2>
    <section>
      <h2>Recent posts</h2>
      <div>
        {(posts || []).map((post, idx) => {
          // Use 'id' first, fall back to index for React 'key'
          const key = post.id || idx;
          const author = post.author || "";
          const text = getPostText(post).trim() || "";
          // Only render if post has non-blank text
          if (!text.trim()) return null;
          return (
            <Post
              key={key}
              author={author}
              text={text}
            />
          );
        })}
      </div>
    </section>
  </main>
);

export default App;
