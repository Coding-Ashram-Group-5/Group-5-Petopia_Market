import { Card, CardTitle, CardDescription   } from "@/components/Ui/card"
import { User, Heart, PcCase } from "lucide-react"


export default function Stats() {

    const cards = [
        {
            id:1,
            name: "Happy User",
            value: 230,
            description: "1000+ Users in this Website.",
            icon:<User size={30}  />
        },
        {
            id:2,
            name: "Pet Lovers",
            value: 230,
            description: "300+ Petlovers register in this website.",
            icon:<Heart size={30}/>
        },
        {
            id:3,
            name: "24hr Support",
            value: 230,
            description: "24hr support for every time everywhere.",
            icon:<PcCase size={30}/>
        },
    ]


    return (
        <>
            <div className="flex justify-center flex-col md:flex-row items-center gap-2 gap-x-10 my-4">
                {cards.map((item, key)=> <>
                <Card key={key} className="h-60 flex justify-center items-center  bg-red-100 hover:bg-red-200 transition flex-col w-80">
                    <h1 className="text-center my-4 bg-red-600 text-white p-3 rounded-full">{item.icon}</h1>
                   <CardTitle className=" text-black font-mad font-bold text-lg">{item.name}</CardTitle>
                    <CardDescription className="text-black font-leag"> {item.description}</CardDescription>
                </Card>
                </>)}
            </div>
        </>
    )
}
