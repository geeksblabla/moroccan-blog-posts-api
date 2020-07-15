import { useState, useEffect, useCallback } from "react";

const API_URL = `/`;

export const usePosts = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const loadMore = useCallback(async () => {
    try {
      const url = `${API_URL}?offset=${data.length}`;
      console.log(url);
      const nData = await fetch(url);
      const feed = await nData.json();
      console.log(feed.posts[0]);

      setData([...data, ...feed.posts]);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetch(API_URL);
        const feed = await data.json();
        console.log(feed);

        setData(feed.posts);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return { loading, data, error, loadMore };
};
