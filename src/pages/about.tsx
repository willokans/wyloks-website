import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">About Wyloks Ltd</h1>
        <p>Wyloks Ltd is a UK-registered company dedicated to providing a variety of services including managing Amazon seller accounts, IT consultancy, property management, IT solutions for small and medium-sized companies, and SEO services. Our mission is to deliver exceptional solutions tailored to our clients' needs.</p>
      </main>
      <Footer />
    </div>
  );
};

export default About;