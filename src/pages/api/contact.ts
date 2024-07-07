import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Send email using a service like SendGrid, Nodemailer, etc.
    // For simplicity, we'll just log the message here.
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    // Simulate sending email
    setTimeout(() => {
      res.status(200).json({ message: 'Message sent successfully' });
    }, 1000);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}