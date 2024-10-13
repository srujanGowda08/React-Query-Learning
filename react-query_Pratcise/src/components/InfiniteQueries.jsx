import React, { useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/fruits/?_limit=5&_page=${pageParam}`);
};

const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length < 4) {
        // Assuming a total of 5 pages
        return allPages.length + 1;
      } else {
        return undefined; // No more pages to load
      }
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.pages?.map((page) => {
        return page?.data.map((fruit) => {
          return (
            <div className="fruit-name" key={fruit.id}>
              {fruit.name}
            </div>
          );
        });
      })}
      <div ref={ref}>{isFetchingNextPage && "Loading...."}</div>
      {/* <button
        onClick={fetchNextPage}
        className="btn"
        disabled={!hasNextPage} // Disable the button when there's no next page
      >
        Load More...
      </button> */}
    </div>
  );
};

export default InfiniteQueries;
