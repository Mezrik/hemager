import { Helmet, HelmetData } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

const helmetData = new HelmetData({});

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title} | HEMAger 3000` : undefined}
      defaultTitle="HEMAger 3000"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
