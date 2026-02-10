import { useRef, useState, useEffect } from "react";
import {
  arrowLeftWhite,
  arrowRight,
  arrowRightWhite,
  close,
} from "../assets";
import Section from "./reusable/Section";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import { motion } from "motion/react";
import { revealVar } from "../motion/opacityReveal";

const Trainers = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [trainersData, setTrainersData] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "trainers"));
        const fetchedTrainers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainersData(fetchedTrainers);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  const amount = window.innerWidth - window.innerWidth / 2;

  const handleScroll = (scrollAmount) => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    const maxScrollLeft = scrollWidth - clientWidth;
    const newScrollPosition = Math.min(
      Math.max(scrollLeft + scrollAmount, 0),
      maxScrollLeft,
    );

    setScrollPosition(newScrollPosition);
    containerRef.current.scrollLeft = newScrollPosition;
  };

  const getAdditionalDetails = (trainer) => {
    // Exclude common fields already displayed or not suitable for display
    const excludedKeys = ['id', 'name', 'role', 'image', 'imageUrl', 'img', 'date', 'order', 'bio', 'description', 'createdAt'];
    return Object.entries(trainer).filter(([key]) => !excludedKeys.includes(key));
  };

  return (
    <Section>
      <motion.div
        variants={revealVar}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container space-y-4 xl:space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-center text-xl font-semibold lg:text-2xl lg:font-bold xl:text-3xl">
            Meet Our <span className="text-primary">Trainers</span>
          </h2>

          {trainersData.length > 5 && (
            <div className="flex items-center gap-2">
              <button onClick={() => handleScroll(-amount)}>
                <img
                  src={arrowLeftWhite}
                  alt="-"
                  className="rounded-[4px] border-2 border-white px-4 py-2"
                />
              </button>
              <button onClick={() => handleScroll(amount)}>
                <img
                  src={arrowRightWhite}
                  alt="-"
                  className="rounded-[4px] border-2 border-white px-4 py-2"
                />
              </button>
            </div>
          )}
        </div>
        <p className="text-center text-xs lg:text-sm xl:text-base">
          At This Part you can See Some Of our Trainers And They’re Work’s.
        </p>
        <div
          ref={containerRef}
          className="relative flex items-center gap-3 overflow-scroll scroll-smooth pb-1 no-scrollbar lg:gap-6 xl:gap-10"
        >
          <div className="absolute bottom-2 left-0 h-1/3 w-1/2 rounded-full bg-primaryVar5 blur-[350px]" />
          <div className="absolute bottom-2 right-0 h-1/3 w-1/2 rounded-full bg-secondaryVar3 blur-[350px]" />
          {trainersData.map((trainer, i) => (
            <div key={trainer.id} className="flex shrink-0 flex-col rounded-xl min-w-[200px] md:min-w-[214px] xl:min-w-[281px]">
              <img
                src={trainer.image || trainer.imageUrl || trainer.img}
                alt=""
                className="w-full h-[200px] md:h-[220px] xl:h-[281px] object-cover rounded-t-xl"
              />
              <div className="space-y-3 rounded-b-xl bg-greyLight px-3 pb-3 drop-shadow-sm flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium xl:text-2xl xl:font-bold mt-2">
                    {trainer.name}
                  </h3>
                  <p className="text-xs font-medium text-greyTextVar1 lg:text-sm xl:text-base">
                    {trainer.role}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTrainer(trainer)}
                  className="relative flex items-center gap-1 group mt-2"
                >
                  <div
                    className={`absolute left-0 z-10 size-5 rounded-full blur-[10px] ${i % 2 === 0 ? "bg-primaryVar5" : "bg-secondaryVar3"
                      }`}
                  />
                  <div className="text-sm group-hover:text-primary transition-colors z-20">Learn More</div>
                  <img src={arrowRight} alt="" className="group-hover:translate-x-1 transition-transform z-20" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedTrainer && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedTrainer(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-grey border border-white/10 rounded-2xl shadow-2xl custom-scrollbar"
            >
              <button
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors border border-white/10"
              >
                <img src={close} alt="Close" className="w-5 h-5 invert" />
              </button>

              <div className="h-64 sm:h-80 w-full relative shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-grey via-transparent to-transparent z-10" />
                <img
                  src={selectedTrainer.image || selectedTrainer.imageUrl || selectedTrainer.img}
                  alt={selectedTrainer.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-6 pt-0 relative z-20 -mt-20 space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">{selectedTrainer.name}</h3>
                  <p className="text-primary font-medium text-lg">{selectedTrainer.role}</p>
                </div>

                <div className="space-y-4 text-greyText text-sm sm:text-base pb-4">
                  {/* Display Description/Bio specifically first if available */}
                  {(selectedTrainer.bio || selectedTrainer.description) && (
                    <div className="space-y-1">
                      <h4 className="text-white font-semibold">About</h4>
                      <p className="leading-relaxed">{selectedTrainer.bio || selectedTrainer.description}</p>
                    </div>
                  )}

                  {/* Dynamically display other fields */}
                  {getAdditionalDetails(selectedTrainer).map(([key, value]) => {
                    // Skip complex objects or arrays for simplicity unless handled specific logic above
                    if (typeof value === 'object' && !Array.isArray(value)) return null;

                    return (
                      <div key={key} className="space-y-1">
                        <h4 className="text-white font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                        <div className="leading-relaxed">
                          {Array.isArray(value) ? (
                            <ul className="list-disc list-inside">
                              {value.map((v, idx) => <li key={idx}>{v}</li>)}
                            </ul>
                          ) : (
                            <p>{value.toString()}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}

      </motion.div>
    </Section>
  );
};

export default Trainers;
