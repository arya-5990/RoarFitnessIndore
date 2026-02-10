import React, { useState, useEffect, useRef } from "react";
import { arrowLeftWhite, arrowRightWhite, quote } from "../assets";
import Section from "./reusable/Section";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const Testimonials = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTestimonialsData(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleScroll = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i <= rating ? "#FBBF24" : "none"}
          stroke={i <= rating ? "#FBBF24" : "#4B5563"}
          strokeWidth="1.5"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.557.557 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.557.557 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      );
    }
    return <div className="flex gap-0.5 mt-1">{stars}</div>;
  };

  if (loading) return null;
  if (testimonialsData.length === 0) return null;

  return (
    <Section>
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container space-y-4 xl:space-y-6"
      >
        <div className="relative flex items-center justify-center">
          <h2 className="text-xl font-semibold lg:text-2xl lg:font-bold xl:text-3xl text-center">
            What Our <span className="text-primary">Customers Say</span>
          </h2>

          {testimonialsData.length > 5 && (
            <div className="absolute right-0 hidden lg:flex items-center gap-2">
              <button onClick={() => handleScroll(-300)}>
                <img
                  src={arrowLeftWhite}
                  alt="Previous"
                  width={22}
                  height={22}
                  className="rounded-[4px] border-2 border-white px-3 py-2"
                />
              </button>
              <button onClick={() => handleScroll(300)}>
                <img
                  src={arrowRightWhite}
                  alt="Next"
                  width={22}
                  height={22}
                  className="rounded-[4px] border-2 border-white px-3 py-2"
                />
              </button>
            </div>
          )}
        </div>

        {/* Mobile controls centered below heading if needed, or just rely on swipe. 
            For now, simpler to just hide arrows on small screens or place them below. 
            The previous logic hid them on some screens. I'll maintain the absolute right regarding larger screens.
        */}

        <p className="text-center text-xs lg:text-sm xl:text-base mb-6">
          See what our members have to say about their journey with us.
        </p>

        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-4"
        >
          {testimonialsData.map((testimonial, idx) => (
            <div
              key={testimonial.id || idx}
              className="flex-shrink-0 w-[280px] sm:w-[320px] bg-[#5B0408] rounded-xl p-6 relative flex flex-col justify-between border border-white/5 hover:border-white/10 transition-colors"
            >
              {/* Background Blur Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-primaryVar5 blur-[80px] rounded-full -z-10 opacity-50" />

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{testimonial.name}</h3>
                    <p className="text-xs text-secondary font-medium tracking-wide uppercase">
                      {testimonial.about || testimonial.role || "Member"}
                    </p>
                    {renderStars(testimonial.rating || 5)}
                  </div>
                  <img src={quote} alt="quote" className="w-6 h-6 opacity-80" />
                </div>

                <p className="text-sm text-greyText leading-relaxed line-clamp-6">
                  "{testimonial.review}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Testimonials;
