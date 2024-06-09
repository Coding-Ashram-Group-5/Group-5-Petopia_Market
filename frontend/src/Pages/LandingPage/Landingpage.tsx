
import Hero from "./Hero"
import Products  from "./Products/Products"
import Sales from "./Sales"
import Banner from "./Banners/Banner"
import FAQ from "./FAQ"
import Footer from "./Footer"
import VideoAdd from "./VideoAdd"
import DogBanner from "./Banners/DogBanner"

export default function Landingpage() {
    return (
        <>
          <div>
            <Hero />
            <Products/>
            <VideoAdd />
            <Banner/>
            <Sales/>
            <DogBanner/>
            <FAQ/>
            <Footer/>

          </div>
        </>
      )
}
