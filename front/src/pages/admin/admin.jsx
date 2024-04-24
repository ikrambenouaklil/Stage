import Header from '../../componant/Header';
import Sidebar from '../../componant/draft/Sidebar';
import HeroSection from '../../componant/draft/hero';
import NewSideBar from '../../componant/NewsideBar';
function Admin() {
  return (
    <section className="flex-col w-full">
      <Header />
      <div className="flex gap-1 my-1 w-full">
        <NewSideBar/>
        <Sidebar />
        <HeroSection />
      </div>
    </section>
  );
}

export default Admin;
