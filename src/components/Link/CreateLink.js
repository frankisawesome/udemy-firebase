import React, { useContext } from "react";
import useFormValidation from '../Auth/useFormValidation'
import validateCreateLink from '../Auth/validateCreateLink'
import { FirebaseContext } from "../../firebase";

const initial_states = {
  description: "",
  url: ""
}

function CreateLink(props) {
  const { firebase, user } = useContext(FirebaseContext)
  const { handleSubmit, handleChange, values, errors } = useFormValidation(initial_states, validateCreateLink, handleCreateLink)

  function handleCreateLink() {
    if (!user) {
      props.history.push('/login')
    } else {
      const { url, description } = values
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName
        },
        votes: [],
        comments: [],
        created: new Date(Date.now())
      }
      firebase.db.collection('links').add(newLink)
      props.history.push('/')
    }
  }
  return (
    <form className="flex flex-column mt3">
      <input
        onChange={handleChange}
        value={values.description}
        name="description"
        placeholder="A description for your link"
        type="text"
      ></input>
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        value={values.url}
        onChange={handleChange}
        name="url"
        placeholder="The url for the link"
        type="text"></input>
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default CreateLink;
