import { useEffect, useState } from 'react';
import api from './api';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const ShowPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get<Post[]>('/posts').then(({ data }) => setPosts(data)).catch(() => {});
  }, []);

  return (
    <div className="posts-section">
      <h2>Posts</h2>
      <ul className="posts-list">
        {posts.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowPosts;
