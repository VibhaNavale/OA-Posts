function Post({ authorName, text, onLike, onDelete, likeCount }) {
  return (
    <article className="post">
      <header>
        <p className="post_author">{authorName}</p>
      </header>
      <p className="post_text">{text}</p>
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "12px" }}>
        <button onClick={onLike}>Like ({likeCount})</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </article>
  );
}

export default Post;
