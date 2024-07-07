import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">About Wyloks Ltd</h1>
        <p>We specialize in managing Amazon seller accounts, IT consultancy, property management, IT solutions for small and medium-sized companies, and SEO services. We&apos;re committed to providing the best service to our clients.</p>
      </main>
      <Footer />
    </div>
  );
};

export default About;