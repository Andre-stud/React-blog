import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import NewAccountPage from "../pages/new-account-page";
import SignInPage from "../pages/sign-in-page";
import NewArticlePage from "../pages/new-article-page";
import ArticlePage from "../pages/article-page";
import CardsList from "../cards-list";
import EditProfile from "../pages/edit-profile";
import EditArticlePage from "../pages/edit-article";
import Layout from "../layout";
import { Pagination } from "antd";
import { Routes, Route } from "react-router-dom";
import { fetchArticles } from "../store/articles-slice";

import "./app.scss";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const articleData = useSelector((state) => state.articles.article);

  // if (userData) {
  //   console.log("true");
  // }

  const articlesCount = useSelector(
    (state) => state.articles.articles.articlesCount
  );
  const pageCount = articlesCount ? Math.ceil(articlesCount / 5) : 1;

  let slug = articleData?.article?.slug ? articleData.article.slug : null;

  const page = pageNumber * 5 - 5;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(page));
  }, [pageNumber]);

  const changePagination = (e) => {
    setPageNumber(e);
  };

  const cardListPage = (
    <div className="body-items">
      <CardsList />
      <Pagination
        onChange={changePagination}
        defaultCurrent={1}
        defaultPageSize={1}
        total={pageCount}
        className="body-items__pagination"
      />
    </div>
  );

  return (
    <div className="body">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={cardListPage} />
          <Route path="/sing-up" element={<NewAccountPage />} />
          <Route path="/sing-in" element={<SignInPage />} />
          <Route path="/new-article" element={<NewArticlePage />} />
          <Route
            path={`/articles/${slug}`}
            element={
              <ArticlePage articleData={articleData.article} page={page} />
            }
          />
          <Route
            path={`/articles/${slug}/edit`}
            element={
              <NewArticlePage articleData={articleData.article} page={page} />
            }
          />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="*" element={cardListPage} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
