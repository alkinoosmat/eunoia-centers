import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'

export default function PublicBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
