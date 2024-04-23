import Header from '../../componant/Header';
import Sidebar from '../../componant/Sidebar';
import HeroSection from "../../componant/hero"
function Admin() {
  return (
    <section className="flex-col w-full">
      <Header />
      <div className="flex gap-1 my-1 w-full">
        <Sidebar />
        <HeroSection />
      </div>
    </section>
  );
}

export default Admin;
