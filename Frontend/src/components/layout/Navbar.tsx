import { useState, useEffect } from "react";

import { Menu } from "lucide-react";

import { motion } from "framer-motion";

import Container from "../ui/Container";

import Button from "../ui/Button";

import Logo from "./Logo";

import NavItem from "./NavItem";

import MobileMenu from "./MobileMenu";

import { NAVIGATION } from "../../constants/navigation";

export default function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {

    const handleScroll = () => {

      setScrolled(window.scrollY > 20);

    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  return (

    <>

      <motion.nav

        initial={{ y: -100 }}

        animate={{ y: 0 }}

        transition={{ duration: .8 }}

        className={`
          fixed
          left-0
          top-0
          z-40
          w-full
          transition-all
          duration-500

          ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl shadow-lg"
              : "bg-transparent"
          }
        `}
      >

        <Container>

          <div className="flex h-24 items-center justify-between">

            <Logo />

            <div className="hidden items-center gap-10 lg:flex">

              {NAVIGATION.map((item) => (

                <NavItem

                  key={item.title}

                  title={item.title}

                  href={item.href}

                />

              ))}

            </div>

            <div className="flex items-center gap-4">

              <div className="hidden lg:block">

                <Button>

                  Explore Now

                </Button>

              </div>

              <button

                className="lg:hidden"

                onClick={() => setMobileOpen(true)}

              >

                <Menu />

              </button>

            </div>

          </div>

        </Container>

      </motion.nav>

      <MobileMenu

        open={mobileOpen}

        onClose={() => setMobileOpen(false)}

      />

    </>

  );

}