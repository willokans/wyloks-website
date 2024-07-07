import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) {
      alert('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      alert('Failed to send message.');
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Contact Us</h1>
        <p>Company Registration Number: 12345678</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border" required />
          </div>
          <div>
            <label className="block">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border" required />
          </div>
          <div>
            <label className="block">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border" required></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2">Send Message</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;