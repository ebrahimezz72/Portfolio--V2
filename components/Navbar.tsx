"use client";

import React, { Component } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenuButton from "./MobileMenuButton";

interface NavbarProps {
  pathname: string;
}

interface NavbarState {
  scrolledSection: string;
  isMobileMenuOpen: boolean;
}

class NavbarComponent extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      scrolledSection: "home",
      isMobileMenuOpen: false,
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  }

  componentDidUpdate(prevProps: NavbarProps) {
    if (prevProps.pathname !== this.props.pathname) {
      this.handleScroll();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (this.props.pathname !== "/") return;

    const sections = ["home", "experience", "contact"]; 
    let current = "home";

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          current = id;
        }
      }
    }

    this.setState({ scrolledSection: current });
  };

  closeMenu = () => {
    this.setState({ isMobileMenuOpen: false });
  };

  toggleMenu = () => {
    this.setState((prevState) => ({
      isMobileMenuOpen: !prevState.isMobileMenuOpen,
    }));
  };

  setScrolledSection = (section: string) => {
    this.setState({ scrolledSection: section });
  };

  render() {
    const { pathname } = this.props;
    const { scrolledSection, isMobileMenuOpen } = this.state;

    const navLinks = [
      { id: "home", label: "Home", href: "/#home" },
      { id: "about", label: "About", href: "/about" },
      { id: "skills", label: "Skills", href: "/skills" },
      { id: "projects", label: "Projects", href: "/projects" },
      { id: "experience", label: "Experience", href: "/experience" },
      { id: "contact", label: "Contact", href: "/contact" }
    ];

    // الحساب الدقيق للمسار النشط (Active Link)
    let activeSection = scrolledSection;
    if (pathname !== "/") {
      // إذا كان مسار الصفحة غير الرئيسية، حدد النشط بالاعتماد على الـ path نفسه
      const exactMatch = navLinks.find(link => link.href.split('#')[0] === pathname);
      if (exactMatch) {
        activeSection = exactMatch.id;
      }
    }

    return (
      <>
        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 right-0 z-[990] bg-[#111111]/90 backdrop-blur-md border-b border-zinc-800 text-zinc-100 transition-all duration-300">
          <div className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto w-full">
            {/* Logo */}
            <Link 
              href="/#home" 
              onClick={() => { this.setScrolledSection("home"); this.closeMenu(); }} 
              className="font-bold text-base sm:text-lg md:text-xl uppercase"
            >
              Ibrahim Ezzeldin
            </Link>

            {/* Desktop */}
            <div className="hidden md:flex gap-8 text-sm font-medium">
              {navLinks.map(link => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`transition ${
                      isActive
                        ? "text-white underline underline-offset-8 decoration-[#d3e97a]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:block">
              <Link href="/projects" className="inline-block bg-[#d3e97a] text-black px-5 py-2.5 rounded-sm font-bold text-sm tracking-wide transition-colors hover:bg-[#b5cc5a] uppercase">
                View My Work
              </Link>
            </div>

            {/* Mobile Button */}
            <MobileMenuButton onClick={this.toggleMenu} isOpen={isMobileMenuOpen} />
          </div>

          {/* Mobile Dropdown Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? 'max-h-96 border-t border-zinc-800/80' : 'max-h-0'
            }`}
          >
            <div className="flex flex-col px-6 py-5 gap-5 bg-[#111111]/95">
              {navLinks.map(link => {
                const isActive = activeSection === link.id;
                return (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={this.closeMenu}
                    className={`text-base font-bold uppercase tracking-widest transition-colors ${
                      isActive
                        ? "text-[#d3e97a]"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/projects"
                onClick={this.closeMenu}
                className="mt-4 text-center bg-[#d3e97a] hover:bg-[#b5cc5a] text-black py-3.5 rounded-sm font-bold text-sm uppercase tracking-wide transition-colors"
              >
                View My Work
              </Link>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default function Navbar() {
  const pathname = usePathname();
  // Using a wrapper key to force re-render if needed? No, pathname passing as prop is enough
  return <NavbarComponent pathname={pathname} />;
}