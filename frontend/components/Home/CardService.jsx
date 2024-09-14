import React, { forwardRef } from 'react';

const CardService = forwardRef(
  ({ title, description, inView, transitionDelay }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          transitionDelay: inView ? transitionDelay : '0s',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20%)',
        }}
        className="p-6 rounded shadow-lg text-center border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] hover:bg-[rgba(41,125,204,0.3)]"
      >
        <h2 className="text-2xl font-semibold text-[#e7e7ea]">{title}</h2>
        <p className="mt-4 text-[#b7b7b7]">{description}</p>
      </div>
    );
  }
);

export default CardService;
