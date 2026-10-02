"use client";

import { useState } from "react";
import {
  Acorn,
  Cube,
  DotsThree,
  Egg,
  FlowerTulip,
  Leaf,
  Orange,
  Pepper,
  Trash,
  Shrimp,
  SidebarSimple,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

type InventoryItem = {
  id: string;
  name: string;
  icon: "leaf" | "cube" | "egg" | "drumstick" | "tomato" | "onion" | "chili" | "potato";
  enabled: boolean;
  quantity: number;
  unit: "kgs" | "items";
};

const iconMap = {
  leaf: Leaf,
  cube: Cube,
  egg: Egg,
  drumstick: Shrimp,
  tomato: Orange,
  onion: FlowerTulip,
  chili: Pepper,
  potato: Acorn,
} satisfies Record<InventoryItem["icon"], React.ComponentType<{ size?: number; weight?: "thin" | "regular"; className?: string }>>;

function formatQuantity(quantity: number, unit: InventoryItem["unit"]) {
  const displayQuantity = Number.isInteger(quantity)
    ? quantity.toString()
    : quantity.toFixed(1).replace(/\.0$/, "");

  return `${displayQuantity} ${unit}`;
}

export function InventoryList({
  items,
  onToggleItem,
  onAddItem,
  onResetInventory,
  onRemoveItem,
}: {
  items: readonly InventoryItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (entry: { name: string; quantity: number; unit: InventoryItem["unit"] }) => void;
  onResetInventory: () => void;
  onRemoveItem: (id: string) => void;
}) {
  const [itemChoice, setItemChoice] = useState("");
  const [customName, setCustomName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState<InventoryItem["unit"]>("items");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = (itemChoice === "custom" ? customName : itemChoice).trim();
    const parsedQuantity = Number(quantity);

    if (!trimmedName || !Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      setError("Add an item and a quantity greater than zero.");
      return;
    }

    onAddItem({
      name: trimmedName,
      quantity: parsedQuantity,
      unit,
    });

    setItemChoice("");
    setCustomName("");
    setQuantity("1");
    setUnit("items");
    setError("");
  };

  return (
    <section className="panel-surface flex h-full flex-col rounded-[18px]">
      <div className="flex items-center justify-between px-6 py-7">
        <div className="flex items-center gap-4">
          <SidebarSimple size={22} weight="thin" className="text-zinc-300" />
          <div>
            <h2 className="text-[1.02rem] font-medium uppercase tracking-[0.12em] text-zinc-100">
              Available in Fridge
            </h2>
          </div>
        </div>
        <button
          type="button"
          title="Restore starter fridge"
          aria-label="Restore starter fridge"
          onClick={onResetInventory}
          className="text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <DotsThree size={18} weight="bold" />
        </button>
      </div>

      <div className="mx-6 h-px bg-white/6" />

      <form onSubmit={handleSubmit} className="border-b border-[var(--line)] px-6 py-6">
        <p className="mb-4 text-[0.8rem] uppercase tracking-[0.16em] text-zinc-500">
          Quick Add
        </p>

        <div className="grid grid-cols-2 gap-3">
          <label className="col-span-2 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.14em] text-zinc-500">
              Item
            </span>
            <select
              aria-label="Choose an item to add"
              value={itemChoice}
              onChange={(event) => { setItemChoice(event.target.value); setError(""); }}
              className="h-11 w-full rounded-[12px] border border-white/8 bg-white/[0.02] px-4 text-base text-zinc-200 outline-none"
            >
              <option value="" disabled>Choose an item</option>
              <option value="Spinach">Spinach</option>
              <option value="Paneer">Paneer</option>
              <option value="Eggs">Eggs</option>
              <option value="Chicken Breast">Chicken breast</option>
              <option value="Tomatoes">Tomatoes</option>
              <option value="Onions">Onions</option>
              <option value="Potatoes">Potatoes</option>
              <option value="Green Chillies">Green chillies</option>
              <option value="custom">Add a custom item</option>
            </select>
          </label>

          {itemChoice === "custom" ? <label className="col-span-2 flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.14em] text-zinc-500">Custom item</span>
            <input
              aria-label="Custom item name"
              value={customName}
              onChange={(event) => { setCustomName(event.target.value); setError(""); }}
              placeholder="For example, coriander"
              className="h-11 rounded-[12px] border border-white/8 bg-white/[0.02] px-4 text-base text-zinc-200 outline-none placeholder:text-zinc-600"
            />
          </label> : null}

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.14em] text-zinc-500">
              Quantity
            </span>
            <input
              aria-label="Add item quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              inputMode="decimal"
              min="0"
              step="0.1"
              type="number"
              className="h-11 rounded-[12px] border border-white/8 bg-white/[0.02] px-4 text-base text-zinc-200 outline-none placeholder:text-zinc-600"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-[0.14em] text-zinc-500">
              Unit
            </span>
            <select
              aria-label="Add item unit"
              value={unit}
              onChange={(event) => setUnit(event.target.value as InventoryItem["unit"])}
              className="h-11 rounded-[12px] border border-white/8 bg-white/[0.02] px-4 text-base text-zinc-200 outline-none"
            >
              <option value="items">items</option>
              <option value="kgs">kgs</option>
            </select>
          </label>

          <button
            type="submit"
            className="col-span-2 flex h-11 items-center justify-center rounded-[12px] bg-[var(--accent)] px-5 text-base font-medium text-white transition hover:brightness-110 active:translate-y-px"
          >
            Add
          </button>
        </div>
        {error ? <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p> : null}
      </form>

      <div className="flex-1 px-6">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + index * 0.04, duration: 0.4 }}
              whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.02)" }}
              className={`group flex items-center justify-between border-b border-[var(--line)] py-5 ${item.enabled ? "" : "opacity-55"}`}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-white/[0.02]">
                  <Icon size={24} weight="thin" className="text-zinc-200" />
                </div>
                <div>
                  <span className="block text-[1.03rem] text-zinc-100">{item.name}</span>
                  <span className="mt-1 block text-sm text-zinc-500">
                    {formatQuantity(item.quantity, item.unit)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button type="button" aria-label={`Remove ${item.name}`} onClick={() => onRemoveItem(item.id)} className="grid h-8 w-8 place-items-center rounded-lg text-zinc-500 opacity-0 transition hover:text-rose-300 group-hover:opacity-100 focus:opacity-100">
                  <Trash size={16} weight="thin" />
                </button>
                <button
                  type="button"
                  aria-pressed={item.enabled}
                  aria-label={`${item.enabled ? "Disable" : "Enable"} ${item.name}`}
                  onClick={() => onToggleItem(item.id)}
                  className={`relative h-8 w-12 rounded-full border transition-colors ${item.enabled ? "border-emerald-400/20 bg-emerald-500/15" : "border-white/10 bg-white/[0.04]"}`}
                >
                  <span className={`absolute top-1 h-6 w-6 rounded-full transition-all ${item.enabled ? "left-[20px] bg-emerald-400" : "left-1 bg-zinc-500"}`} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
