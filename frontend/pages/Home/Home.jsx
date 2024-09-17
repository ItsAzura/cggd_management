import React from 'react';
import AboutUs from '../../Assets/Aboutus.png';
import ContactUs from '../../Assets/Contactus.png';
import { useInView } from 'react-intersection-observer';
import './Home.css';
import LazyLoad from 'react-lazyload';
import CardService from '../../components/Home/Service.Card';
import ClientCard from '../../components/Home/Client.Card';
import QuestionCard from '../../components/Home/Question.Card';

const Home = () => {
  const [ref1, inView1] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: false, threshold: 0.1 });

  const [ref4, inView4] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref5, inView5] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref6, inView6] = useInView({ triggerOnce: false, threshold: 0.1 });

  const [ref7, inView7] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref8, inView8] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref9, inView9] = useInView({ triggerOnce: false, threshold: 0.1 });

  const [ref01, inView01] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [ref02, inView02] = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <div className="ml-[19%] min-h-screen flex flex-col items-center justify-center px-4 py-10 md:px-20">
      <div className="w-full max-w-5xl space-y-12">
        {/* Header Section */}
        <div className="md:flex-row justify-center items-center md:px-6 md:py-10 ">
          <div className="flex flex-col text-center md:text-left">
            <div className="w-[115%] relative overflow-hidden">
              <h1 className=" text-4xl md:text-6xl font-bold text-white mb-4 filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow whitespace-nowrap">
                <span className="text">Welcome to Azura's Warehouse</span>
              </h1>
            </div>
          </div>
          <p className="mt-4 text-gray-300 md:text-lg">
            Reliable, Efficient, and Secure Storage Solutions for Your Business
          </p>
          <button className="w-full md:w-[200px] mt-6 px-8 py-3 bg-[#297DCC] text-white rounded-full font-semibold shadow-lg hover:bg-[#246aae] transition-colors duration-300 hover:shadow-xl">
            Learn More
          </button>
        </div>

        {/* Services Section */}
        <h1 className="text-5xl font-bold text-white text-center filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow">
          Our Services
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <CardService
            ref={ref1}
            inView={inView1}
            transitionDelay="0s"
            title="Storage"
            description="Secure storage solutions with temperature control and 24/7 access."
          />
          <CardService
            ref={ref2}
            inView={inView2}
            transitionDelay="0.24s"
            title="Logistics"
            description="Streamlined logistics management to ensure timely delivery and efficient operations."
          />
          <CardService
            ref={ref3}
            inView={inView3}
            transitionDelay="0.48s"
            title="Security"
            description="Top-notch security systems to protect your valuable assets."
          />
        </section>

        {/* About Section */}
        <section className="p-8 rounded shadow-lg flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-[#e7e7ea] filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-[#b7b7b7] text-lg md:text-xl">
              Our warehouse offers state-of-the-art facilities with the latest
              technology to ensure the safety and security of your goods. Our
              experienced team is dedicated to providing top-tier service,
              ensuring your operations run smoothly.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
            <LazyLoad height={200} offset={100}>
              <img
                loading="lazy"
                ref={ref01}
                style={{
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: inView01 ? '0' : '0s',
                  opacity: inView01 ? 1 : 0,
                  transform: inView01 ? 'translateX(0)' : 'translateX(20px)',
                }}
                src={AboutUs}
                alt="Warehouse"
                className="rounded shadow-md max-w-full h-auto"
              />
            </LazyLoad>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="text-center pb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow">
            What Our Clients Say
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ClientCard
              ref={ref4}
              inView={inView4}
              transitionDelay="0s"
              comment="Fantastic service and top-notch facilities. We couldn't be happier!"
              client="Client A"
            />
            <ClientCard
              ref={ref5}
              inView={inView5}
              transitionDelay="0.24s"
              comment="Reliable and secure. They have exceeded our expectations."
              client="Client B"
            />

            <ClientCard
              ref={ref6}
              inView={inView6}
              transitionDelay="0.48s"
              comment="Great customer service and efficient operations. Highly recommended!"
              client="Client C"
            />
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            <QuestionCard
              ref={ref7}
              inView={inView7}
              transitionDelay="0s"
              question="What are your storage rates?"
              answer="Our storage rates vary depending on the size and type of storage you require. Please contact us for a quote."
            />
            <QuestionCard
              ref={ref8}
              inView={inView8}
              transitionDelay="0.24s"
              question="Do you offer temperature-controlled storage?"
              answer="Yes, we offer temperature-controlled storage to ensure your goods are kept in optimal conditions."
            />
            <QuestionCard
              ref={ref9}
              inView={inView9}
              transitionDelay="0.48s"
              question="How can I access my stored items?"
              answer="You can access your stored items 24/7 with our secure access system. Contact us for more details."
            />
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="mt-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="p-8 rounded-lg shadow-lg ">
              <h2 className="text-4xl font-bold text-white mb-8 filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow">
                Contact Us
              </h2>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full mt-1 px-4 py-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full mt-1 px-4 py-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mt-1 px-4 py-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
                />
                <textarea
                  placeholder="Your Message"
                  className="w-full mt-1 px-4 py-2 bg-[rgba(41,125,204,0.2)] text-white rounded focus:outline-none focus:ring-2 focus:ring-[rgba(41,125,204,0.5)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
                  rows="4"
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#297DCC] text-white rounded font-semibold shadow-lg hover:bg-[rgba(41,125,204,0.5)] transition-colors hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Image Section */}
            <div className="flex items-center justify-center">
              <LazyLoad height={200} offset={100}>
                <img
                  loading="lazy"
                  ref={ref02}
                  style={{
                    transition:
                      'opacity 0.6s ease-out, transform 0.6s ease-out',
                    transitionDelay: inView02 ? '0' : '0s',
                    opacity: inView02 ? 1 : 0,
                    transform: inView02
                      ? 'translateX(-20px)'
                      : 'translateX(0px)',
                  }}
                  src={ContactUs}
                  alt="Contact Us"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </LazyLoad>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
