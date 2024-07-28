import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaTagsProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const HelmetComponent: React.FC<MetaTagsProps> = ({ title, description, image, url }) => {
  return (
    <Helmet>
      <title>{title}</title>
      {/* General meta tags */}
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />

      {/* Add any additional meta tags you need */}
    </Helmet>
  );
};

export default HelmetComponent;
