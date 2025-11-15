function Post({ author, text }) {
  return (
    <article className="post">
      <header>
        <p className="post_author">{author}</p>
      </header>
      <p className="post_text">{text}</p>
    </article>
  );
}

export default Post;
