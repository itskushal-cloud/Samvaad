const POSTS = [
  { topic: 'How do you handle feeling overwhelmed during college?', author: 'quietmaple', replies: 6, hearts: 14 },
  { topic: 'Small things that helped me feel better this week', author: 'morninglight', replies: 9, hearts: 21 },
  { topic: 'Finding a healthy balance between work and rest', author: 'slowriver', replies: 4, hearts: 11 },
]

function CommunityPreview({ onDemo }) {
  return (
    <section className="section section-peach" id="community">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">A space to share, gently</h2>
          <span className="badge">Demo preview</span>
        </div>
        <p className="section-intro">
          Peer spaces are moderated, respectful, and built with privacy in mind. Members take part under
          anonymous names. The conversations below are illustrative examples.
        </p>

        <ul className="post-list">
          {POSTS.map((post) => (
            <li className="post" key={post.topic}>
              <h3>{post.topic}</h3>
              <p className="post-meta">
                Posted by {post.author} · {post.replies} replies · {post.hearts} hearts
              </p>
            </li>
          ))}
        </ul>

        <button className="btn btn-primary" onClick={() => onDemo('Explore the community')}>
          Explore the community
        </button>
      </div>
    </section>
  )
}

export default CommunityPreview