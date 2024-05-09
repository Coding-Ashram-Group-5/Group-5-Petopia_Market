import PetsCard from "./PetsCard"
import { getAllPets } from "@/lib/api"
import { Pet } from "@/components/Auth/types/models"
import { useState, useEffect } from "react";
import { Button } from "@/components/Ui/Buttons/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/Ui/dropdown-menu"
import AddProduct from "../Pages/ProductPage/AddProduct";

export default function Pets() {



    const [pets, setPets] = useState<Pet[]>([]);
    useEffect(() => {

        const  dataFetch = async () => {
        try {
            const data = await getAllPets()
            setPets(data?.data);
            console.log("pets", pets)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    dataFetch()
    }, []);
    console.log(pets)

    const [type, setType] = useState("Dog");

    return (
        <>
            <div className="main flex flex-col md:flex-row">
                <div className="products w-full  md:w-full h-screen">
                    <div className="bg-background py-6 sm:py-8 lg:py-12">
                        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                            <AddProduct />
                            <div className="mb-6 flex items-end justify-between gap-4">
                                <h2 className="text-2xl font-bold text-primary lg:text-3xl">Adopts Pets</h2>
                                <div className="font-leag">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">Types</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-28 font-leag">
                                            <DropdownMenuLabel>Pets Types</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuRadioGroup value={type} onValueChange={setType} >
                                                <DropdownMenuRadioItem value="Dog">Dog</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Cat">Cat</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Other">Other</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                                {/* Pets card here */}
                                {pets.map((pet) => (
                                    <PetsCard
                                        key={pet._id}
                                        petId={pet._id}
                                        imageUrl={pet.petImages[0].url}
                                        title={pet.petName}
                                        price={pet.price}
                                        petType={pet.petType}
                                        petBread={pet.petBread}
                                        isFree={pet.isFree}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}
