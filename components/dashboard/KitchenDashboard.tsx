"use client";

import { startTransition, useEffect, useState } from "react";
import {
  ChefHat,
  Moon,
  Sparkle,
  Sun,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { CookingHistory } from "./CookingHistory";
import { InventoryList } from "./InventoryList";
import { MenuSuggestion } from "./MenuSuggestion";
import { recipeLibrary, type RecipeLibraryItem, type RecipeTone } from "@/lib/recipe-library";

type FridgeUnit = "kgs" | "items";

type InventoryItem = {
  id: string;
  name: string;
  icon: "leaf" | "cube" | "egg" | "drumstick" | "tomato" | "onion" | "chili" | "potato";
  enabled: boolean;
  quantity: number;
  unit: FridgeUnit;
  aliases: readonly string[];
};

type CookingHistoryItem = {
  title: string;
  description: string;
  cookedAt: number;
  icon: "broccoli" | "bowl" | "cube";
};

const initialInventoryItems: InventoryItem[] = [
  {
    id: "spinach",
    name: "Spinach (fresh)",
    icon: "leaf",
    enabled: true,
    quantity: 1.5,
    unit: "kgs",
    aliases: ["spinach", "palak"],
  },
  {
    id: "paneer",
    name: "Paneer",
    icon: "cube",
    enabled: true,
    quantity: 0.75,
    unit: "kgs",
    aliases: ["paneer"],
  },
  {
    id: "eggs",
    name: "Eggs",
    icon: "egg",
    enabled: true,
    quantity: 12,
    unit: "items",
    aliases: ["egg", "eggs"],
  },
  {
    id: "chicken",
    name: "Chicken Breast",
    icon: "drumstick",
    enabled: true,
    quantity: 1.25,
    unit: "kgs",
    aliases: ["chicken", "chicken breast"],
  },
  {
    id: "tomatoes",
    name: "Tomatoes",
    icon: "tomato",
    enabled: true,
    quantity: 6,
    unit: "items",
    aliases: ["tomato", "tomatoes"],
  },
  {
    id: "onions",
    name: "Onions",
    icon: "onion",
    enabled: true,
    quantity: 8,
    unit: "items",
    aliases: ["onion", "onions"],
  },
  {
    id: "green-chillies",
    name: "Green Chillies",
    icon: "chili",
    enabled: true,
    quantity: 10,
    unit: "items",
    aliases: ["chilli", "chillies", "chili", "chilies", "green chilli", "green chillies"],
  },
  {
    id: "potatoes",
    name: "Potatoes",
    icon: "potato",
    enabled: true,
    quantity: 2.5,
    unit: "kgs",
    aliases: ["potato", "potatoes"],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
    },
  },
};

const normalize = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const hashString = (value: string) =>
  Array.from(value).reduce((hash, character) => {
    return (hash * 31 + character.charCodeAt(0)) % 10007;
  }, 7);

function readStoredValue<T>(key: string, fallback: T) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

function scoreMeal(
  meal: RecipeLibraryItem,
  inventory: InventoryItem[],
  refreshSeed: number,
) {
  const availableAliases = inventory
    .filter((item) => item.enabled)
    .flatMap((item) => item.aliases.map((alias) => normalize(alias)));

  const matchedIngredients = meal.ingredients.filter((ingredient) =>
    availableAliases.includes(normalize(ingredient)),
  );
  const missingIngredients = meal.ingredients.length - matchedIngredients.length;
  const score = Math.round((matchedIngredients.length / meal.ingredients.length) * 100);
  const tieBreaker = (hashString(meal.title) + refreshSeed) % 1000;

  return {
    score,
    missingIngredients,
    matchedIngredients,
    tieBreaker,
  };
}

