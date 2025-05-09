import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

// components
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

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
        .order("created_at", { ascending: false })

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
  , [])

  return (
    <div className="page home">
      <h2>All Smoothies</h2>
      {fetchError && <p className="error">{fetchError}</p>}
      {smoothies && (
        <div className="smoothies">
          {/* {order by buttons} */}
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