import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Design Tokens ──────────────────────────────────────────────
const EASE = [0.4, 0, 0.2, 1];

const cardBase =
  "group relative overflow-hidden rounded-2xl bg-gradient-to-b from-white to-slate-50/50 border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)]";

// ─── Stagger Wrapper ────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

// ─── Shared shimmer overlay ─────────────────────────────────────
function CardShimmer() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      animate={{ x: ["0%", "15%", "0%"], y: ["0%", "10%", "0%"] }}
      transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      style={{
        background: "radial-gradient(ellipse at 30% 20%, rgba(79,70,229,0.03) 0%, transparent 50%)",
        width: "200%",
        height: "200%",
        top: "-50%",
        left: "-50%",
      }}
    />
  );
}

// ─── Icon badge helper ──────────────────────────────────────────
function IconBadge({ color, children }) {
  const colors = {
    indigo: "bg-indigo-600/10",
    violet: "bg-violet-600/10",
    sky: "bg-sky-600/10",
    emerald: "bg-emerald-600/10",
    amber: "bg-amber-600/10",
  };
  return (
    <div className={`h-7 w-7 rounded-lg ${colors[color]} flex items-center justify-center`}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CARD 1 — Invoicing (Scan Line + Shimmer Lines)
// ═══════════════════════════════════════════════════════════════
function InvoicingCard() {
  return (
    <motion.div className={cardBase} variants={cardVariants}>
      <CardShimmer />
      <div className="relative z-10 p-6 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <IconBadge color="indigo">
            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          </IconBadge>
          <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">Invoicing</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Beautiful invoices</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">Auto-generate polished invoices from any project.</p>
      </div>

      <div className="relative z-10 mt-5 mx-6 mb-6 rounded-xl border border-slate-100 bg-white p-5 overflow-hidden">
        {/* Looping scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px z-20"
          style={{ background: "linear-gradient(90deg, transparent, rgba(79,70,229,0.3), transparent)" }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 3, ease: EASE, repeat: Infinity }}
        />

        {/* Header with PAID badge */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-indigo-600/10 flex items-center justify-center"><div className="h-2.5 w-2.5 rounded-sm bg-indigo-600" /></div>
            <div className="h-2 w-20 rounded-full bg-slate-200" />
          </div>
          <div className="h-4 px-2 rounded-full bg-emerald-50 border border-emerald-100 flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-semibold text-emerald-600">PAID</span>
          </div>
        </div>

        {/* From/To */}
        <div className="mb-4 flex gap-4">
          {["From", "To"].map((label) => (
            <div key={label} className="flex-1 p-2 rounded-lg bg-slate-50/80">
              <div className="text-[7px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
              <div className="h-1.5 w-16 rounded-full bg-slate-200 mb-1" />
              <div className="h-1.5 w-12 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>

        <div className="mb-3 h-px bg-slate-100" />

        {/* Table header */}
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Item</div>
            <div className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Qty</div>
          </div>
          <div className="text-[7px] font-bold text-slate-400 uppercase tracking-wider">Amount</div>
        </div>

        {/* Shimmering lines */}
        {[
          { w1: "w-24", w2: "w-14" },
          { w1: "w-20", w2: "w-10" },
          { w1: "w-28", w2: "w-16" },
          { w1: "w-16", w2: "w-12" },
        ].map((row, i) => (
          <motion.div
            key={i}
            className="mb-2.5 flex items-center justify-between"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-3">
              <div className={`h-2 ${row.w1} rounded-full bg-slate-200`} />
              <div className="h-2 w-6 rounded-full bg-slate-100" />
            </div>
            <div className={`h-2 ${row.w2} rounded-full bg-slate-200`} />
          </motion.div>
        ))}

        {/* Total */}
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-medium text-slate-400">Subtotal</span>
            <div className="h-2 w-14 rounded-full bg-slate-200" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-medium text-slate-400">Tax (10%)</span>
            <div className="h-2 w-10 rounded-full bg-slate-100" />
          </div>
          <div className="flex justify-between items-center pt-1.5 border-t border-dashed border-slate-100">
            <span className="text-[9px] font-bold text-slate-700">Total</span>
            <motion.div
              className="h-4 px-2.5 rounded-md bg-indigo-600/10 flex items-center"
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-[9px] font-bold text-indigo-600">$4,280.00</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CARD 2 — Whitelabeling (Isometric Float + Color Cycling)
// ═══════════════════════════════════════════════════════════════
function WhitelabelingCard() {
  const colorSets = [
    { colors: ["#4F46E5", "#7C3AED", "#2563EB"], label: "BRAND", gradient: "from-indigo-50 to-white" },
    { colors: ["#7C3AED", "#EC4899", "#8B5CF6"], label: "IDENTITY", gradient: "from-violet-50 to-white" },
    { colors: ["#334155", "#1E293B", "#475569"], label: "THEME", gradient: "from-slate-50 to-white" },
  ];

  const floatConfigs = [
    { duration: 3, delay: 0, x: -30, y: -25, z: 30, shadow: "0 2px 8px rgb(0,0,0,0.04)" },
    { duration: 4, delay: 0.5, x: 5, y: 5, z: 20, shadow: "0 6px 20px rgb(0,0,0,0.06)" },
    { duration: 3.5, delay: 1, x: 40, y: 30, z: 10, shadow: "0 12px 40px rgb(0,0,0,0.10)" },
  ];

  return (
    <motion.div className={`${cardBase} col-span-1 md:col-span-2`} variants={cardVariants}>
      <CardShimmer />
      <div className="relative z-10 p-6 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <IconBadge color="violet">
                <svg className="w-3.5 h-3.5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
              </IconBadge>
              <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">Whitelabeling</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Your brand, everywhere</h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-500">Fully customizable portals that look and feel like you.</p>
          </div>
          {/* Cycling swatches */}
          <div className="hidden md:flex items-center gap-2 mr-2">
            {colorSets.map((set, i) => (
              <motion.div
                key={i}
                className="h-6 w-6 rounded-lg"
                animate={{ backgroundColor: set.colors }}
                transition={{ duration: 6, delay: i, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 h-56 md:h-72 flex items-center justify-center overflow-hidden">
        {/* Ambient orbs */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-indigo-100/30 blur-3xl"
          style={{ top: "10%", left: "15%" }}
          animate={{ x: ["0%", "15%", "0%"], y: ["0%", "10%", "0%"] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        />

        <div style={{ transform: "perspective(800px) rotateX(12deg) rotateY(-16deg) rotateZ(2deg)", transformStyle: "preserve-3d", position: "relative", width: 280, height: 200 }}>
          {floatConfigs.map((config, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-xl border border-black/5 bg-gradient-to-br ${colorSets[i].gradient}`}
              style={{ width: 210, height: 140, left: config.x, top: config.y, zIndex: config.z, boxShadow: config.shadow }}
              animate={{ y: [0, -8, 0], rotate: [0, i === 1 ? -0.5 : 0.5, 0] }}
              transition={{ duration: config.duration, delay: config.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="p-4 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="h-4 w-4 rounded-md"
                      animate={{ backgroundColor: colorSets[i].colors }}
                      transition={{ duration: 6, delay: i, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="h-1.5 w-14 rounded-full bg-slate-200" />
                  </div>
                  {i === 0 && (
                    <div className="flex -space-x-1">
                      <div className="h-3 w-3 rounded-full bg-indigo-200 border border-white" />
                      <div className="h-3 w-3 rounded-full bg-indigo-300 border border-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-[8px] font-bold tracking-widest text-slate-400 mb-2">{colorSets[i].label}</div>
                  <div className="space-y-1.5">
                    <motion.div
                      className="h-1.5 rounded-full bg-slate-100"
                      animate={{ width: ["40%", "75%", "40%"] }}
                      transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="h-1.5 w-3/4 rounded-full bg-slate-100" />
                  </div>
                  {i === 0 && (
                    <div className="mt-2 h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-indigo-400"
                        initial={{ width: "0%" }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 1.5, delay: 1.2, ease: EASE }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CARD 3 — Document Builder (Cursor + Block Swaps)
// ═══════════════════════════════════════════════════════════════
function DocumentBuilderCard() {
  const blocks = [
    { bg: "bg-indigo-100", dot: "bg-indigo-400", line: "bg-indigo-300" },
    { bg: "bg-violet-100", dot: "bg-violet-400", line: "bg-violet-300" },
    { bg: "bg-sky-100", dot: "bg-sky-400", line: "bg-sky-300" },
    { bg: "bg-emerald-100", dot: "bg-emerald-400", line: "bg-emerald-300" },
    { bg: "bg-amber-100", dot: "bg-amber-400", line: "bg-amber-300" },
  ];

  return (
    <motion.div className={cardBase} variants={cardVariants}>
      <CardShimmer />
      <div className="relative z-10 p-6 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <IconBadge color="sky">
            <svg className="w-3.5 h-3.5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
          </IconBadge>
          <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">Documents</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Drag & drop builder</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">Assemble proposals from reusable content blocks.</p>
      </div>

      <div className="relative z-10 mx-6 mt-5 mb-6 rounded-xl border border-slate-100 bg-white overflow-hidden flex" style={{ height: 180 }}>
        {/* Animated cursor */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{ width: 14, height: 14 }}
          animate={{
            left: [30, 30, 120, 120, 120],
            top: [40, 40, 20, 20, 70],
            scale: [1, 1, 1, 0.85, 1],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration: 5, delay: 2, repeat: Infinity, ease: EASE }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86h6.35c.38 0 .57-.46.3-.73L5.85 3.55c-.27-.27-.73-.08-.73.3l.38-.64z" fill="#1D1D1F" stroke="white" strokeWidth="1.5"/>
          </svg>
        </motion.div>

        {/* Sidebar */}
        <div className="w-[88px] border-r border-slate-100 bg-slate-50/50 p-2.5 flex flex-col gap-1.5">
          <div className="text-[7px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-0.5">Blocks</div>
          {blocks.map((block, i) => (
            <motion.div
              key={i}
              className={`h-6 w-full rounded-md ${block.bg} flex items-center gap-1.5 px-2 cursor-pointer`}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1, scale: [1, 1.08, 1] }}
              transition={{
                x: { delay: 0.4 + i * 0.08, duration: 0.5, ease: EASE },
                opacity: { delay: 0.4 + i * 0.08, duration: 0.5, ease: EASE },
                scale: { delay: 1.5 + i, duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <div className={`h-2.5 w-2.5 rounded-sm ${block.dot}`} />
              <div className={`h-1 w-8 rounded-full ${block.line}`} />
            </motion.div>
          ))}
        </div>

        {/* Content area */}
        <motion.div
          className="flex-1 p-3 flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: EASE }}
        >
          {/* Toolbar */}
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-100">
            {[0,1,2].map((j) => (
              <div key={j} className="h-4 w-4 rounded bg-slate-100 flex items-center justify-center"><div className="h-2 w-2 rounded-sm bg-slate-300" /></div>
            ))}
            <div className="flex-1" />
            <div className="h-4 px-2 rounded bg-indigo-600 flex items-center">
              <span className="text-[7px] font-bold text-white">Preview</span>
            </div>
          </div>

          {/* Swapping content block */}
          <motion.div
            className="h-9 rounded-lg border flex items-center px-3 gap-2"
            animate={{
              backgroundColor: ["rgba(79,70,229,0.08)", "rgba(124,58,237,0.08)", "rgba(79,70,229,0.08)"],
              borderColor: ["rgba(79,70,229,0.15)", "rgba(124,58,237,0.15)", "rgba(79,70,229,0.15)"],
            }}
            transition={{ duration: 5, delay: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-3 w-3 rounded bg-indigo-200" />
            <div className="h-1.5 w-16 rounded-full bg-indigo-200" />
          </motion.div>

          <div className="flex gap-2 flex-1">
            <div className="flex-1 rounded-lg bg-slate-50 border border-slate-100 p-2">
              <div className="h-full w-full rounded bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z"/></svg>
              </div>
            </div>
            <div className="flex-1 rounded-lg bg-slate-50 border border-slate-100 p-2 flex flex-col gap-1">
              <div className="h-1 w-full rounded-full bg-slate-200" />
              <div className="h-1 w-3/4 rounded-full bg-slate-100" />
              <div className="h-1 w-5/6 rounded-full bg-slate-100" />
            </div>
          </div>

          <div className="h-7 rounded-lg bg-violet-50 border border-violet-100/50 flex items-center px-3 gap-2">
            <div className="h-3 w-3 rounded bg-violet-200" />
            <div className="h-1.5 w-12 rounded-full bg-violet-200" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CARD 4 — E-Sign (Looping Signature Draw + Pen Cursor)
// ═══════════════════════════════════════════════════════════════
function ESignCard() {
  const signaturePath = "M 10 55 C 18 18, 35 15, 48 50 S 75 82, 88 45 C 93 30, 98 25, 108 35 S 128 60, 138 45 C 143 37, 153 25, 163 40 S 178 55, 195 35";

  return (
    <motion.div className={cardBase} variants={cardVariants}>
      <CardShimmer />
      <div className="relative z-10 p-6 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <IconBadge color="emerald">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </IconBadge>
          <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">E-Sign</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Legally binding</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">Collect signatures on any document in seconds.</p>
      </div>

      <div className="relative z-10 mx-6 mt-5 mb-6 rounded-xl border border-slate-100 bg-white p-5 overflow-hidden">
        {/* Pen cursor */}
        <motion.div
          className="absolute z-20 pointer-events-none"
          style={{ width: 16, height: 16, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}
          animate={{
            left: ["8%", "15%", "25%", "40%", "55%", "75%", "88%", "88%"],
            top: ["70%", "30%", "65%", "25%", "55%", "35%", "45%", "45%"],
            opacity: [0, 1, 1, 1, 1, 1, 1, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: EASE }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* Doc header */}
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1.5">
            {[24, 16].map((w, i) => (
              <motion.div
                key={i}
                className={`h-1.5 w-${w} rounded-full bg-slate-100`}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          <div className="h-5 px-2 rounded-md bg-amber-50 border border-amber-100 flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[7px] font-bold text-amber-600">PENDING</span>
          </div>
        </div>

        {/* Contract lines */}
        <div className="space-y-2 mb-5 pl-1">
          {["92%", "78%", "85%", "50%"].map((w, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full bg-slate-100"
              style={{ width: w }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Signer info */}
        <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-slate-50/80">
          <div className="h-5 w-5 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-[7px] font-bold text-indigo-600">JD</span>
          </div>
          <div>
            <div className="h-1.5 w-16 rounded-full bg-slate-200 mb-0.5" />
            <div className="h-1 w-24 rounded-full bg-slate-100" />
          </div>
        </div>

        {/* Signature box — looping draw */}
        <div className="relative p-3 rounded-lg border border-dashed border-slate-200 bg-slate-50/30">
          <div className="absolute top-1.5 left-3 text-[7px] font-bold text-slate-400 uppercase tracking-wider">Sign here</div>
          <svg viewBox="0 0 210 80" className="w-full h-auto mt-2" fill="none">
            <motion.path
              d={signaturePath}
              stroke="#4F46E5"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 6,
                times: [0, 0.6, 0.75, 1],
                repeat: Infinity,
                ease: EASE,
              }}
            />
            <motion.circle
              cx="195" cy="35" r="3" fill="#4F46E5"
              animate={{
                scale: [0, 0, 1, 1, 0],
                opacity: [0, 0, 1, 1, 0],
              }}
              transition={{
                duration: 6,
                times: [0, 0.55, 0.6, 0.75, 0.85],
                repeat: Infinity,
                ease: EASE,
              }}
            />
          </svg>
        </div>

        {/* Date + verified */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <span className="text-[8px] text-slate-400 font-medium">Feb 16, 2026</span>
          </div>
          <motion.div
            className="flex items-center gap-1"
            animate={{
              opacity: [0, 0, 1, 1, 0],
              y: [5, 5, 0, 0, 0],
            }}
            transition={{ duration: 6, times: [0, 0.58, 0.65, 0.75, 0.85], repeat: Infinity, ease: EASE }}
          >
            <svg className="h-3 w-3 text-emerald-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>
            <span className="text-[8px] font-semibold text-emerald-600">Verified</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CARD 5 — Meeting Scheduler (Pulse + Notification + Clock)
// ═══════════════════════════════════════════════════════════════
function MeetingSchedulerCard() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
  ];
  const available = new Set([3, 8, 10, 15, 17, 22, 24]);
  const selected = 15;
  const today = 12;

  return (
    <motion.div className={cardBase} variants={cardVariants}>
      <CardShimmer />
      <div className="relative z-10 p-6 pb-0">
        <div className="flex items-center gap-2 mb-3">
          <IconBadge color="amber">
            <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </IconBadge>
          <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-600">Scheduler</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900">Book meetings</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">Let clients self-schedule from your availability.</p>
      </div>

      <div className="relative z-10 mx-6 mt-5 mb-6 rounded-xl border border-slate-100 bg-white p-4 overflow-hidden">
        {/* Notification toast */}
        <motion.div
          className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-emerald-100 shadow-[0_4px_12px_rgb(0,0,0,0.06)]"
          animate={{ x: ["100%", "0%", "0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 8, times: [0.8, 0.85, 0.95, 1], delay: 2, repeat: Infinity, ease: EASE }}
        >
          <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>
          </div>
          <span className="text-[8px] font-semibold text-slate-700">Meeting booked!</span>
        </motion.div>

        {/* Month header with clock */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">January 2025</span>
            <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <motion.line
                x1="12" y1="12" x2="12" y2="7"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "12px 12px" }}
              />
            </svg>
          </div>
          <div className="flex gap-1">
            <div className="h-5 w-5 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] cursor-pointer hover:bg-slate-200 transition-colors">‹</div>
            <div className="h-5 w-5 rounded-md bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] cursor-pointer hover:bg-slate-200 transition-colors">›</div>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {days.map((d, i) => (
            <div key={i} className="text-center text-[8px] font-semibold text-slate-400 py-0.5">{d}</div>
          ))}
        </div>

        {/* Date grid */}
        {dates.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
            {week.map((date, di) => {
              if (date === null) return <div key={di} className="h-7" />;
              const isAvailable = available.has(date);
              const isSelected = date === selected;
              const isToday = date === today;
              const isPast = date < today;

              return (
                <motion.div
                  key={di}
                  className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-medium cursor-pointer transition-all duration-200 ${
                    isSelected ? "bg-indigo-600 text-white"
                    : isAvailable ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                    : isToday ? "text-slate-700 font-bold ring-1 ring-slate-200"
                    : isPast ? "text-slate-300"
                    : "text-slate-500 hover:bg-slate-50"
                  }`}
                  {...(isSelected ? {
                    animate: { boxShadow: ["0 0 0 0 rgba(79,70,229,0.3)", "0 0 0 4px rgba(79,70,229,0.12)", "0 0 0 0 rgba(79,70,229,0.3)"] },
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  } : isAvailable ? {
                    animate: { scale: [0.92, 1, 0.92] },
                    transition: { duration: 2.5, delay: date * 0.12, repeat: Infinity, ease: "easeInOut" },
                  } : {})}
                >
                  {date}
                </motion.div>
              );
            })}
          </div>
        ))}

        {/* Time slots */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-[7px] font-bold text-slate-400 uppercase tracking-wider mb-2">Available Slots</div>
          <div className="flex gap-1.5">
            {["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"].map((time, i) => (
              <motion.div
                key={i}
                className={`flex-1 text-center py-1.5 rounded-lg text-[9px] font-semibold border cursor-pointer transition-all duration-200 ${
                  i === 1
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-[0_2px_8px_rgba(79,70,229,0.3)]"
                    : "bg-white text-slate-500 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50"
                }`}
                {...(i === 1 ? {
                  animate: { y: [0, -2, 0] },
                  transition: { duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" },
                } : {})}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4, ease: EASE }}
              >
                {time}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Attendee row */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
          <div className="flex -space-x-1.5">
            {[
              { bg: "bg-indigo-200", text: "text-indigo-700", letter: "A" },
              { bg: "bg-violet-200", text: "text-violet-700", letter: "M" },
              { bg: "bg-sky-200", text: "text-sky-700", letter: "S" },
            ].map((a, i) => (
              <div key={i} className={`h-5 w-5 rounded-full ${a.bg} border-2 border-white flex items-center justify-center`}>
                <span className={`text-[6px] font-bold ${a.text}`}>{a.letter}</span>
              </div>
            ))}
          </div>
          <div className="text-[8px] text-slate-400">30 min · Zoom</div>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN BENTO GRID
// ═══════════════════════════════════════════════════════════════
export default function BentoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="min-h-screen bg-[#F9FAFB] px-4 py-20 sm:px-6 lg:px-8 font-['Inter',sans-serif]">
      {/* Section header */}
      <div className="mx-auto max-w-4xl text-center mb-14">
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50/50 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0, boxShadow: ["0 0 0 0 rgba(79,70,229,0.2)", "0 0 0 6px rgba(79,70,229,0)", "0 0 0 0 rgba(79,70,229,0.2)"] } : {}}
          transition={{ opacity: { duration: 0.5 }, y: { duration: 0.5 }, boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest uppercase text-indigo-600">Platform Features</span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          Everything you need to close deals
        </motion.h2>
        <motion.p
          className="mt-3 text-base text-slate-500 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
        >
          From proposals to payments — a single workspace for modern service teams.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <motion.div
        className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <InvoicingCard />
        <WhitelabelingCard />
        <DocumentBuilderCard />
        <ESignCard />
        <MeetingSchedulerCard />
      </motion.div>
    </section>
  );
}
