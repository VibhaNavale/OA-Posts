import React, { useState } from "react";

function CreatePostForm({ onAddPost }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim() === "") return;
    onAddPost({ author: "You", text });
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Your new post*"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <input type="submit" value="Publish post" />
    </form>
  );
}

export default CreatePostForm;
