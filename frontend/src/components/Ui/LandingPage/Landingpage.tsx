
import Hero from "./Hero"
import Products  from "./Products/Products"
import Navbar from "./Nav/Navbar"
import Sales from "./Sales"
import Banner from "./Banner"
import FAQ from "./FAQ"

export default function Landingpage() {
    return (
        <>
          <div>
            <Navbar />
            <Hero />
            <Products/>
            <Banner/>
            <Sales/>
            <FAQ/>

          </div>
        </>
      )
}
