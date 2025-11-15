function Post({ authorName, text }) {
  return (
    <article className="post">
      <header>
        <p className="post_author">{authorName}</p>
      </header>
      <p className="post_text">{text}</p>
    </article>
  );
}

export default Post;
