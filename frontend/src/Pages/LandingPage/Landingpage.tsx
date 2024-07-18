
import Hero from "./Hero"
import Products  from "./Products/Products"
import Sales from "./Sales"
import Banner from "./Banners/Banner"
import FAQ from "./FAQ"
import Footer from "./Footer"
import DogBanner from "./Banners/DogBanner"
import Banner2 from "./Banners/Banner2"
import Banner3 from "./Banners/Banner3"
import Category from "./Banners/Category"
import Stats from "./Stats"
import Info from "./Info"
import CookieConsent from "@/hooks/CookieConsent"

export default function Landingpage() {
    return (
        <>
          <div>
            <div className="h-10 w-full bg-red-500 md:rounded-md ">
              <div> <h1 className="py-2 text-center font-leag font-bold text-white"> ⭐ Top Trending Product  95% Off⭐</h1></div>
            </div>
            <Hero />
            <Category/>
            <Products/>
            <Banner3 />
            <Stats />
            <Info />
            <DogBanner/>
            <Banner2 />
            <Banner/>
            <Sales/>
            <div>
              <img className="md:rounded-[1.3rem] py-2" src="https://res.cloudinary.com/dzxynskmo/image/upload/q_50/v1720602981/Petopia/sm1uqognjb6dd5veih3a.gif" alt="Banners" />
            </div>
            <FAQ/>
            <Footer/>
            <CookieConsent/>
          </div>
        </>
      )
}
