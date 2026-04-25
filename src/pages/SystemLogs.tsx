import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldAlert, Clock, Globe, Trash2, ChevronRight, AlertCircle, Cpu, CpuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { errorLogger, AppError } from '../lib/errorLogger';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function SystemLogs() {
  const [logs, setLogs] = useState<AppError[]>([]);
  const [selectedLog, setSelectedLog] = useState<AppError | null>(null);

  useEffect(() => {
    // Initial fetch
    setLogs([...errorLogger.getErrors()].reverse());

    // Sync with localStorage
    const saved = localStorage.getItem("system_error_logs");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (logs.length === 0) setLogs(parsed.reverse());
      } catch (e) {
        console.error("Failed to sync logs", e);
      }
    }
  }, []);

  const clearLogs = () => {
    errorLogger.clearErrors();
    setLogs([]);
    setSelectedLog(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 p-8 relative overflow-hidden">

      {/* Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] right-[10%] w-[50vw] h-[50vw] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[0%] left-[0%] w-[40vw] h-[40vw] bg-secondary/3 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-primary uppercase tracking-[0.4em] text-[10px] font-bold">
              <span className="w-8 h-[1px] bg-primary" />
              SYSTEM_HEARTBEAT
            </div>
            <h1 className="text-6xl md:text-8xl font-sans font-medium tracking-tighter uppercase text-gradient">
              System <span className="italic">Logs.</span>
            </h1>
            <p className="text-muted-foreground/60 font-sans italic text-lg max-w-xl">
              "Real-time monitoring of frontend exceptions and orchestration failures. This archive persists diagnostics across sessions for core-system analysis."
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={clearLogs}
              className="h-14 px-8 rounded-full border-white/10 hover:bg-red-500/10 hover:text-red-500 transition-all font-bold tracking-widest gap-3"
            >
              <Trash2 size={16} /> PURGE ARCHIVE
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-4">
            <AnimatePresence custom="popLayout text-center justify-center">
              {logs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-40 flex flex-col items-center justify-center text-center glass-panel rounded-[40px] border-white/5 bg-white/2"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-8 shadow-[0_0_30px_rgba(0,180,180,0.2)]">
                    <CpuIcon className="w-10 h-10 animate-pulse " />
                  </div>
                  <h3 className="text-2xl font-sans font-medium text-white/90">System Integrity Verified</h3>
                  <p className="text-muted-foreground font-sans italic mt-2">Zero critical exceptions detected in the current runtime environment.</p>
                </motion.div>
              ) : (
                logs.map((log, idx) => (
                  <motion.div
                    key={log.timestamp + idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedLog(log)}
                    className={`glass-panel p-6 rounded-3xl cursor-pointer border-white/5 transition-all duration-300 group hover:border-primary/40 ${selectedLog === log ? 'bg-primary/5 border-primary/30' : 'hover:bg-white/5'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                          <AlertCircle size={20} />
                        </div>
                        <div>
                          <h3 className="font-mono text-sm font-bold truncate max-w-[300px] md:max-w-[500px]">
                            {log.message}
                          </h3>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                              <Clock size={10} className="text-primary/40" />
                              {format(new Date(log.timestamp), 'HH:mm:ss MMM d')}
                            </span>
                            <span className="flex items-center gap-1.5 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                              <Globe size={10} className="text-primary/40" />
                              {log.path}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`transition-transform duration-300 ${selectedLog === log ? 'rotate-90 text-primary' : 'text-muted-foreground/20 group-hover:text-primary/60'}`} size={20} />
                    </div>

                    <AnimatePresence>
                      {selectedLog === log && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-8 mt-6 border-t border-white/5 space-y-6">
                            <div className="space-y-4">
                              <label className="font-mono text-[8px] font-bold text-primary uppercase tracking-[0.4em]">Stack Trace</label>
                              <pre className="bg-black/40 p-6 rounded-2xl text-[10px] text-white/60 font-mono leading-relaxed overflow-x-auto custom-scrollbar border border-white/5 italic">
                                {log.stack || 'No extended trace data available.'}
                              </pre>
                            </div>
                            {log.componentStack && (
                              <div className="space-y-4">
                                <label className="font-mono text-[8px] font-bold text-primary uppercase tracking-[0.4em]">Component Hierarchy</label>
                                <pre className="bg-black/40 p-6 rounded-2xl text-[10px] text-white/40 font-mono leading-relaxed overflow-x-auto custom-scrollbar border border-white/5">
                                  {log.componentStack}
                                </pre>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Stats / Sidebar */}
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-[32px] border-white/5 space-y-8 h-full">
              <div className="space-y-2">
                <h4 className="font-sans text-xl font-medium italic">Archive Status</h4>
                <div className="h-[1px] w-full bg-gradient-to-r from-primary/40 to-transparent" />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Total Exceptions</span>
                  <span className="text-2xl font-sans font-medium text-primary">{logs.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">System State</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 uppercase text-[9px] tracking-widest px-3 py-1">
                    Operative
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Orchestration</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">v{process.env.NODE_ENV}</span>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/5">
                <p className="text-[10px] text-muted-foreground leading-relaxed italic opacity-60">
                  System logs are stored locally in the environment buffer. Terminating the session or purging the archive will clear these records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
