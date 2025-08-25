import Header from "../components/Header"
import Hero from "../components/Hero"
import Categories from "../components/Categories"
import WhyChooseNovare from "../components/WhyChooseNovare"

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Categories /> {/* Categories now navigate to /browse?category=<name> */}
      <WhyChooseNovare />
    </div>
  )
}

export default LandingPage