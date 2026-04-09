import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: string;
  structuredData?: object | object[];
}

const SITE_URL = 'https://www.careerleaf.app';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const SEO = ({
  title,
  description,
  path,
  noindex = false,
  ogImage,
  ogType = 'website',
  structuredData,
}: SEOProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  // Build breadcrumb JSON-LD for every page
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      ...(path !== '/'
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: title.split(' | ')[0].split(' - ')[0],
              item: canonicalUrl,
            },
          ]
        : []),
    ],
  };

  // Merge structured data into an array
  const allStructuredData = [
    breadcrumbData,
    ...(Array.isArray(structuredData)
      ? structuredData
      : structuredData
        ? [structuredData]
        : []),
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="CareerLeaf" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {allStructuredData.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