export function KitchenDashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventoryItems);
  const [savedMeals, setSavedMeals] = useState<string[]>([]);
  const [history, setHistory] = useState<CookingHistoryItem[]>([]);
  const [refreshSeed, setRefreshSeed] = useState(0);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [notice, setNotice] = useState("");
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setInventory(readStoredValue("aaj-kya-banega:inventory", initialInventoryItems));
      setSavedMeals(readStoredValue("aaj-kya-banega:saved-meals", []));
      setHistory(readStoredValue("aaj-kya-banega:history", []));
      setTheme(readStoredValue("aaj-kya-banega:theme", "dark"));
      setStorageReady(true);
    });
  }, []);

  useEffect(() => { if (storageReady) window.localStorage.setItem("aaj-kya-banega:inventory", JSON.stringify(inventory)); }, [inventory, storageReady]);
  useEffect(() => { if (storageReady) window.localStorage.setItem("aaj-kya-banega:saved-meals", JSON.stringify(savedMeals)); }, [savedMeals, storageReady]);
  useEffect(() => { if (storageReady) window.localStorage.setItem("aaj-kya-banega:history", JSON.stringify(history)); }, [history, storageReady]);
  useEffect(() => { if (storageReady) window.localStorage.setItem("aaj-kya-banega:theme", theme); }, [theme, storageReady]);
  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3400);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const toggleInventoryItem = (id: string) => {
    setInventory((current) =>
      current.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  const addInventoryItem = (entry: {
    name: string;
    quantity: number;
    unit: FridgeUnit;
  }) => {
    const normalizedName = normalize(entry.name);
    const id = normalizedName.replace(/\s+/g, "-");

    setInventory((current) => {
      const existingItem = current.find(
        (item) =>
          item.id === id ||
          item.aliases.some((alias) => normalize(alias) === normalizedName),
      );

      if (existingItem) {
        return current.map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                enabled: true,
                quantity: Number((item.quantity + entry.quantity).toFixed(1)),
                unit: entry.unit,
              }
            : item,
        );
      }

      return [
        {
          id,
          name: entry.name,
          icon: "leaf",
          enabled: true,
          quantity: entry.quantity,
          unit: entry.unit,
          aliases: [normalizedName],
        },
        ...current,
      ];
    });
  };

  const refreshSuggestions = () => {
    setRefreshSeed((value) => value + 1);
    setLastRefreshedAt(new Date());
  };

  const resetInventory = () => {
    setInventory(initialInventoryItems);
    setSavedMeals([]);
    setRefreshSeed(0);
    setLastRefreshedAt(null);
    setNotice("Your starter fridge has been restored.");
  };

  const toggleSavedMeal = (title: string) => {
    setSavedMeals((current) =>
      current.includes(title)
        ? current.filter((savedTitle) => savedTitle !== title)
        : [...current, title],
    );
  };

  const removeInventoryItem = (id: string) => {
    setInventory((current) => current.filter((item) => item.id !== id));
    setNotice("Item removed from your fridge.");
  };

  const cookMeal = (meal: RecipeLibraryItem) => {
    setHistory((current) => [
      {
        title: meal.title,
        description: meal.description,
        cookedAt: Date.now(),
        icon: "bowl" as const,
      },
      ...current.filter((item) => item.title !== meal.title),
    ]);
    setNotice(`${meal.title} was added to your cooking history.`);
  };

  const clearHistory = () => {
    setHistory([]);
    setNotice("Cooking history cleared.");
  };

  const suggestionGroupsWithLogic = Array.from(
    recipeLibrary.reduce((groups, recipe) => {
      const existing = groups.get(recipe.collection);

      if (existing) {
        existing.meals.push(recipe);
      } else {
        groups.set(recipe.collection, {
          label: recipe.collection,
          suffix: recipe.collectionSuffix,
          meals: [recipe],
        });
      }

      return groups;
    }, new Map<string, { label: string; suffix?: string; meals: RecipeLibraryItem[] }>()),
  )
    .map(([, group]) => {
      const meals = group.meals
      .map((meal) => {
        const scoreDetails = scoreMeal(meal, inventory, refreshSeed);
        const matchTone: RecipeTone =
          scoreDetails.score >= 90
            ? "green"
            : scoreDetails.score >= 70
              ? "amber"
              : "orange";
        const stockTone: RecipeTone =
          scoreDetails.missingIngredients === 0 ? "green" : "neutral";

        return {
          meal: {
            ...meal,
            badges: [
              ...meal.badges,
              {
                label:
                  scoreDetails.score >= 90
                    ? "High Match"
                    : scoreDetails.score >= 70
                      ? "Good Fit"
                      : "Needs Shopping",
                tone: matchTone,
              },
              {
                label:
                  scoreDetails.missingIngredients === 0
                    ? "Fully Stocked"
                    : `${scoreDetails.missingIngredients} Missing`,
                tone: stockTone,
              },
            ],
            match: `${scoreDetails.score}%`,
          },
          sortScore: scoreDetails.score,
          sortTieBreaker: scoreDetails.tieBreaker,
        };
      })
      .sort((left, right) => {
        if (right.sortScore !== left.sortScore) {
          return right.sortScore - left.sortScore;
        }

        return left.sortTieBreaker - right.sortTieBreaker;
      })
      .map(({ meal }) => meal);

      return {
        ...group,
        meals,
      };
    })
    .filter((group) => group.meals.length > 0);

  const refreshedLabel = lastRefreshedAt?.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  }) ?? "ready";

  return (
    <main data-theme={theme} className="app-shell min-h-[100dvh] text-zinc-100">
      <div className="mx-auto flex min-h-[100dvh] max-w-[1600px] flex-col gap-7 px-5 py-5 md:px-7 md:py-6">
        <motion.header
          variants={item}
          initial="hidden"
          animate="show"
          className="panel-surface flex items-center justify-between rounded-[18px] px-6 py-5 md:px-7"
        >
          <div className="flex min-w-0 items-center gap-4 md:gap-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/8 bg-white/[0.02]">
              <ChefHat size={24} weight="thin" className="text-zinc-100" />
            </div>
            <div className="flex min-w-0 flex-col gap-1 md:flex-row md:items-center md:gap-6">
              <h1 className="text-[1.05rem] font-medium uppercase tracking-[0.16em] text-zinc-100 md:text-[1.15rem]">
                Aaj Kya Banega
              </h1>
              <p className="text-[0.72rem] uppercase tracking-[0.22em] text-zinc-500 md:text-[0.78rem]">
                Your kitchen companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button type="button" onClick={() => setTheme((value) => value === "dark" ? "light" : "dark")} aria-label={`Use ${theme === "dark" ? "light" : "dark"} theme`} className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--line-strong)] bg-[var(--surface-raised)] text-zinc-300 transition hover:text-zinc-100 active:translate-y-px">
              {theme === "dark" ? <Sun size={19} weight="thin" /> : <Moon size={19} weight="thin" />}
            </button>
          </div>
        </motion.header>

        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="grid flex-1 gap-5 xl:grid-cols-[0.94fr_1.86fr_1fr]"
        >
          <motion.div variants={item} className="min-h-full">
            <InventoryList
              items={inventory}
              onToggleItem={toggleInventoryItem}
              onAddItem={addInventoryItem}
              onResetInventory={resetInventory}
              onRemoveItem={removeInventoryItem}
            />
          </motion.div>

          <motion.div variants={item} className="min-h-full">
            <MenuSuggestion
              groups={suggestionGroupsWithLogic}
              onRefresh={refreshSuggestions}
              refreshedLabel={refreshedLabel}
              savedMeals={savedMeals}
              onToggleBookmark={toggleSavedMeal}
              onCookMeal={cookMeal}
            />
          </motion.div>

          <motion.div variants={item} className="min-h-full">
            <CookingHistory items={history} onClearHistory={clearHistory} />
          </motion.div>
        </motion.section>

        <motion.footer
          variants={item}
          initial="hidden"
          animate="show"
          className="panel-surface flex flex-col gap-4 rounded-[18px] px-6 py-5 md:flex-row md:items-center md:justify-between md:px-7"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/[0.03]">
              <Sparkle size={18} weight="thin" className="text-zinc-200" />
            </div>
            <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6">
              <span className="text-sm font-medium text-zinc-200">Tip of the day</span>
              <span className="hidden h-6 w-px bg-white/8 md:block" />
              <p className="text-sm text-zinc-500">
                Plan meals ahead to reduce waste and save time.
              </p>
            </div>
          </div>

          <p className="text-sm text-zinc-500">Changes are saved in this browser.</p>
        </motion.footer>
      </div>
      {notice ? <div role="status" className="fixed bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-xl border border-[var(--line-strong)] bg-[var(--surface-raised)] px-5 py-3 text-sm text-zinc-100 shadow-xl">{notice}</div> : null}
    </main>
  );
}
