import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <div className="container">
          <h1 className="text-2xl font-bold">Welcome to Wyloks Ltd</h1>
          <p>We specialize in managing Amazon seller accounts, IT consultancy, property management, IT solutions for small and medium-sized companies, and SEO services.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;