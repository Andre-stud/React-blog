import { Button, Input } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';
import "./pages.scss";

function NewArticlePage() {

  const [countTag, setCountTag] = useState([]);
  
  const {register, formState: { errors }, handleSubmit} = useForm();

  const userAuthorized = localStorage.getItem("user");

  if(!userAuthorized){
    return <Navigate to='/sing-in' />
  }

  const onSubmitNewArcticle = (value) =>{
    console.log(value);
  }

  const onClickAddTag = () =>{

    // setCountTag(value =>value.push(count));
    console.log('add')
  }

  // const tagAndDeliteButton =  <><input {...register('tags')} className="sing-page__input tag-input" placeholder="Tags" /><Button className="tags-options__button sing-page__button-delete">
  //                               Delete
  //                             </Button></>

  // const test = countTag > 0 ? countTag.map(el=> tagAndDeliteButton) : null;

  return (
    <form onSubmit={handleSubmit(onSubmitNewArcticle)} className="sing-page new-article">
      <p className="sing-page__header">Create new article</p>
      <label className="sing-page__name-input new-article__name-input">
        Title
        <input {...register('title',
        {required: "Please enter a value.",

        })} className="sing-page__input" placeholder="Title" />
      </label>
      {errors.title ? <span style={{ color: "#F5222D" }}>
      {errors.title.message }
        </span> : null}
      
      <label className="sing-page__name-input new-article__name-input">
        Short description
        <input {...register('shortDescription', {

          required: "Please enter a value.",

        })} className="sing-page__input" placeholder="Title" />
      </label>
      {errors.shortDescription ? <span style={{ color: "#F5222D" }}>
      {errors.shortDescription.message }
        </span> : null}
      

      <label className="sing-page__name-input new-article__name-input">
        Text
        <textarea {...register ('text', {

          required: "Please enter a value.",

        })} className="new-article__name-textarea"
        placeholder="Text"
      />
      </label>
      {errors.text ? <span style={{ color: "#F5222D" }}>
      {errors.text.message }
        </span> : null}
      

      <label className="sing-page__name-input new-article__name-input">
        Tags
        <div className="tags-options">
        <input {...register('tags')} className="sing-page__input tag-input" placeholder="Tags" />
        <Button className="tags-options__button sing-page__button-delete">
          Delete
        </Button>
        <Button onClick={onClickAddTag} className="tags-options__button sing-page__button-add">
          Add tag
        </Button>
      </div>
      </label>
      <Input type='submit' className="sing-page__button send-tag-button " value={'Send'}></Input>
    </form>
  );
}

export default NewArticlePage;
