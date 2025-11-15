import React, { useEffect, useState } from "react";
import Post from "./Post";

const POSTS_API = "https://api-regional.codesignalcontent.com/posting-application-2/posts";
const USER_API = id => `https://api-regional.codesignalcontent.com/posting-application-2/users/${id}`;
const SELF_API = "https://api-regional.codesignalcontent.com/posting-application-2/users/me";

function App() {
  const [posts, setPosts] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [selfId, setSelfId] = useState(null);
  const [likes, setLikes] = useState({}); // { [postId]: likeCount }

  useEffect(() => {
    async function fetchData() {
      const postRes = await fetch(POSTS_API);
      const postData = await postRes.json();
      setPosts(postData);

      let newSelfId = null;
      try {
        const meRes = await fetch(SELF_API);
        if (meRes.ok) {
          const meData = await meRes.json();
          newSelfId = meData.id;
          setSelfId(newSelfId);
        }
      } catch {}

      const authorIds = [...new Set(postData.map(p => p.authorId).filter(Boolean))];
      const idToName = {};
      for (let id of authorIds) {
        if (id === newSelfId) {
          idToName[id] = "You";
        } else {
          try {
            const userRes = await fetch(USER_API(id));
            if (userRes.ok) {
              const userData = await userRes.json();
              idToName[id] = `${userData.firstName} ${userData.lastName}`;
            }
          } catch {
            idToName[id] = null;
          }
        }
      }
      setUserMap(idToName);

      // Initialize likes (default to zero)
      const postLikes = {};
      postData.forEach(post => {
        postLikes[post.id] = 0;
      });
      setLikes(postLikes);
    }
    fetchData();
  }, []);

  function handleLike(postId) {
    setLikes(likes => ({
      ...likes,
      [postId]: (likes[postId] || 0) + 1
    }));
  }

  function handleDelete(postId) {
    setPosts(posts => posts.filter(post => post.id !== postId));
    setLikes(likes => {
      const { [postId]: _, ...rest } = likes;
      return rest;
    });
  }

  return (
    <div>
      <h3>Recent posts</h3>
      {posts.map((post, idx) => (
        <Post
          key={post.id ?? idx}
          text={post.text}
          authorName={post.authorId && userMap.hasOwnProperty(post.authorId) ? userMap[post.authorId] ?? "" : ""}
          onLike={() => handleLike(post.id)}
          onDelete={() => handleDelete(post.id)}
          likeCount={likes[post.id] || 0}
        />
      ))}
    </div>
  );
}

export default App;
