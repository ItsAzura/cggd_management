import React from 'react';

const PageTitle = ({ title }) => {
  return (
    <h1 className="text-5xl pt-4 ml-4 font-semibold text-white py-4 filter drop-shadow-[0px_0px_6px_rgba(41,125,204,1)] transition-shadow">
      {title}
    </h1>
  );
};

export default PageTitle;
