import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SIMULATED_LOGS = [
  `[Cloudflare Trace] HTTP/3 & TLS 1.3 Confirmed. Connection encrypted with Love.`,
  `[MAC Vendor Lookup] Decrypting address 00:1A:2B:3C... Vendor identified: Cupid Inc.`,
  `[NetworkCalc] Subnet mask 255.255.255.255... Direct routing to Minh Nhat's heart.`,
  `[PurgoMalum] Scanning content purity... 100% Angelic. No toxicity found.`,
  `[Open Page Rank] Analyzing facial symmetry... PageRank score: Infinity/10.`,
  `[Nager.Date] Querying holidays... Event found: Everyday is Valentine's day with Tina.`,
  `[Ciprand] Generating AES-256 secure love token... ********************`,
  `[Abacus] Monitoring target heart rate... Over 9000 bpm.`,
  `[Waifu.im] Cross-referencing anime databases... Match: Supreme Waifu Tier.`,
  `[MeowFacts] Injecting cute feline payload: "Em là bé mèo ngoan nhất của anh".`,
  `[QR Code Generator] Compiling encrypted love matrix... SYSTEM FULLY UNLOCKED 🔓💖`
];

export default function HightechTerminal() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let isMounted = true;
    
    const runTerminal = async () => {
      const addLog = (log) => {
        if (isMounted) {
          setLogs(prev => [...prev.slice(-20), log]); // Keep max 21 logs for performance
        }
      };

      addLog("> INITIALIZING SCI-FI HACKER LOVE TERMINAL...");
      await new Promise(resolve => setTimeout(resolve, 500));
      addLog("> FETCHING REAL-TIME TARGET DATA...");

      // Phase A: Real APIs
      try {
        const [ipRes, genderRes, ageRes, natRes] = await Promise.all([
          fetch('https://api.ipify.org?format=json').then(r => r.json()).catch(() => ({ ip: 'UNKNOWN' })),
          fetch('https://api.genderize.io?name=tina').then(r => r.json()).catch(() => ({ gender: 'female' })),
          fetch('https://api.agify.io?name=tina').then(r => r.json()).catch(() => ({ age: 10 })),
          fetch('https://api.nationalize.io?name=tina').then(r => r.json()).catch(() => ({ country: [{ country_id: 'VN' }] }))
        ]);

        addLog(`[IPify API] Target IP Address: ${ipRes.ip || 'UNKNOWN'}`);
        await new Promise(resolve => setTimeout(resolve, 200));
        addLog(`[Genderize API] Analyzing DNA... Gender: ${genderRes.gender || 'female'} (100% Princess detected)`);
        await new Promise(resolve => setTimeout(resolve, 200));
        addLog(`[Agify API] Calculating biological age... ${ageRes.age || 18} years old. Status: Baby in Minh Nhat's eyes.`);
        await new Promise(resolve => setTimeout(resolve, 200));
        addLog(`[Nationalize API] Origin trace... Country: ${natRes.country?.[0]?.country_id || 'VN'} (The most beautiful girl in Vietnam).`);

      } catch (error) {
        addLog(`> ERROR FETCHING DATA. PROCEEDING WITH CACHED LOVE ALGORITHMS...`);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      addLog("> INITIATING LOCAL BYPASS PROTOCOLS...");
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Phase B: Simulated APIs
      for (let i = 0; i < SIMULATED_LOGS.length; i++) {
        if (!isMounted) return;
        addLog(SIMULATED_LOGS[i]);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    };

    runTerminal();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div 
      className="fixed top-2 left-2 sm:top-4 sm:left-4 z-[20] pointer-events-none w-[calc(100vw-16px)] sm:w-96"
    >
      <div 
        className="bg-black/70 backdrop-blur-md rounded-lg border border-green-500/30 p-3 sm:p-4 overflow-hidden max-h-[40vh] sm:max-h-[80vh] flex flex-col justify-end"
        style={{
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="flex flex-col gap-1.5 justify-end">
          <AnimatePresence initial={false}>
            {logs.map((log, index) => (
              <motion.div
                key={log + index} // Use unique key based on content and index
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="terminal-text text-xs sm:text-sm font-medium leading-relaxed"
                style={{
                  fontFamily: "'Fira Code', 'Courier New', Courier, monospace",
                }}
              >
                {log}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes hackerColorCycle {
          0% { color: #4ade80; text-shadow: 0 0 8px rgba(74, 222, 128, 0.6); }
          50% { color: #f472b6; text-shadow: 0 0 8px rgba(244, 114, 182, 0.6); }
          100% { color: #4ade80; text-shadow: 0 0 8px rgba(74, 222, 128, 0.6); }
        }
        .terminal-text {
          animation: hackerColorCycle 4s infinite alternate ease-in-out;
          word-break: break-word;
        }
      `}} />
    </div>
  );
}
