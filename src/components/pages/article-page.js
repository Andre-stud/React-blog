import "./pages.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";

function ArticlePage({ articleData }) {
  const userName = articleData.author.username;
  const authorAvatar = articleData.author.image;
  const createArticle = format(new Date(articleData.createdAt), "MMMM d, y");
  const description = articleData.description;
  const favoritesCount = articleData.favoritesCount;
  const title = articleData.title;
  const tagList = articleData.tagList;
  const body = articleData.body;

  const cardTagList = tagList.map((el) => (
    <span key={el} className="tag">
      {el}
    </span>
  ));

  return (
    <div className="body-items">
      <div className="cards-list article-page">
        <div className="cards-list__item">
          <div className="card">
            <div className="card-header">
              <p className="card-header__title">{title}</p>
              <HeartOutlined className="card-header__button-like" />
              <HeartFilled className="card-header__button-like heart-filled" />

              <span className="card-header__likes-counter">
                {favoritesCount}
              </span>
            </div>
            {cardTagList}
            <p className="text-card">{description}</p>
            <ReactMarkdown className="body-class">{body}</ReactMarkdown>
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
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
