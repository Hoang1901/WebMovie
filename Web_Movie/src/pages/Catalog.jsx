import React, { useEffect } from "react";

import { useParams } from "react-router";

import PageHeader from "../components/page-header/PageHeader";

import { category as cate } from "../api/tmdbApi";
import MovieGrid from "../components/movie-grid/MovieGrid";

const Catalog = () => {
  useEffect(() => {
    document.title = "Phim | Galaxy Play";
  }, []);
  const { category } = useParams();

  return (
    <>
      <PageHeader>
        {category === cate.movie ? "Phim Chiếu Rạp" : "Phim Bộ"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
