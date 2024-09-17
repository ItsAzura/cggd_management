import React, { forwardRef } from 'react';

const ClientCard = forwardRef(
  ({ comment, client, inView, transitionDelay }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          transitionDelay: inView ? transitionDelay : '0s',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20%)',
        }}
        className="p-6 rounded shadow-lg text-center border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
      >
        <p className="text-[#b7b7b7] italic">{comment}</p>
        <p className="mt-4 text-[#e7e7ea] font-semibold">- {client}</p>
      </div>
    );
  }
);

export default ClientCard;
