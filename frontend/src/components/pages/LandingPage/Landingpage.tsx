
import Hero from "./Hero"
import Products  from "@/components/pages/LandingPage/Products"
import Sales from "./Sales"
import Banner from "./Banner"
import FAQ from "./FAQ"

export default function Landingpage() {
    return (
        <>
          <div>
            <Hero />
            <Products/>
            <Banner/>
            <Sales/>
            <FAQ/>

          </div>
        </>
      )
}
