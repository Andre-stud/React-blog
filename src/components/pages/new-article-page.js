import { Button, Input } from 'antd';
import { useForm, useFieldArray } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import './pages.scss';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCreateArticle, fetchEditArticle, fetchArticle } from '../../store/articles-slice';

function NewArticlePage({ articleData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editArticle = articleData ? 'Edit article' : 'Create new article';

  const title = articleData?.title ? articleData.title : '';
  const description = articleData?.description ? articleData.description : '';
  const body = articleData?.body ? articleData.body : '';
  const tagList = articleData?.tagList ? articleData.tagList : [];
  const slug = articleData?.slug ? articleData.slug : null;

  const loadStatus = useSelector((state) => state.articles.statusEditArticle);
  const loadStatusArticle = useSelector((state) => state.articles.statusArticle);
  
  const loading = loadStatus === 'loading' || loadStatusArticle === 'loading';

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title,
      shortDescription: description,
      text: body,
      tags: tagList,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const userAuthorized = localStorage.getItem('user');

  if (!userAuthorized) {
    return <Navigate to="/sing-in" />;
  }

  const onSubmitNewArcticle = (value) => {
    const dataArticle = {
      article: {
        title: value.title,
        description: value.shortDescription,
        body: value.text,
        tagList: value.tags,
      },
    };

    if (articleData) {
      dispatch(fetchEditArticle({ dataArticle, slug })).then((data) => {
        if (data.payload.ok === true) {
          dispatch(fetchArticle(slug)).then((articleValue)=>{
            navigate(`/articles/${articleValue.payload.slug}`, { replace: true });
          });
        }
      });
    }

    if (!articleData) {
      dispatch(fetchCreateArticle(dataArticle)).then((data) => {
        if (data.payload.ok === true) {
          dispatch(fetchArticle(data.payload.slug)).then((articleValue)=>{
            navigate(`/articles/${articleValue.payload.slug}`, { replace: true });
          });
        }
      });
    }
  };

  const addTag = () => {
    append('');
  };

  const removeTag = (index) => () => {
    remove(index);
  };

  const allTags =
    fields.length !== 0 ? (
      fields.map((el, id) => {
        const buttonAdd =
          id === 0 ? (
            <Button onClick={addTag} className="tags-options__button sing-page__button-add">
              Add tag
            </Button>
          ) : null;

        return (
          <li key={el.id}>
            <input
              {...register(`tags.${id}`, {
                required: 'Tag is required!',
                pattern: {
                  value: /^[a-zA-Z0-9]+$/,
                  message: 'You can use only english letters and digits without spaces and other symbols',
                },
                maxLength: {
                  value: 25,
                  message: 'Your tag must be no more than 25 characters.',
                },
              })}
              className="sing-page__input tag-input"
              placeholder="Tags"
            />

            <input
              type="button"
              id={el.id}
              onClick={removeTag(id)}
              value="Delete"
              className="tags-options__button sing-page__button-delete"
            />
            {buttonAdd}
            {errors?.tags ? <p style={{ color: '#F5222D' }}>{errors.tags[id]?.message}</p> : null}
          </li>
        );
      })
    ) : (
      <Button onClick={addTag} className="tags-options__button sing-page__button-add">
        Add tag
      </Button>
    );

  return (
    <form onSubmit={handleSubmit(onSubmitNewArcticle)} className="sing-page new-article">
      <p className="sing-page__header">{editArticle}</p>
      <label className="sing-page__name-input new-article__name-input">
        Title
        <input
          {...register('title', {
            required: 'Please enter a value.',
            maxLength: {
              value: 500,
              message: 'Your title must be no more than 500 characters.',
            },
          })}
          className="sing-page__input"
          placeholder="Title"
        />
      </label>
      {errors.title ? <span style={{ color: '#F5222D' }}>{errors.title.message}</span> : null}

      <label className="sing-page__name-input new-article__name-input">
        Short description
        <input
          {...register('shortDescription', {
            required: 'Please enter a value.',
          })}
          className="sing-page__input"
          placeholder="Title"
        />
      </label>
      {errors.shortDescription ? <span style={{ color: '#F5222D' }}>{errors.shortDescription.message}</span> : null}

      <label className="sing-page__name-input new-article__name-input">
        Text
        <textarea
          {...register('text', {
            required: 'Please enter a value.',
          })}
          className="new-article__name-textarea"
          placeholder="Text"
        />
      </label>
      {errors.text ? <span style={{ color: '#F5222D' }}>{errors.text.message}</span> : null}

      <label className="sing-page__name-input new-article__name-input">
        Tags
        <ul className="tags-options">{fields.length !== 0 ? allTags.reverse() : allTags}</ul>
      </label>
      <Input
        type="submit"
        {...register('test', {
          disabled: loading,
        })}
        className="sing-page__button send-tag-button "
        value="Send"
      />
    </form>
  );
}

export default NewArticlePage;
