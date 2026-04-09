import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogIn, LogOut, User as UserIcon, Menu, X, Square } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { handleSignIn } from "@/firebase";
import { toast } from "sonner";

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const onSignIn = async () => {
    try {
      const signedInUser = await handleSignIn();
      if (signedInUser) {
        toast.success(`Welcome back, ${signedInUser.displayName || "User"}!`);
      }
    } catch (error) {
      toast.error("An error occurred during sign in.");
    }
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/" || location.pathname === "/home"
      : location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    // { name: "Portfolio", path: "/portfolio" },
    { name: "Services", path: "/services" },
    { name: "Vault", path: "/vault" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "border-b border-border/40 bg-background/30 backdrop-blur-lg py-4 bg-primary/50"
          : "bg-transparent py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between gap-12 ">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 shrink-0 group hover:gap-6 transition-all duration-300 "
        >
          <div className="w-6 h-6 border-[1.5px] border-white flex items-center justify-center transition-transform duration-700 group-hover:rotate-45 shadow-lg hover:text-primary/50">
            <Square className="w-3 h-3 fill-white hover:text-primary/50" />
          </div>
          <span className="font-serif text-lg font-normal tracking-[0.2em] uppercase text-white drop-shadow-lg hover:text-primary/90 hover:font-bold hover:scale-105 hover:drop-shadow-xl transition-all duration-300">
            SIVCHHENG
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative text-[11px] font-sans font-semibold uppercase tracking-[0.25em] transition-all duration-300 drop-shadow-md hover:text-primary/90",
                isActive(link.path) ? "text-white font-bold" : "text-blue-100",
              )}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-lg" />
              )}
            </Link>
          ))}
        </nav>

        {/* Auth Controls */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8 border border-border/50 grayscale hover:grayscale-0 transition-all duration-500">
                <AvatarImage
                  src={user.photoURL || ""}
                  alt={user.displayName || ""}
                />
                <AvatarFallback className="bg-muted text-[10px] font-sans">
                  {user.displayName?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="h-8 w-8 text-white hover:text-blue-100 transition-colors drop-shadow-md"
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSignIn}
              className="h-10 px-6 font-sans text-[10px] font-bold tracking-[0.2em] uppercase border-2 border-white text-white hover:bg-white hover:text-blue-900 transition-all duration-500 drop-shadow-lg"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-10 w-10 text-white hover:text-blue-100"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full bg-background/95 backdrop-blur-2xl border-none p-12 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-12 text-center w-full mt-20">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-4xl font-serif font-medium tracking-wide transition-all duration-300",
                      isActive(link.path)
                        ? "text-primary scale-110"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Auth Actions */}
              <div className="w-full border-t border-border/10 pt-12 mt-auto">
                {user ? (
                  <div className="flex flex-col items-center gap-8">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-primary/20 grayscale hover:grayscale-0 transition-all duration-500">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || ""} />
                        <AvatarFallback className="bg-muted text-lg font-sans">
                          {user.displayName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="text-sm font-serif font-medium">{user.displayName || "Studio Guest"}</p>
                        <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-muted-foreground">Studio Member</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="w-full h-16 rounded-none border-[1.5px] border-primary/20 font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-primary hover:text-background transition-all duration-500"
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <p className="text-center font-serif italic text-sm text-muted-foreground/60 mb-6">Access private commissions and archives.</p>
                    <Button
                      onClick={() => {
                        onSignIn();
                        setMobileOpen(false);
                      }}
                      className="w-full h-20 rounded-none bg-foreground text-background font-sans text-xs font-bold tracking-[0.3em] uppercase hover:bg-primary transition-all duration-700 shadow-2xl shadow-primary/20"
                    >
                      Authenticate
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
