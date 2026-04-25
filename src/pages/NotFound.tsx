import React from 'react';
import { motion } from 'motion/react';
import { Search, Home, ArrowLeft, Terminal, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-[#00ffcc] font-mono flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Glowing background blooms */}
      <div className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] bg-secondary/10 blur-[120px] rounded-full" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl text-center space-y-12 relative z-10"
      >
        <div className="space-y-6">
          <motion.div 
             animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="flex justify-center mb-12"
          >
             <div className="w-24 h-24 rounded-full glass-panel border-primary/20 flex items-center justify-center text-primary shadow-[0_0_50px_rgba(0,180,180,0.2)]">
                <ShieldAlert size={48} strokeWidth={1} />
             </div>
          </motion.div>

          <div className="space-y-4">
             <div className="flex items-center justify-center gap-4 text-primary uppercase tracking-[0.5em] text-[10px] font-bold">
                <span className="w-8 h-[1px] bg-primary" />
                404_LOCATION_NOT_FOUND
                <span className="w-8 h-[1px] bg-primary" />
             </div>
             <h1 className="text-7xl md:text-9xl font-sans font-medium tracking-tighter text-white uppercase italic">
                Entry <span className="text-primary italic">Void.</span>
             </h1>
          </div>
          
          <p className="text-white/40 text-lg max-w-lg mx-auto font-sans italic leading-relaxed">
             "The requested path coordinate does not exist in the current system mapping. Route resolution failed to find a valid entry point."
          </p>
        </div>

        {/* Action Console */}
        <div className="glass-panel p-2 rounded-full border-white/5 bg-white/5 max-w-md mx-auto flex gap-4 pr-6">
           <Button 
             onClick={() => navigate('/')}
             className="flex-1 h-14 rounded-full bg-primary text-background font-bold tracking-widest uppercase hover:scale-105 transition-all shadow-xl shadow-primary/20 gap-3"
           >
             <Home size={18} /> BACK_TO_ROOT
           </Button>
           <Button 
             variant="ghost"
             onClick={() => window.history.back()}
             className="h-14 w-14 rounded-full border border-white/5 hover:bg-white/5 text-white/60 p-0"
           >
             <ArrowLeft size={18} />
           </Button>
        </div>

        <div className="pt-12">
           <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.6em]">
              ERR_CODE: MO_0404 // KOOMPI_ORCHESTRATOR_V2.1
           </p>
        </div>
      </motion.div>
    </div>
  );
}
