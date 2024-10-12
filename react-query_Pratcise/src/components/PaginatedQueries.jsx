import React, { useState } from "react";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const fetchFruits = (pageId) => {
  return axios.get(`http://localhost:4000/fruits/?_limit=4&_page=${pageId}`);
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    placeholderData: keepPreviousData,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      {data?.data.map((fruit) => (
        <div key={fruit.id} className="post-details-container">
          {fruit.name}
        </div>
      ))}
      <div className="button">
        <button
          className="btn"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page == 0 ? true : false}
        >
          Back
        </button>
        <button
          className="btn"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page == 5 ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedQueries;
