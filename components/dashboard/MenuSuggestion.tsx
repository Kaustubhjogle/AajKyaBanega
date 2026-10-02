"use client";

import { useState } from "react";
import {
  ArrowsClockwise,
  BookmarkSimple,
  CalendarBlank,
  ClockCountdown,
  Sparkle,
  BowlFood,
  CookingPot,
  ForkKnife,
  CheckCircle,
  CaretDown,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import type { RecipeLibraryItem } from "@/lib/recipe-library";

type BadgeTone = "green" | "amber" | "orange" | "neutral";

type RecipeDisplayItem = RecipeLibraryItem & { match: string };

type SuggestionGroup = {
  label: string;
  suffix?: string;
  meals: readonly RecipeDisplayItem[];
};

const badgeToneClass: Record<BadgeTone, string> = {
  green: "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/10",
  amber: "bg-amber-400/10 text-amber-200 ring-1 ring-amber-300/10",
  orange: "bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/10",
  neutral: "bg-white/[0.06] text-zinc-200 ring-1 ring-white/6",
};

const mealIconMap = {
  bowl: BowlFood,
  pan: CookingPot,
  wok: ForkKnife,
} satisfies Record<SuggestionGroup["meals"][number]["icon"], React.ComponentType<{ size?: number; weight?: "thin"; className?: string }>>;

export function MenuSuggestion({
  groups,
  onRefresh,
  refreshedLabel,
  savedMeals,
  onToggleBookmark,
  onCookMeal,
}: {
  groups: readonly SuggestionGroup[];
  onRefresh: () => void;
  refreshedLabel: string;
  savedMeals: readonly string[];
  onToggleBookmark: (title: string) => void;
  onCookMeal: (meal: RecipeDisplayItem) => void;
}) {
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);
  return (
    <section className="panel-surface flex h-full flex-col rounded-[18px]">
      <div className="flex flex-col gap-5 px-6 py-7 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <Sparkle size={24} weight="thin" className="mt-1 text-zinc-200" />
          <div>
            <h2 className="text-[1.02rem] font-medium uppercase tracking-[0.12em] text-zinc-100">
              Recipe Library
            </h2>
            <p className="mt-2 text-lg text-zinc-500">
              Pick a recipe, check the method, and log it when dinner is done.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-3 self-start rounded-[14px] border border-white/8 bg-white/[0.03] px-5 py-4 text-base text-zinc-100 transition-colors hover:bg-white/[0.05]"
          >
            <ArrowsClockwise size={18} weight="thin" className="text-zinc-300" />
            Refresh
          </button>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Updated {refreshedLabel}
          </p>
        </div>
      </div>

      {groups.map((group, groupIndex) => (
        <div key={group.label} className={groupIndex > 0 ? "border-t border-white/6" : "border-t border-white/6"}>
          <div className="flex items-center gap-3 px-6 py-6 text-zinc-400">
            <CalendarBlank size={18} weight="thin" />
            <p className="text-[0.95rem] uppercase tracking-[0.12em] text-zinc-200">
              {group.label}
              {group.suffix ? (
                <span className="ml-2 text-zinc-500">{group.suffix}</span>
              ) : null}
            </p>
          </div>

          <div className="grid gap-4 px-6 pb-6 md:grid-cols-2">
            {group.meals.map((meal, mealIndex) => {
              const MealIcon = mealIconMap[meal.icon];

              return (
                <motion.article
                  key={meal.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.12 + groupIndex * 0.08 + mealIndex * 0.05,
                    duration: 0.45,
                  }}
                  whileHover={{ y: -3 }}
                  className="rounded-[16px] border border-white/7 bg-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                  >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/[0.03]">
                        <MealIcon size={28} weight="thin" className="text-zinc-100" />
                      </div>
                      <h3 className="text-[1.05rem] font-medium leading-6 text-zinc-100 md:text-[1.1rem]">{meal.title}</h3>
                    </div>

                    <button
                      type="button"
                      aria-pressed={savedMeals.includes(meal.title)}
                      aria-label={`${savedMeals.includes(meal.title) ? "Remove" : "Save"} ${meal.title}`}
                      onClick={() => onToggleBookmark(meal.title)}
                      className="text-zinc-400 transition-colors hover:text-zinc-200"
                    >
                      <BookmarkSimple
                        size={20}
                        weight={savedMeals.includes(meal.title) ? "fill" : "thin"}
                        className={savedMeals.includes(meal.title) ? "text-emerald-300" : ""}
                      />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {meal.badges.map((badge) => (
                      <span key={badge.label} className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeToneClass[badge.tone]}`}>
                        {badge.label}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 max-w-[32ch] text-[1.02rem] leading-8 text-zinc-300/90">
                    {meal.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {meal.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="rounded-full border border-white/7 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.12em] text-zinc-400"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 h-px bg-[var(--line)]" />

                  <div className="mt-5 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-zinc-500">Prep Time</p>
                      <p className="mt-2 text-base text-zinc-100">{meal.prepTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">Servings</p>
                      <p className="mt-2 text-base text-zinc-100">{meal.servings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-500">Ingredients Match</p>
                      <p className="mt-2 text-[1.1rem] text-emerald-400">{meal.match}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      aria-expanded={expandedRecipe === meal.id}
                      onClick={() => setExpandedRecipe((current) => current === meal.id ? null : meal.id)}
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--line-strong)] px-4 py-2.5 text-sm font-medium text-zinc-100 transition hover:bg-white/[0.05] active:translate-y-px"
                    >
                      {expandedRecipe === meal.id ? "Hide method" : "View method"}
                      <CaretDown size={15} weight="bold" className={expandedRecipe === meal.id ? "rotate-180 transition-transform" : "transition-transform"} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onCookMeal(meal)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-110 active:translate-y-px"
                    >
                      <CheckCircle size={17} weight="bold" />
                      Cook this
                    </button>
                  </div>

                  {expandedRecipe === meal.id ? (
                    <ol className="mt-5 space-y-3 border-t border-[var(--line)] pt-5">
                      {meal.steps.map((step, stepIndex) => (
                        <li key={step} className="grid grid-cols-[24px_1fr] gap-3 text-sm leading-6 text-zinc-300">
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--accent-soft)] text-xs font-semibold text-[var(--accent-light)]">{stepIndex + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-auto flex items-center justify-center gap-3 border-t border-white/6 px-6 py-5 text-zinc-500">
        <ClockCountdown size={17} weight="thin" />
        <p className="text-sm">Suggestions improve the more you cook. Keep tracking!</p>
      </div>
    </section>
  );
}
