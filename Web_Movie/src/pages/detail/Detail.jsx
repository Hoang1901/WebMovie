import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import tmdbApi from "../../api/tmdbApi";

import CastList from "./CastList";
import "./detail.scss";
import VideoList from "./VideoList";

import MovieList from "../../components/movie-list/MovieList";

const Detail = () => {
  let history = useHistory();

  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      document.title = `${response.title || response.name} - Galaxy Play`;
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 3).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview" title={item.overview}>
                {item.overview || "Chưa có thông tin"}
              </p>
              <div className="cast">
                <CastList id={item.id} />
              </div>
              <div className="watch-now">
                <Button
                  onClick={() =>
                    history.push(
                      `/${
                        category === "movie"
                          ? `${category}/watch?id=${id}`
                          : `${category}/watch?id=${id}&episode=1`
                      }`
                    )
                  }
                  variant="contained"
                  style={{
                    width: "150px",
                    height: "50px",
                    borderRadius: "8px",
                    backgroundColor: "#ef233c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Xem ngay
                </Button>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                {/* việt hoá chỗ này */}
                <h2>Tương Tự</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
