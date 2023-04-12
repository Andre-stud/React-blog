export const selectArticleData = state => state.articles.article;

export const selectArticlesData = state => state.articles.articles;

export const selectArticlesCount = state => state.articles.articles.articlesCount;

export const selectStatusLoadArticles = state => state.articles.status;

export const selectUserDat = state => state.regUser.userData;

export const selectLoadStatus = state => state.regUser.status;

export const selectLoadStatusEdite = state => state.articles.statusEditArticle;

export const selectLoadStatusArticle = state => state.articles.statusArticle;
