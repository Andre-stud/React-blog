import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (value, { rejectWithValue }) => {
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
    return rejectWithValue(error.message);
  }
});

export const fetchArticle = createAsyncThunk('article/fetchArticle', async (value, { rejectWithValue, dispatch }) => {
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
    // eslint-disable-next-line no-use-before-define
    dispatch(selectArticle(article));

    const data = {
      ok: responseArticle.ok,
      slug: article.article.slug,
    };

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchEditArticle = createAsyncThunk(
  'article/fetchEditArticle',
  async ({ dataArticle, slug }, { rejectWithValue }) => {
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
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeliteArticle = createAsyncThunk('article/fetchDeliteArticle', async (value, { rejectWithValue }) => {
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
    return rejectWithValue(error.message);
  }
});

export const fetchCreateArticle = createAsyncThunk(
  'article/fetchCreateArticle',
  async (dataArticle, { rejectWithValue }) => {
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
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLikeArticle = createAsyncThunk(
  'article/fetchLikeArticle',
  async ({ slug, method }, { rejectWithValue }) => {
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
      return rejectWithValue(error.message);
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
    error: null,
  },
  reducers: {
    selectArticle(state, actions) {
      state.article = actions.payload;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchArticles.fulfilled]: (state, actions) => {
      state.status = 'resolved';
      state.articles = actions.payload;
    },
    [fetchArticles.rejected]: (state, actions) => {
      state.status = 'rejected';
      state.error = actions.payload;
    },
    [fetchArticle.pending]: (state) => {
      state.statusArticle = 'loading';
      state.error = null;
    },
    [fetchArticle.fulfilled]: (state) => {
      state.statusArticle = 'resolved';
    },
    [fetchArticle.rejected]: (state, actions) => {
      state.statusArticle = 'rejected';
      state.error = actions.payload;
    },
    [fetchEditArticle.pending]: (state) => {
      state.statusEditArticle = 'loading';
      state.error = null;
    },
    [fetchEditArticle.fulfilled]: (state) => {
      state.statusEditArticle = 'resolved';
    },
    [fetchEditArticle.rejected]: (state, actions) => {
      state.statusEditArticle = 'rejected';
      state.error = actions.payload;
    },
    [fetchCreateArticle.pending]: (state) => {
      state.statusEditArticle = 'loading';
      state.error = null;
    },
    [fetchCreateArticle.fulfilled]: (state) => {
      state.statusEditArticle = 'resolved';
    },
    [fetchCreateArticle.rejected]: (state, actions) => {
      state.statusEditArticle = 'rejected';
      state.error = actions.payload;
    },
  },
});

export const { selectArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
