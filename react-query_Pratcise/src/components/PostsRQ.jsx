import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const fetchPosts = () => {
  return axios.get("http://localhost:4000/posts");
};

const addPost = (post) => {
  return axios.post("http://localhost:4000/posts", post);
};

const PostsRQ = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();
  // Fetching data using React Query
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  // posting the data to database.
  const { mutate } = useMutation({
    mutationFn: addPost,
    onSuccess: (newData) => {
      // queryClient.invalidateQueries("posts");
      queryClient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, newData.data],
        };
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, body };
    mutate(post);
    setTitle("");
    setBody("");
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  // console.log(data?.data);

  return (
    <div className="post-list">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Post title"
          value={title}
        />
        <input
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter Post Body"
          value={body}
        />
        <button type="submit">Post</button>
      </form>
      <button onClick={refetch}>Fetch</button>
      {data?.data.map((post) => (
        <Link to={`/rq-posts/${post.id}`}>
          <div key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsRQ;
