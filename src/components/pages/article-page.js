import "./pages.scss";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { fetchDeliteArticle, fetchArticles } from "../store/articles-slice";
import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";

function ArticlePage({ articleData, page }) {
  const userName = articleData.author.username;
  const authorAvatar = articleData.author.image;
  const createArticle = format(new Date(articleData.createdAt), "MMMM d, y");
  const description = articleData.description;
  const favoritesCount = articleData.favoritesCount;
  const title = articleData.title;
  const tagList = articleData.tagList;
  const body = articleData.body;
  const slug = articleData.slug;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userAuthorized = localStorage.getItem("user");
  const userAuthorizedName = JSON.parse(userAuthorized).user.username;

  const deletionConfirmationText = "Are you sure to delete this article?";

  const onClickYes = () => {
    dispatch(fetchDeliteArticle(slug)).then((value) => {
      if (value.payload === true) {
        navigate("/", { replace: true });
        dispatch(fetchArticles(page));
      }
    });
  };

  const onClickEdit = () => {
    navigate(`/articles/${slug}/edit`, { replace: true });
  };

  const articleEditButtons =
    userAuthorizedName === userName ? (
      <div className="article-edit-buttons">
        <Popconfirm
          placement="right"
          title={deletionConfirmationText}
          onConfirm={onClickYes}
          okText="Yes"
          cancelText="No"
        >
          <Button className="article-edit-buttons__delite">Delete</Button>
        </Popconfirm>
        <Button onClick={onClickEdit} className="article-edit-buttons__edit">
          Edit
        </Button>
      </div>
    ) : null;

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
            {articleEditButtons}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
