import { useParams } from "react-router-dom";
import { getSinglePet } from "@/lib/api";
import { Pet } from "@/types/models";
import { useEffect, useState } from "react";

export default function PetDetails() {
  const { id } = useParams<{ id: string }>(); // Explicitly define type for id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSinglePet(id);
        setPet(response?.data); // Assuming getSinglePet returns a single Pet object, not an array
      } catch (error) {
        console.error('Error fetching pet:', error);
        // Handle error
      }
    };

    fetchData(); // Call fetchData immediately on component mount

    // Remove the comma here to properly specify dependencies array
  }, [id]); // Dependency on id, fetch data whenever id changes

  const [pet, setPet] = useState<Pet | null>(null); // Initialize pet state with null or undefined

  if (!pet) {
    return <div>Loading...</div>; // Placeholder while data is being fetched
  }

  return (
    <>
      <div>pet id {id}</div>
      {/* Render pet details here */}
    </>
  );
}
