'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export type PullMachine = {
  key: 'rookie' | 'pro' | 'allstar';
  name: string;
  price: string;
  machine: string;
  pack: string;
};

type Props = {
  open: boolean;
  machine: PullMachine;
  onClose: () => void;
};

export default function PullAnimationOverlay({ open, machine, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo('.ov-bg', { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo('.ov-machine', { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35 }, '-=0.15')
        .fromTo('.ov-coin', { x: 220, y: 160, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.45 })
        .to('.ov-machine', { x: -7, repeat: 3, yoyo: true, duration: 0.08 })
        .fromTo('.ov-pack', { y: -24, opacity: 0 }, { y: 70, opacity: 1, duration: 0.3 })
        .to('.ov-pack', {
          scale: 1.16,
          filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.95))',
          duration: 0.35,
        })
        .fromTo('.ov-result', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.35 });
    }, rootRef);

    return () => ctx.revert();
  }, [open, machine.key]);

  if (!open) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100]">
      <div className="ov-bg absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-[#080f22]/95 p-6 text-center">
          <button onClick={onClose} className="absolute right-3 top-3 rounded-full border border-white/30 px-2 py-1 text-xs">
            CLOSE
          </button>

          <p className="text-xs tracking-[0.2em] text-white/60">PULL SEQUENCE</p>
          <p className="mt-1 text-lg font-bold text-amber-300">{machine.name}</p>

          <Image className="ov-machine mx-auto mt-2" src={machine.machine} alt={machine.name} width={220} height={280} />
          <Image className="ov-coin absolute right-[18%] top-[42%]" src="/assets/coin.png" alt="Coin" width={56} height={56} />
          <Image className="ov-pack mx-auto" src={machine.pack} alt={`${machine.name} pack`} width={140} height={200} />

          <div className="ov-result mt-4 rounded-2xl border border-amber-300/40 bg-black/45 p-4">
            <p className="text-xs tracking-[0.2em] text-white/70">YOU PULLED</p>
            <p className="mt-1 text-xl font-black text-amber-300">PSA 10 KOBE BRYANT</p>
            <p className="text-sm text-orange-300">Tier: Legendary</p>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button className="rounded-full bg-amber-400 px-3 py-2 text-xs font-bold text-black">Add to Collection</button>
              <button className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold">Pull Again</button>
              <button onClick={onClose} className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold">Back to Arcade</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}