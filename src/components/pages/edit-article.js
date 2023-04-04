import { Button, Input } from "antd";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import "./pages.scss";
import { useDispatch } from "react-redux";
import { fetcCreateArticle, fetchArticles } from "../store/articles-slice";

function EditArticlePage() {
  const [countTag, setCountTag] = useState(100);
  const [arrTag, setArrTag] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useFieldArray({
    control,
    name: "tags",
  });

  const userAuthorized = localStorage.getItem("user");

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

    dispatch(fetcCreateArticle(dataArticle)).then((value) => {
      if (value.payload === true) {
        navigate("/", { replace: true });
        dispatch(fetchArticles(0));
      }

      console.log(value.payload, value);
    });
  };

  const onClickAddTag = () => {
    const data = { id: countTag };

    setCountTag(countTag + 1);
    setArrTag((value) => [...value, data]);
  };

  const onClickDeliteTag = (e) => {
    const id = Number(e.target.id);
    const idx = arrTag.findIndex((el) => el.id === id);

    setArrTag([...arrTag.slice(0, idx), ...arrTag.slice(idx + 1)]);
    console.log(id, idx, arrTag);
  };

  const allTags =
    arrTag.length !== 0
      ? arrTag.map((el, id) => {
          return (
            <li key={el.id}>
              <input
                {...register(`tags[${id + 1}]`)}
                className="sing-page__input tag-input"
                placeholder="Tags"
              />
              <input
                type="button"
                id={el.id}
                onClick={onClickDeliteTag}
                value={"Delete"}
                className="tags-options__button sing-page__button-delete"
              ></input>
            </li>
          );
        })
      : null;

  return (
    <form
      onSubmit={handleSubmit(onSubmitNewArcticle)}
      className="sing-page new-article"
    >
      <p className="sing-page__header">Create new article</p>
      <label className="sing-page__name-input new-article__name-input">
        Title
        <input
          {...register("title", { required: "Please enter a value." })}
          className="sing-page__input"
          placeholder="Title"
        />
      </label>
      {errors.title ? (
        <span style={{ color: "#F5222D" }}>{errors.title.message}</span>
      ) : null}

      <label className="sing-page__name-input new-article__name-input">
        Short description
        <input
          {...register("shortDescription", {
            required: "Please enter a value.",
          })}
          className="sing-page__input"
          placeholder="Title"
        />
      </label>
      {errors.shortDescription ? (
        <span style={{ color: "#F5222D" }}>
          {errors.shortDescription.message}
        </span>
      ) : null}

      <label className="sing-page__name-input new-article__name-input">
        Text
        <textarea
          {...register("text", {
            required: "Please enter a value.",
          })}
          className="new-article__name-textarea"
          placeholder="Text"
        />
      </label>
      {errors.text ? (
        <span style={{ color: "#F5222D" }}>{errors.text.message}</span>
      ) : null}

      <label className="sing-page__name-input new-article__name-input">
        Tags
        <ul className="tags-options">
          {allTags}
          <li key={4}>
            <input
              {...register(`tags.${0}`)}
              className="sing-page__input tag-input"
              placeholder="Tags"
            />
            <button className="tags-options__button sing-page__button-delete">
              Delete
            </button>
            <Button
              onClick={onClickAddTag}
              className="tags-options__button sing-page__button-add"
            >
              Add tag
            </Button>
          </li>
        </ul>
      </label>
      <Input
        type="submit"
        className="sing-page__button send-tag-button "
        value={"Send"}
      ></Input>
    </form>
  );
}

export default EditArticlePage;
