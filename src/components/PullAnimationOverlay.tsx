'use client';

import Image from 'next/image';

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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-white/20 bg-[#080f22]/95 p-6 text-center">
          <p className="text-xs tracking-[0.2em] text-white/60">PULL OVERLAY</p>
          <p className="mt-1 text-lg font-bold text-amber-300">{machine.name}</p>

          <Image src={machine.machine} alt={machine.name} width={220} height={280} className="mx-auto mt-4" />
          <Image src={machine.pack} alt={`${machine.name} pack`} width={140} height={200} className="mx-auto mt-2" />

          <div className="mt-4 rounded-2xl border border-amber-300/40 bg-black/45 p-4">
            <p className="text-xs tracking-[0.2em] text-white/70">YOU PULLED</p>
            <p className="mt-1 text-xl font-black text-amber-300">PSA 10 KOBE BRYANT</p>
            <p className="text-sm text-orange-300">Tier: Legendary</p>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <button className="rounded-full bg-amber-400 px-3 py-2 text-xs font-bold text-black">Add to Collection</button>
            <button className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold">Pull Again</button>
            <button onClick={onClose} className="rounded-full border border-white/30 px-3 py-2 text-xs font-bold">Back to Arcade</button>
          </div>
        </div>
      </div>
    </div>
  );
}