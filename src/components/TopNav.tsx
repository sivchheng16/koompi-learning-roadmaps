import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LayoutDashboard, BookOpen, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

const logo = "/koompi-black.png";

function UserDropdown({ user, logout }: { user: NonNullable<ReturnType<typeof useAuth>["user"]>; logout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-sm font-sans text-muted-foreground hover:text-foreground transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-semibold">
          {user.fullname?.[0] ?? "?"}
        </div>
        <span>{user.fullname?.split(" ")[0]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 w-52 bg-white rounded-xl border border-border shadow-lg overflow-hidden z-50"
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-border">
              <p className="text-sm font-semibold text-foreground truncate">{user.fullname}</p>
              {user.email && <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>}
            </div>

            {/* Menu items */}
            <div className="py-1.5">
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <LayoutDashboard size={14} className="text-muted-foreground" />
                Dashboard
              </Link>
              <Link
                to="/my-courses"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <BookOpen size={14} className="text-muted-foreground" />
                My Courses
              </Link>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
              >
                <User size={14} className="text-muted-foreground" />
                Profile & Credits
              </Link>
            </div>

            <div className="border-t border-border py-1.5">
              <button
                onClick={() => { logout(); setOpen(false); }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/5 transition-colors"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, login, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300",
          scrolled || menuOpen
            ? "bg-white border-b border-border shadow-sm"
            : "bg-background/80 backdrop-blur-md border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group shrink-0">
            <img src={logo} alt="KOOMPI Academy" className="h-7 w-auto group-hover:opacity-70 transition-opacity" />
            <span className="font-sans font-semibold text-sm text-foreground hidden sm:block tracking-widest">
              ACADEMY
            </span>
          </Link>

          {/* Right: auth */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/create"
                  className="flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-primary/90 transition-colors"
                >
                  + Create
                </Link>
                <UserDropdown user={user} logout={logout} />
              </div>
            ) : (
              <button
                onClick={login}
                className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-primary/90 transition-colors"
              >
                Sign In
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1.5 rounded-lg text-foreground hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={menuOpen ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 bottom-0 z-40 bg-white flex flex-col px-6 pt-4 pb-10 overflow-y-auto md:hidden"
          >
            <div className="flex-1" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="pt-6 flex flex-col gap-3"
            >
              {user ? (
                <>
                  <Link
                    to="/my-courses"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-border font-serif text-2xl transition-colors text-foreground"
                  >
                    My Courses
                  </Link>
                  <Link
                    to="/create"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-border font-serif text-2xl transition-colors text-foreground"
                  >
                    Create
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-border font-serif text-2xl transition-colors text-foreground"
                  >
                    Profile
                  </Link>
                  <p className="text-sm font-sans text-muted-foreground pt-2">
                    Signed in as <span className="text-foreground font-medium">{user.fullname}</span>
                  </p>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="w-full py-3 px-5 rounded-xl border border-border text-sm font-sans font-medium text-destructive hover:bg-destructive/5 transition-colors text-left"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { login(); setMenuOpen(false); }}
                  className="w-full py-3.5 px-5 rounded-xl bg-primary text-primary-foreground text-sm font-sans font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign In
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
