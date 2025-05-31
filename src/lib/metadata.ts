import { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  image = '/og-image.jpg',
  path,
}: {
  title: string;
  description: string;
  image?: string;
  path: string;
}): Metadata {
  const url = `https://wyloksltd.com${path}`;

  return {
    title: {
      absolute: `${title} | Wyloks Ltd`,
    },
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Wyloks Ltd',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@wyloksltd',
    },
    alternates: {
      canonical: url,
    },
  };
}
