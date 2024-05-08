import { useParams } from "react-router-dom"
import { getSinglePet } from "@/lib/api"
import { Pet } from "@/components/Auth/types/models"
import { useEffect, useState } from "react"

export default function PetDetails() {
     const {id}  = useParams()
     const [pets, setPets] = useState<Pet[]>();
  useEffect(() => {

    const fetchData = async (id) => {
        const data = await getSinglePet(id)
        setPets(data?.data)
        
     }
     fetchData(id)
  }),[];
//   console.log(pets)
  
  return (
    <>
    
    <div>pet id {id}</div>
    
    
    </>
  )
}
