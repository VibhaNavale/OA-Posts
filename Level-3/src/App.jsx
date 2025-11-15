import React, { useEffect, useState } from "react";
import Post from "./Post";

// Level 3: Fetch posts via API and resolve author names via Users API  
const POSTS_API = "https://api-regional.codesignalcontent.com/posting-application-2/posts";
const USER_API = id => `https://api-regional.codesignalcontent.com/posting-application-2/users/${id}`;
const SELF_API = "https://api-regional.codesignalcontent.com/posting-application-2/users/me";

function App() {
  const [posts, setPosts] = useState([]);
  const [userMap, setUserMap] = useState({}); // userId -> userName
  const [selfId, setSelfId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // 1. Get all posts
      const postRes = await fetch(POSTS_API);
      const postData = await postRes.json();
      setPosts(postData);

      // 2. Get current user id
      let newSelfId = null;
      try {
        const meRes = await fetch(SELF_API);
        if (meRes.ok) {
          const meData = await meRes.json();
          newSelfId = meData.id;
          setSelfId(newSelfId);
        }
      } catch {}

      // 3. For each unique authorId in posts, fetch user name
      const authorIds = [
        ...new Set(postData.map(p => p.authorId).filter(Boolean))
      ];
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
            // API error, skip showing author
            idToName[id] = null;
          }
        }
      }
      setUserMap(idToName);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h3>Recent posts</h3>
      {posts.map((post, idx) => (
        <Post
          key={post.id ?? idx}
          text={post.text}
          authorName={
            // if authorId is not present or userMap[authorId] is null show blank author
            post.authorId && userMap.hasOwnProperty(post.authorId)
              ? userMap[post.authorId] ?? ""
              : ""
          }
        />
      ))}
    </div>
  );
}

export default App;
