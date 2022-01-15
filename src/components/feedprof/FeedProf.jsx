import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feedprof.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import PostProf from "../postprof/PostProf";

export default function FeedProf({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("https://showerthoughtsbackend.herokuapp.com/api/posts/profile/" + username)
        : await axios.get("https://showerthoughtsbackend.herokuapp.com/api/posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <PostProf key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}