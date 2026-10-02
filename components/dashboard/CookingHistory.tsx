"use client";

import { useState } from "react";
import {
  ArrowRight,
  BowlSteam,
  Broom,
  ClockCounterClockwise,
  Cube,
  FlowerTulip,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

type HistoryItem = {
  title: string;
  description: string;
  cookedAt: number;
  icon: "broccoli" | "bowl" | "cube";
};

const iconMap = {
  broccoli: FlowerTulip,
  bowl: BowlSteam,
  cube: Cube,
} satisfies Record<HistoryItem["icon"], React.ComponentType<{ size?: number; weight?: "thin"; className?: string }>>;

function formatCookedDate(timestamp: number) {
  const elapsedDays = Math.floor((Date.now() - timestamp) / 86_400_000);
  if (elapsedDays <= 0) return "Today";
  if (elapsedDays === 1) return "Yesterday";
  return `${elapsedDays} days ago`;
}

export function CookingHistory({ items, onClearHistory }: { items: readonly HistoryItem[]; onClearHistory: () => void }) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, 3);

  return (
    <section className="panel-surface flex h-full flex-col rounded-[18px] px-6 py-7">
      <div className="flex items-center gap-4">
        <ClockCounterClockwise size={24} weight="thin" className="text-zinc-300" />
        <h2 className="text-[1.02rem] font-medium uppercase tracking-[0.12em] text-zinc-100">
          Recently Cooked Tracker
        </h2>
      </div>

      <div className="mt-7 h-px bg-white/6" />

      <div className="relative flex-1 py-8">
        {visibleItems.length > 1 ? <div className="absolute left-[31px] top-[74px] bottom-[104px] w-px bg-white/8" /> : null}

        {visibleItems.length === 0 ? (
          <div className="grid min-h-56 place-items-center rounded-2xl border border-dashed border-[var(--line-strong)] px-6 text-center">
            <div>
              <BowlSteam size={30} weight="thin" className="mx-auto text-[var(--accent-light)]" />
              <p className="mt-4 font-medium text-zinc-100">No meals logged yet</p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">Choose a recipe and select “Cook this” to build your history.</p>
            </div>
          </div>
        ) : <div className="space-y-8">
          {visibleItems.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + index * 0.07, duration: 0.45 }}
                className="grid grid-cols-[62px_1fr_auto] gap-4"
              >
                <div className="relative z-10 flex h-[62px] w-[62px] items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--surface-raised)] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                  <Icon size={28} weight="thin" className="text-zinc-100" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[1.02rem] font-medium text-zinc-100 md:text-[1.08rem]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[22ch] text-[1rem] leading-8 text-zinc-400">
                    {item.description}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[0.98rem] text-zinc-300">{formatCookedDate(item.cookedAt)}</p>
                  <p className="mt-2 text-[0.92rem] text-zinc-500">{new Date(item.cookedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</p>
                </div>
              </motion.article>
            );
          })}
        </div>}
      </div>

      {items.length > 0 ? <div className="mt-auto flex gap-3">
        {items.length > 3 ? <button type="button" onClick={() => setShowAll((value) => !value)} className="inline-flex flex-1 items-center justify-center gap-3 rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 transition-colors hover:bg-white/[0.05]">
          {showAll ? "Show less" : "View all"}
          <ArrowRight size={17} weight="thin" className={`text-zinc-300 transition-transform ${showAll ? "rotate-180" : ""}`} />
        </button> : null}
        <button type="button" onClick={onClearHistory} className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-white/8 px-4 py-3 text-sm text-zinc-400 transition hover:border-rose-400/30 hover:text-rose-200">
          <Broom size={17} weight="thin" /> Clear
        </button>
      </div> : null}
    </section>
  );
}
