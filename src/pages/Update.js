import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // validate
    if (!title || !method || !rating) {
      setFormError("Please fill out all fields")
      return
    }

    // submit to the server
    const smoothie = { title, method, rating }

    const { data, error } = await supabase
      .from("smoothies")
      .update(smoothie)
      .eq("id", id)
      .select()

    if (error) {
      console.log(error)
      setFormError("Could not update the smoothie")
    }
    if (data) {
      console.log("Smoothie updated:", data)
      navigate("/")
    }
  }

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single()

      if (error) {
        navigate("/", { replace: true })
        console.log(error)
        return
      }
      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
      }
    }

    fetchSmoothie()
  }
  , [id, navigate])

  return (
    <div className="page update">
      <h2>Update Smoothie</h2>
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
        <button className="btn">Update Smoothie</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update