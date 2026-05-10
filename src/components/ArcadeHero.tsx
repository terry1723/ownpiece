'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import PullAnimationOverlay, { PullMachine } from './PullAnimationOverlay';

const NAV_ITEMS = ['HOME', 'PULL', 'PACKS', 'COLLECTION', 'LEADERBOARD', 'REWARDS', 'HOW IT WORKS'];

const MACHINES: PullMachine[] = [
  { key: 'rookie', name: 'Rookie Machine', price: '49 OP', machine: '/assets/rookie-machine.png', pack: '/assets/rookie-pack.png' },
  { key: 'pro', name: 'Pro Machine', price: '99 OP', machine: '/assets/pro-machine.png', pack: '/assets/pro-pack.png' },
  { key: 'allstar', name: 'All-Star Machine', price: '199 OP', machine: '/assets/allstar-machine.png', pack: '/assets/allstar-pack.png' },
];

export default function ArcadeHero() {
  const [selectedKey, setSelectedKey] = useState<'rookie' | 'pro' | 'allstar'>('pro');
  const [open, setOpen] = useState(false);

  const selectedMachine = MACHINES.find((m) => m.key === selectedKey) ?? MACHINES[1];

  const trust = useMemo(
    () => ['100% GRADED CARDS', 'PSA / BGS / CGC / SGC', "SECURED BY Brink's", 'Temperature-controlled vault storage'],
    [],
  );

  const openOverlay = (machineKey: 'rookie' | 'pro' | 'allstar') => {
    setSelectedKey(machineKey);
    setOpen(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image src="/assets/arcade-bg-main.png" alt="Arcade background" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#071127]/80 to-[#05070f]/95" />
      <Image src="/assets/particles.png" alt="Particles" fill className="pointer-events-none object-cover opacity-35 mix-blend-screen" />
      <Image src="/assets/glow-streaks.png" alt="Glow streaks" fill className="pointer-events-none object-cover opacity-30" />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <span className="text-lg font-black tracking-[0.2em]">OWN PIECE</span>

          <ul className="hidden gap-4 text-[11px] tracking-[0.15em] text-white/80 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs md:inline">OP 1,240</span>
            <button className="rounded-full border border-blue-300/50 bg-blue-500/20 px-4 py-2 text-xs font-semibold transition hover:scale-[1.03] active:scale-[0.98]">
              CONNECT WALLET
            </button>
          </div>
        </nav>
      </header>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-10 pt-24">
        <div className="text-center">
          <h1 className="neon-text text-4xl font-black tracking-[0.12em] md:text-7xl">OWN PIECE NBA ARCADE</h1>
          <p className="mt-3 text-lg font-semibold tracking-[0.3em] text-amber-300">PULL. REVEAL. COLLECT.</p>
          <p className="mt-2 text-xs text-white/70">Selected: {selectedKey.toUpperCase()}</p>
        </div>

        <div className="mt-8 flex snap-x gap-3 overflow-x-auto pb-4 md:gap-4 md:justify-center">
          {MACHINES.map((m) => {
            const active = selectedKey === m.key;
            const glow =
              m.key === 'rookie'
                ? '0 0 38px rgba(249,115,22,0.55)'
                : m.key === 'pro'
                ? '0 0 42px rgba(59,130,246,0.65)'
                : '0 0 38px rgba(239,68,68,0.55)';

            return (
              <article
                key={m.key}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedKey(m.key)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedKey(m.key)}
                className={`relative w-[260px] shrink-0 snap-center rounded-3xl border p-3 text-left backdrop-blur-lg transition md:w-[290px] md:p-4 ${
                  active ? 'scale-105 border-white/60 bg-white/10' : 'border-white/20 bg-black/40'
                }`}
                style={{ boxShadow: glow }}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">{m.name}</p>
                <p className="mt-1 text-2xl font-black text-white md:text-3xl">{m.price}</p>
                <p className="mt-2 text-xs text-white/70">Top Chase: PSA 10 Kobe Bryant</p>
                <p className="text-xs text-white/70">Odds: 1:22 Legendary</p>
                <p className="text-xs text-white/70">Remaining: 1,204 packs</p>

                <Image src={m.machine} alt={m.name} width={280} height={360} className="mx-auto mt-3 h-[230px] w-auto object-contain md:h-[260px]" />
                <Image src={m.pack} alt={`${m.name} pack`} width={84} height={112} className="absolute bottom-4 right-2 md:bottom-5 md:right-3 md:h-[124px] md:w-[92px]" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openOverlay(m.key);
                  }}
                  className="mt-3 inline-block rounded-full border border-amber-300/80 bg-amber-500/30 px-3 py-1 text-xs font-semibold transition hover:scale-[1.03] active:scale-[0.98]"
                >
                  INSERT COIN
                </button>
              </article>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-amber-300/80 bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-4 text-sm font-black tracking-[0.18em] text-black transition hover:scale-[1.03] active:scale-[0.98] md:px-10 md:text-base md:tracking-[0.2em]"
          >
            START PULLING NOW
          </button>

          <div className="grid w-full max-w-5xl gap-2 text-center text-xs md:grid-cols-4">
            {trust.map((item) => (
              <p key={item} className="rounded-full border border-white/20 bg-black/40 px-3 py-2">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <Image
        src="/assets/smoke-overlay.png"
        alt="Smoke"
        width={1600}
        height={420}
        className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-auto w-full max-w-[1600px] -translate-x-1/2 opacity-10 md:opacity-20"
      />

      <PullAnimationOverlay open={open} machine={selectedMachine} onClose={() => setOpen(false)} />
    </section>
  );
}