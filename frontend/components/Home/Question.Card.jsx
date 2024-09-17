import React, { forwardRef } from 'react';

const QuestionCard = forwardRef(
  ({ question, answer, inView, transitionDelay }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          transitionDelay: inView ? transitionDelay : '0s',
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20%)',
        }}
        className="p-4 rounded shadow-lg border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
      >
        <h3 className="text-lg font-semibold text-[#e7e7ea]">{question}</h3>
        <p className="mt-2 text-[#b7b7b7]">{answer}</p>
      </div>
    );
  }
);

export default QuestionCard;
