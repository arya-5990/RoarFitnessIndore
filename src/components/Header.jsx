import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { chevronDown, menu } from "../assets";
import { navLinks } from "../constants";
import Logo from "./reusable/Logo";
import MobileMenu from "./MobileMenu";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

export const headerVar = {
  visible: { y: 0, transition: { duration: 0.35, ease: "easeInOut" } },
  hidden: { y: "-100%", transition: { duration: 0.35, ease: "easeInOut" } },
};

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    menuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 350) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <motion.header
      variants={headerVar}
      animate={hidden ? "hidden" : "visible"}
      className="sticky top-0 z-50 bg-grey/95 py-4 backdrop-blur-sm shadow-lg shadow-black/50 lg:py-5"
    >
      <div className="container flex justify-between">
        <div className="mr-6 flex items-center gap-3 max-lg:flex-1 xl:gap-6">
          <Link to="/">
            <Logo />
          </Link>

        </div>
        <nav className="hidden flex-1 items-center justify-center gap-10 xl:gap-14 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.url}
              className="flex items-center gap-1 font-medium"
            >
              <div className="flex flex-col items-center gap-1">
                <div className="transition-transform duration-500">
                  {link.title}
                </div>
                {link.url === pathname && (
                  <div className="h-[3px] w-[120%] rounded-full bg-primary bg-gradient-to-r from-primary from-30% to-secondary shadow-[0_0_8px_theme('colors.primary')]" />
                )}
              </div>
            </Link>
          ))}
        </nav>

        <button onClick={() => setMenuOpen(true)} className="lg:hidden">
          <img src={menu} alt="menu" width={36} height={36} />
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && <MobileMenu handleCloseMenu={handleCloseMenu} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
