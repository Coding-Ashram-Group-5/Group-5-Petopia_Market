import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/Ui/accordion"

export default function FAQ() {
    return (
        <>
            <div className="border-t pt-10 pb-5">
                <div><h1 className="text-center text-red-500 font-bold text-[2rem] " >FAQ<span className="text-black dark:text-white">?</span></h1></div>
                <div className=" px-10 md:px-40 font-mad">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What types of pets are available for purchase on your website?</AccordionTrigger>
                            <AccordionContent>
                            We offer a wide variety of pets including dogs, cats, birds, small animals like rabbits and guinea pigs, reptiles, and more. Our inventory is regularly updated to provide you with diverse options to find your perfect furry, feathery, or scaly companion.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>How do I ensure the well-being and health of the pet I purchase through your platform?</AccordionTrigger>
                            <AccordionContent>
                            We prioritize the health and welfare of our pets. Each pet undergoes a thorough health check by certified veterinarians before being listed for sale. Additionally, we provide detailed care guidelines and recommendations for each species to ensure you have the knowledge and resources necessary to provide a loving and nurturing environment for your new pet.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I return or exchange a pet if it doesn't suit my needs or lifestyle?</AccordionTrigger>
                            <AccordionContent>
                            We understand that selecting a pet is a significant decision. While we encourage careful consideration before making a purchase, we offer a return and exchange policy within a specified timeframe if the pet is not suitable for your lifestyle or if you encounter any unforeseen circumstances. Please refer to our return policy for more information.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>



        </>
    )
}
