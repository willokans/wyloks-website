import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Wyloks Ltd',
  description: 'Get in touch with Wyloks Ltd for IT consultation and services.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 relative inline-block">
          Contact Us
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-400 transform origin-left scale-x-100"></span>
        </h1>
        <ContactForm />
      </div>
    </main>
  );
}
