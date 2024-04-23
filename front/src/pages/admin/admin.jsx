import Header from '../../componant/Header';
import Sidebar from '../../componant/Sidebar';
import HeroSection from "../../componant/hero"
function Admin() {
  return (
    <section className='flex-col'>
      <Header />
      <div className="flex justify-evenly my-1">
        <Sidebar />
        <HeroSection />
      </div>
    </section>
  );
}

export default Admin;
