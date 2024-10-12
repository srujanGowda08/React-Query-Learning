import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PostsRQ = () => {
  // Fetching data using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data?.data);

  return (
    <div className="post-list">
      {data?.data.map((post) => (
        <div key={post.id} className="post-item">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsRQ;
