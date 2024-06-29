
import Hero from "./Hero"
import Products  from "./Products/Products"
import Sales from "./Sales"
import Banner from "./Banners/Banner"
import FAQ from "./FAQ"
import Footer from "./Footer"
import VideoAdd from "./VideoAdd"
import DogBanner from "./Banners/DogBanner"
import Banner2 from "./Banners/Banner2"
import Category from "./Banners/Category"
import Stats from "./Stats"

export default function Landingpage() {
    return (
        <>
          <div>
            <div className="h-10 w-full bg-red-500 md:rounded-md ">
              <div> <h1 className="py-2 text-center font-bold text-white"> ⭐ Top Trending Product  95% Off⭐</h1></div>
            </div>
            <Hero />
            <Category/>
            <Products/>
            <Stats />
            <Banner2 />
            <Sales/>
            <DogBanner/>
            <Banner/>
            <VideoAdd />
            <div>
              <img className=" rounded-[1.3rem] py-2" src="https://res.cloudinary.com/dzxynskmo/image/upload/v1718980567/Petopia/cmpbqna6exscn64vwtsy.webp" alt="Banners" />
            </div>
            <FAQ/>
            <Footer/>
          </div>
        </>
      )
}
