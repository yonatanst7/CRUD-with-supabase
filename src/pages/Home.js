import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

// components
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)
  const [orderBy, setOrderBy] = useState("created_at")

  const handleDelete = (id) => {
    setSmoothies((prevSmoothies) =>
      prevSmoothies.filter((smoothie) => smoothie.id !== id)
    )
  }

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .order(orderBy, { ascending: false })

      if (error) {
        setFetchError("Could not fetch the smoothies")
        setSmoothies(null)
        console.log(error)
      }
      if (data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()
  }
  , [orderBy])

  return (
    <div className="page home">
      <h2>All Smoothies</h2>
      {fetchError && <p className="error">{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          {/* {order by buttons} */}
          <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy("created_at")}>Created At</button>
            <button onClick={() => setOrderBy("rating")}>Rating</button>
            <button onClick={() => setOrderBy("title")}>Title</button>
            {orderBy}
          </div>
          <div className="smoothie-grid">
            {smoothies.map((smoothie) => (
              <SmoothieCard 
                smoothie={smoothie} 
                key={smoothie.id} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home