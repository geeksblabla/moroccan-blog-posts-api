import React from "react";
import "./index.css";
import { usePosts } from "./Feed";

const Post = ({ title, creator, date, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="article"
    >
      <div className="title">
        <h1>{title} </h1>
      </div>
      <div className="details">
        <span>{date}</span>
        <span>by {creator}</span>
      </div>
    </a>
  );
};

export default function App() {
  const { loading, data, loadMore } = usePosts();
  return (
    <div className="App">
      <h1>Latest Posts by Moroccan Developers Community</h1>
      <span> {data && data.length}</span>
      <div className="container">
        {data && data.map((p, i) => <Post {...p} key={`post-${i}`} />)}
      </div>
      {loading && "loading ...... "}
      {data && (
        <button className="button" onClick={loadMore}>
          {" "}
          Load More{" "}
        </button>
      )}
    </div>
  );
}
