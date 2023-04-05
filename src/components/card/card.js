import "./card.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  fetchArticle,
  fetchLikeArticle,
  fetchArticles,
} from "../../store/articles-slice";
import { useDispatch } from "react-redux";
import { useState } from "react";

function Card({
  userName,
  authorAvatar,
  createArticle,
  description,
  favoritesCount,
  title,
  tagList,
  slug,
  idx,
  favorited,
  page,
}) {
  const [isLike, setIsLike] = useState(favorited);
  const [likesCount, setLikesCount] = useState(favoritesCount);

  const cardTagList = tagList.map((el, id) => (
    <span key={idx + id} className="tag">
      {el}
    </span>
  ));

  const dispatch = useDispatch();

  const clickLink = () => {
    dispatch(fetchArticle(slug));
  };

  const likeClick = () => {
    const method = "POST";
    dispatch(fetchLikeArticle({ slug, method })).then((value) => {
      if (value.payload) {
        setIsLike(true);
        setLikesCount(likesCount + 1);
        dispatch(fetchArticles(page));
        dispatch(fetchArticle(slug));
      }
    });
  };

  const unLikeClick = () => {
    const method = "DELETE";
    dispatch(fetchLikeArticle({ slug, method })).then((value) => {
      if (value.payload) {
        setIsLike(false);
        setLikesCount(likesCount - 1);
        dispatch(fetchArticles(page));
        dispatch(fetchArticle(slug));
      }
    });
  };

  const like = isLike ? (
    <HeartFilled
      onClick={unLikeClick}
      className="card-header__button-like heart-filled"
    />
  ) : (
    <HeartOutlined onClick={likeClick} className="card-header__button-like" />
  );

  return (
    <div className="card">
      <div className="card-header">
        <Link
          onClick={clickLink}
          to={`/articles/${slug}`}
          className="card-header__title"
        >
          {title}
        </Link>
        {like}

        <span className="card-header__likes-counter">{likesCount}</span>
      </div>
      {cardTagList}
      <p className="text-card">{description}</p>
      <div className="user-information">
        <div className="user-information__card">
          <span className="user-information__name">{userName}</span>
          <span className="user-information__publication-date">
            {createArticle}
          </span>
        </div>

        <img
          src={authorAvatar}
          alt="User avatar"
          className="user-information__avatar"
        />
      </div>
    </div>
  );
}

export default Card;
