
import Blog from "./Blog";
import Community from "./Community";
import Faq from "./Faq";
import Hero from "./Hero";
import OurWebsite from "./OurWebsite";
import Services from "./Services";
import Transformations from "./Transformations";
import Plans from "./Plans";
import Testimonials from "./Testimonials";
import Trainers from "./Trainers";

const Home = () => {
    return (
        <>
            <Hero />
            <OurWebsite />
            <Services />
            <Transformations />
            <Plans />
            <Testimonials />
            <Trainers />
            <Blog />
            <Community />
            <Faq />
        </>
    );
};

export default Home;
