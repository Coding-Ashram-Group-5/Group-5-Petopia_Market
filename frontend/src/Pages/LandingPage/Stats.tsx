import { Card } from "@/components/Ui/card"
import { Store, PhoneCall, MessageCircleMore, Truck } from "lucide-react"

export default function Stats() {

    const cards = [
        {
            id: 1,
            name: "Delevery",
            value: 230,
            description: "One day dallivery, Order before 5:00 PM.",
            icon: <Truck size={20} />,
            bgColor: "bg-red-100 hover:bg-red-200",
            iconBgColor: "text-red-600"
        },
        {
            id: 2,
            name: "Store",
            value: 230,
            description: "Unit NO S-12, 2nd Floor, 2nd Avenue, New York.",
            icon: <Store size={20} />,
            bgColor: "bg-blue-100 hover:bg-blue-200",
            iconBgColor: "text-blue-600"
        },
        {
            id: 3,
            name: "24hr Support",
            value: 230,
            description: "Call us in 06:00 AM to 10:00 PM. 04335 24440",
            icon: <PhoneCall size={20} />,
            bgColor: "bg-green-100 hover:bg-green-200",
            iconBgColor: "text-green-600"
        },
        {
            id: 4,
            name: "24hr Support",
            value: 230,
            description: "Message Us, Response same day!",
            icon: <MessageCircleMore size={20} />,
            bgColor: "bg-yellow-100 hover:bg-yellow-200",
            iconBgColor: "text-yellow-600"
        },
    ]

    return (
        <>
            <div className="flex justify-center  md:flex-row flex-col items-center gap-2 gap-x-10 my-4">
                {cards.map((item) => (
                    <Card key={item.id} className={`h-20 w-80 flex ${item.bgColor} items-center transition`}>
                        <h1 className={`text-center my-4 ${item.iconBgColor} mx-4 bg-white p-3 rounded-full`}>{item.icon}</h1>
                        <p className="text-sm text-pretty font-cab font-bold dark:text-black">{item.description}</p>
                    </Card>
                ))}
            </div>
        </>
    )
}
