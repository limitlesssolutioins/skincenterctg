import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import './blog.css';

// Reusable Blog Post Card Component
const BlogPostCard = ({ post }) => (
  <div className="blog-post-card">
    <img src={post.image} alt={post.title} className="blog-post-card-image" />
    <div className="blog-post-card-content">
      <p className="blog-post-date">{post.date}</p>
      <h3>{post.title}</h3>
      <p className="blog-post-excerpt">{post.excerpt}</p>
      <NavLink to={`/blog/${post.id}`} className="learn-more-link">Leer más &rarr;</NavLink>
    </div>
  </div>
);

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "blog_posts"));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogPosts(postsData);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
     return <div className="blog-page"><div className="container"><p>Cargando artículos...</p></div></div>;
  }

  return (
    <div className="blog-page">
      <div className="container">
        <h1 className="page-title">Blog</h1>
      </div>

      {/* Blog Posts Grid */}
      <section className="blog-posts-section section-padding">
        <div className="container">
          <div className="blog-posts-grid">
            {blogPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
