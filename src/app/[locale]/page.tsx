import Navbar from '@/components/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Approach from '@/components/sections/Approach'
import Locations from '@/components/sections/Locations'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Approach />
        <Locations />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
