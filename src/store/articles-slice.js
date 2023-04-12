import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (value) => {
  const userAuthorized = localStorage.getItem('user');
  const token = JSON.parse(userAuthorized)?.user.token;
  const isToket = token
    ? {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    : null;

  try {
    const responseArticles = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${value}`, isToket);

    if (!responseArticles.ok) {
      throw new Error('responseId error');
    }

    const articles = await responseArticles.json();

    return articles;
  } catch (error) {
    return error.message;
  }
});

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (value) => {
  const userAuthorized = localStorage.getItem('user');
  const token = JSON.parse(userAuthorized)?.user.token;
  try {
    const responseArticle = await fetch(`https://blog.kata.academy/api/articles/${value}`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!responseArticle.ok) {
      throw new Error('responseId error');
    }

    const article = await responseArticle.json();

    const data = {
      ok: responseArticle.ok,
      slug: article.article.slug,
      article,
    };

    return data;
  } catch (error) {
    return error.message;
  }
});

export const fetchEditArticle = createAsyncThunk(
  'article/fetchEditArticle',
  async ({ dataArticle, slug }) => {
    const userAuthorized = localStorage.getItem('user');
    const { token } = JSON.parse(userAuthorized).user;

    try {
      const responseArticle = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,

          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(dataArticle),
      });

      if (!responseArticle.ok) {
        throw new Error('responseId error');
      }

      const article = await responseArticle.json();

      const data = {
        ok: responseArticle.ok,
        slug: article.article.slug,
      };

      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchDeliteArticle = createAsyncThunk('article/fetchDeliteArticle', async (value) => {
  const userAuthorized = localStorage.getItem('user');
  const { token } = JSON.parse(userAuthorized).user;

  try {
    const responseArticle = await fetch(`https://blog.kata.academy/api/articles/${value}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!responseArticle.ok) {
      throw new Error('responseId error');
    }

    return responseArticle.ok;
  } catch (error) {
    return error.message;
  }
});

export const fetchCreateArticle = createAsyncThunk(
  'article/fetchCreateArticle',
  async (dataArticle) => {
    const userAuthorized = localStorage.getItem('user');
    const { token } = JSON.parse(userAuthorized).user;

    try {
      const responseArticle = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,

          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(dataArticle),
      });

      if (!responseArticle.ok) {
        throw new Error('responseId error');
      }

      const article = await responseArticle.json();

      const data = {
        ok: responseArticle.ok,
        slug: article.article.slug,
      };

      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const fetchLikeArticle = createAsyncThunk(
  'article/fetchLikeArticle',
  async ({ slug, method }) => {
    const userAuthorized = localStorage.getItem('user');
    const { token } = JSON.parse(userAuthorized).user;

    try {
      const responseArticle = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method,
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!responseArticle.ok) {
        throw new Error('responseId error');
      }

      return responseArticle.ok;
    } catch (error) {
      return error.message;
    }
  }
);

const articlesSlice = createSlice({
  name: 'articl',
  initialState: {
    articles: [],
    article: [],
    defaultPath: '/',
    status: null,
    statusArticle: null,
    statusEditArticle: null,
  },
  reducers: {
    selectArticle(state, actions) {
      state.article = actions.payload;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchArticles.fulfilled]: (state, actions) => {
      state.status = 'resolved';
      state.articles = actions.payload;
    },
    [fetchArticles.rejected]: (state) => {
      state.status = 'rejected';
    },
    [fetchArticle.pending]: (state) => {
      state.statusArticle = 'loading';
    },
    [fetchArticle.fulfilled]: (state, actions) => {
      state.statusArticle = 'resolved';
      state.article = actions.payload.article;
    },
    [fetchArticle.rejected]: (state) => {
      state.statusArticle = 'rejected';
    },
    [fetchEditArticle.pending]: (state) => {
      state.statusEditArticle = 'loading';
    },
    [fetchEditArticle.fulfilled]: (state) => {
      state.statusEditArticle = 'resolved';
    },
    [fetchEditArticle.rejected]: (state) => {
      state.statusEditArticle = 'rejected';
    },
    [fetchCreateArticle.pending]: (state) => {
      state.statusEditArticle = 'loading';
    },
    [fetchCreateArticle.fulfilled]: (state) => {
      state.statusEditArticle = 'resolved';
    },
    [fetchCreateArticle.rejected]: (state) => {
      state.statusEditArticle = 'rejected';
    },
  },
});

export const { selectArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
