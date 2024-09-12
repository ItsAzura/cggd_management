import React from 'react';
import hero_img from '../../Assets/hero_img.png';
import aboutus from '../../Assets/Aboutus.png';
import contactus from '../../Assets/Contactus.png';
import { useInView } from 'react-intersection-observer';
import './Home.css';
import LazyLoad from 'react-lazyload';

const Home = () => {
  const [ref0, inView0] = useInView({ triggerOnce: false, threshold: 0.1 });

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
    <div className="ml-[21%] min-h-screen flex flex-col items-center justify-center px-4 py-10 md:px-20">
      <div className="w-full max-w-5xl space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="flex flex-col text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold text-white filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow ">
              Welcome to Azura's Warehouse
            </h1>
            <p className="mt-4 text-gray-300 md:text-lg">
              Reliable, Efficient, and Secure Storage Solutions for Your
              Business
            </p>
            <button className="w-full md:w-40 mt-6 px-6 py-3 bg-[#297DCC] text-white rounded-full font-semibold shadow-lg hover:bg-[#246aae] transition-colors hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]">
              Learn More
            </button>
          </div>
          <div className="mt-8 md:mt-0">
            <img
              loading="lazy"
              src={hero_img}
              alt="Warehouse"
              className="max-w-full h-auto animate-fadeInRight rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Services Section */}
        <h1 className="text-5xl font-bold text-white text-center filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow">
          Our Services
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            ref={ref1}
            style={{
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: inView1 ? '0s' : '0s',
              opacity: inView1 ? 1 : 0,
              transform: inView1 ? 'translateY(0)' : 'translateY(20px)',
            }}
            className="p-6 rounded shadow-lg text-center border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] hover:bg-[rgba(41,125,204,0.3)]"
          >
            <h2 className="text-2xl font-semibold text-[#e7e7ea]">Storage</h2>
            <p className="mt-4 text-[#b7b7b7]">
              Secure storage solutions with temperature control and 24/7 access.
            </p>
          </div>
          <div
            ref={ref2}
            style={{
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: inView2 ? '0.24s' : '0s',
              opacity: inView2 ? 1 : 0,
              transform: inView2 ? 'translateY(0)' : 'translateY(20px)',
            }}
            className="p-6 rounded shadow-lg text-center border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] hover:bg-[rgba(41,125,204,0.3)]"
          >
            <h2 className="text-2xl font-semibold text-[#e7e7ea]">Logistics</h2>
            <p className="mt-4 text-[#b7b7b7]">
              Streamlined logistics management to ensure timely delivery and
              efficient operations.
            </p>
          </div>

          <div
            ref={ref3}
            style={{
              transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
              transitionDelay: inView3 ? '0.48s' : '0s',
              opacity: inView3 ? 1 : 0,
              transform: inView3 ? 'translateY(0)' : 'translateY(20px)',
            }}
            className="p-6 rounded shadow-lg text-center border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)] hover:bg-[rgba(41,125,204,0.3)]"
          >
            <h2 className="text-2xl font-semibold text-[#e7e7ea]">Security</h2>
            <p className="mt-4 text-[#b7b7b7]">
              Top-notch security systems to protect your valuable assets.
            </p>
          </div>
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
                src={aboutus}
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
            <div
              ref={ref4}
              style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: inView4 ? '0s' : '0s',
                opacity: inView4 ? 1 : 0,
                transform: inView4 ? 'translateY(0)' : 'translateY(20px)',
              }}
              className="p-6 rounded shadow-lg text-center border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            >
              <p className="text-[#b7b7b7] italic">
                "Fantastic service and top-notch facilities. We couldn't be
                happier!"
              </p>
              <p className="mt-4 text-[#e7e7ea] font-semibold">- Client A</p>
            </div>
            <div
              ref={ref5}
              style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: inView5 ? '0.24s' : '0s',
                opacity: inView5 ? 1 : 0,
                transform: inView5 ? 'translateY(0)' : 'translateY(20px)',
              }}
              className="p-6 rounded shadow-lg text-center border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            >
              <p className="text-[#b7b7b7] italic">
                "Reliable and secure. They have exceeded our expectations."
              </p>
              <p className="mt-4 text-[#e7e7ea] font-semibold">- Client B</p>
            </div>
            <div
              ref={ref6}
              style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: inView6 ? '0.48s' : '0s',
                opacity: inView6 ? 1 : 0,
                transform: inView6 ? 'translateY(0)' : 'translateY(20px)',
              }}
              className="p-6 rounded shadow-lg text-center border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            >
              <p className="text-[#b7b7b7] italic">
                "Excellent logistics management. Highly recommended!"
              </p>
              <p className="mt-4 text-[#e7e7ea] font-semibold">- Client C</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center filter drop-shadow-[0px_0px_3px_rgba(41,125,204,1)] transition-shadow">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 space-y-4">
            <div
              ref={ref7}
              style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: inView7 ? '0s' : '0s',
                opacity: inView7 ? 1 : 0,
                transform: inView7 ? 'translateY(0)' : 'translateY(20px)',
              }}
              className="p-4 rounded shadow-lg border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            >
              <h3 className="text-lg font-semibold text-[#e7e7ea]">
                What are your storage capacities?
              </h3>
              <p className="mt-2 text-[#b7b7b7]">
                We offer a range of storage options, from small units to large
                warehouse spaces. Contact us for more details.
              </p>
            </div>
            <div
              ref={ref8}
              style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: inView8 ? '0.24s' : '0s',
                opacity: inView8 ? 1 : 0,
                transform: inView8 ? 'translateY(0)' : 'translateY(20px)',
              }}
              className="p-4 rounded shadow-lg border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            >
              <h3 className="text-lg font-semibold text-[#e7e7ea]">
                How can I manage my inventory?
              </h3>
              <p className="mt-2 text-[#b7b7b7]">
                Our warehouse provides advanced inventory management systems to
                help you keep track of your stock.
              </p>
            </div>
            <div
              ref={ref9}
              style={{
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                transitionDelay: inView9 ? '0.48s' : '0s',
                opacity: inView9 ? 1 : 0,
                transform: inView9 ? 'translateY(0)' : 'translateY(20px)',
              }}
              className="p-4 rounded shadow-lg border border-[rgba(41,125,204,0.5)] bg-[rgba(41,125,204,0.2)] transition ease-in-out delay-0 hover:bg-[rgba(41,125,204,0.3)] hover:shadow-lg hover:shadow-[rgba(41,125,204,0.1)]"
            >
              <h3 className="text-lg font-semibold text-[#e7e7ea]">
                Do you offer insurance for stored goods?
              </h3>
              <p className="mt-2 text-[#b7b7b7]">
                Yes, we offer comprehensive insurance options to protect your
                valuable assets.
              </p>
            </div>
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
                  src={contactus}
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
