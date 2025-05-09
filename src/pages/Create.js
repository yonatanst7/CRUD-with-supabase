import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)

    // validate
    if (!title || !method || !rating) {
      setFormError("Please fill out all fields")
      return
    }

    // submit to the server
    const smoothie = { title, method, rating }
  
    const { data, error } = await supabase
      .from("smoothies")
      .insert([smoothie])
      .select()
    if (error) {
      setFormError("Could not add the smoothie")
      console.log(error)
    }
    if (data) {
      console.log("New smoothie added:", data)
      setTitle("")
      setMethod("")
      setRating("")
      // redirect to the home page
      navigate("/")
    }
  }

  return (
    <div className="page create">
      <h2>Add a New Smoothie</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          onChange={(e) => setMethod(e.target.value)}
          value={method}
        ></textarea>
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          onChange={(e) => setRating(e.target.value)}
          value={rating}
          min="0"
          max="5"
          step="0.1"
        />
        {formError && <p className="error">{formError}</p>}
        <button className="btn">Add Smoothie</button>
      </form>
    </div>
  )
}

export default Create