
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  GraduationCap, 
  LineChart, 
  BarChart4, 
  Info, 
  History, 
  Star,
  Home,
  PieChart,
  Activity,
  BookOpen,
  FileText,
  Award
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === "/") return "/";
    if (path === "/predict") return "/predict";
    if (path === "/results") return "/results";
    if (path === "/history") return "/history";
    if (path === "/about") return "/about";
    return "/";
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl",
        scrolled 
          ? "bg-background/90 border-b shadow-md py-3" 
          : "bg-gradient-to-r from-background/60 via-background/70 to-background/60 py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
            className="bg-gradient-to-br from-primary to-primary/70 rounded-lg p-1.5 text-primary-foreground shadow-md group-hover:shadow-lg"
          >
            <GraduationCap className="h-6 w-6" />
          </motion.div>
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            AcademiPredict
          </motion.span>
        </Link>
        
        <div className="hidden md:block">
          <Tabs value={getCurrentTab()} className="w-full">
            <TabsList className="h-12 bg-background/40 backdrop-blur-md px-2 border shadow-sm rounded-full">
              <NavTabItem path="/" icon={<Home className="h-4 w-4" />} label="Home" color="from-blue-500 to-cyan-400" bgColor="bg-blue-500/10" />
              <NavTabItem path="/predict" icon={<Activity className="h-4 w-4" />} label="Predict" color="from-emerald-500 to-green-400" bgColor="bg-emerald-500/10" />
              <NavTabItem path="/results" icon={<PieChart className="h-4 w-4" />} label="Results" color="from-orange-500 to-amber-400" bgColor="bg-orange-500/10" />
              <NavTabItem path="/history" icon={<History className="h-4 w-4" />} label="History" color="from-purple-500 to-violet-400" bgColor="bg-purple-500/10" />
              <NavTabItem path="/about" icon={<FileText className="h-4 w-4" />} label="About" color="from-pink-500 to-rose-400" bgColor="bg-pink-500/10" />
            </TabsList>
          </Tabs>
        </div>

        <div className="md:hidden flex items-center">
          <MobileNav />
        </div>
      </div>
    </motion.nav>
  );
};

const NavTabItem = ({ 
  path, 
  icon, 
  label,
  color,
  bgColor
}: { 
  path: string; 
  icon: React.ReactNode; 
  label: string;
  color: string;
  bgColor: string;
}) => {
  return (
    <TabsTrigger
      value={path}
      className="relative data-[state=active]:shadow-none data-[state=active]:bg-transparent px-5 py-2"
      asChild
    >
      <Link to={path}>
        <div className="relative z-20">
          <motion.div
            layout
            layoutId="tab-indicator"
            className={cn(
              "absolute inset-0 z-10 bg-gradient-to-r rounded-full",
              color,
              "opacity-0 data-[state=active]:opacity-100 transition-opacity"
            )}
            style={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
          
          <div 
            className={cn(
              "absolute inset-0 z-0 rounded-full transition-opacity duration-300",
              bgColor,
              "opacity-0 data-[state=active]:opacity-100"
            )}
          />
          
          <span className="relative z-20 text-black font-medium flex items-center gap-1.5">
            {icon}
            <span>{label}</span>
          </span>
        </div>
      </Link>
    </TabsTrigger>
  );
};

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <div className="relative">
      <motion.button
        onClick={toggleMenu}
        className="p-2 focus:outline-none"
        aria-label="Toggle menu"
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-6 flex flex-col gap-1.5">
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 bg-foreground rounded-full w-full transition-all duration-300"
          />
          <motion.span 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 bg-foreground rounded-full w-full transition-all duration-300"
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block h-0.5 bg-foreground rounded-full w-full transition-all duration-300"
          />
        </div>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", bounce: 0.35 }}
          className="absolute right-0 mt-3 w-64 bg-gradient-to-b from-card to-card/90 rounded-lg shadow-xl border backdrop-blur-lg animate-fade-in overflow-hidden"
        >
          <div className="p-3 flex flex-col gap-1">
            <MobileNavLink href="/" icon={<Home className="h-4 w-4" />} color="bg-blue-500">
              Home
            </MobileNavLink>
            <MobileNavLink href="/predict" icon={<Activity className="h-4 w-4" />} color="bg-emerald-500">
              Predict
            </MobileNavLink>
            <MobileNavLink href="/results" icon={<PieChart className="h-4 w-4" />} color="bg-orange-500">
              Results
            </MobileNavLink>
            <MobileNavLink href="/history" icon={<History className="h-4 w-4" />} color="bg-purple-500">
              History
            </MobileNavLink>
            <MobileNavLink href="/about" icon={<FileText className="h-4 w-4" />} color="bg-pink-500">
              About
            </MobileNavLink>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const MobileNavLink = ({ 
  href, 
  icon, 
  color,
  children 
}: { 
  href: string; 
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <motion.div
      whileHover={{ scale: 1.03, x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        to={href}
        className={cn(
          "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all",
          isActive 
            ? `${color}/10 text-foreground font-medium` 
            : "hover:bg-accent"
        )}
      >
        <span className={cn(
          "p-1.5 rounded-md",
          isActive ? color : "bg-muted"
        )}>
          {icon}
        </span>
        <span className={cn(
          isActive ? "font-medium" : "text-muted-foreground"
        )}>
          {children}
        </span>
        
        {isActive && (
          <motion.span
            layoutId="sidebar-indicator"
            className={cn("absolute left-0 w-1 h-8 rounded-r-full", color)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default Navbar;
