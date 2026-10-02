export type RecipeTone = "green" | "amber" | "orange" | "neutral";

export type RecipeLibraryItem = {
  id: string;
  collection: string;
  collectionSuffix?: string;
  title: string;
  description: string;
  icon: "bowl" | "pan" | "wok";
  ingredients: readonly string[];
  badges: readonly { label: string; tone: RecipeTone }[];
  prepTime: string;
  servings: string;
  steps: readonly string[];
};

export const recipeLibrary: readonly RecipeLibraryItem[] = [
  {
    id: "palak-paneer-roti",
    collection: "Tomorrow",
    collectionSuffix: "(Maid's Menu)",
    title: "Palak Paneer & Roti",
    description:
      "Classic and nutritious. Uses spinach, paneer, onions and everyday spices.",
    icon: "bowl",
    ingredients: ["spinach", "paneer", "onion", "garlic", "ginger"],
    badges: [
      { label: "Vegetarian", tone: "green" },
      { label: "High Protein", tone: "amber" },
    ],
    prepTime: "25 min",
    servings: "Serves 2",
    steps: [
      "Blanch and puree the spinach.",
      "Cook onions, ginger and garlic with spices.",
      "Fold in paneer and finish with roti.",
    ],
  },
  {
    id: "egg-bhurji-roti",
    collection: "Tomorrow",
    collectionSuffix: "(Maid's Menu)",
    title: "Egg Bhurji & Roti",
    description: "Simple, protein-rich and quick to prepare.",
    icon: "pan",
    ingredients: ["egg", "onion", "tomato", "green chilli"],
    badges: [
      { label: "High Protein", tone: "amber" },
      { label: "Quick", tone: "neutral" },
    ],
    prepTime: "15 min",
    servings: "Serves 2",
    steps: [
      "Sauté onions, tomatoes and chillies.",
      "Add beaten eggs and scramble gently.",
      "Serve hot with roti or toast.",
    ],
  },
  {
    id: "fridge-omelette",
    collection: "Tomorrow",
    collectionSuffix: "(Maid's Menu)",
    title: "From-the-Fridge Omelette",
    description: "Fast breakfast using eggs, herbs and whatever vegetables are left.",
    icon: "pan",
    ingredients: ["egg", "onion", "tomato", "milk", "green chilli"],
    badges: [
      { label: "Breakfast", tone: "green" },
      { label: "Zero Waste", tone: "neutral" },
    ],
    prepTime: "10 min",
    servings: "Serves 1",
    steps: [
      "Whisk the eggs with salt and a splash of milk.",
      "Fold in chopped vegetables and chillies.",
      "Cook on a hot pan until just set.",
    ],
  },
  {
    id: "saag-paneer",
    collection: "Paneer & Greens",
    title: "Saag Paneer",
    description: "A spinach-heavy paneer curry with garlic, ginger and warm spices.",
    icon: "bowl",
    ingredients: ["spinach", "paneer", "onion", "garlic", "ginger", "green chilli"],
    badges: [
      { label: "Vegetarian", tone: "green" },
      { label: "High Match", tone: "amber" },
    ],
    prepTime: "30 min",
    servings: "Serves 4",
    steps: [
      "Cook spinach until wilted and blend to a coarse puree.",
      "Build the masala with onion, garlic and ginger.",
      "Add paneer cubes and finish with lemon juice.",
    ],
  },
  {
    id: "paneer-makhani",
    collection: "Paneer & Greens",
    title: "Paneer Makhani",
    description: "Creamy tomato paneer curry with a rich, buttery finish.",
    icon: "bowl",
    ingredients: ["paneer", "tomato", "ginger", "garlic", "cashew", "butter"],
    badges: [
      { label: "Dinner", tone: "amber" },
      { label: "Crowd Pleaser", tone: "neutral" },
    ],
    prepTime: "45 min",
    servings: "Serves 4",
    steps: [
      "Cook tomatoes, ginger, garlic and cashews into a smooth base.",
      "Add spices and butter for a rich sauce.",
      "Fold in paneer and simmer briefly before serving.",
    ],
  },
  {
    id: "chicken-stir-fry",
    collection: "Chicken Dinner",
    title: "Chicken Stir-fry",
    description: "Light, flavorful and packed with protein.",
    icon: "wok",
    ingredients: ["chicken", "onion", "tomato", "green chilli"],
    badges: [
      { label: "Non-Veg", tone: "orange" },
      { label: "High Protein", tone: "amber" },
    ],
    prepTime: "30 min",
    servings: "Serves 2",
    steps: [
      "Marinate chicken with salt and spices.",
      "Stir-fry with onions, tomatoes and chillies.",
      "Finish on high heat for a glossy coating.",
    ],
  },
  {
    id: "easy-chicken-curry",
    collection: "Chicken Dinner",
    title: "Easy Chicken Curry",
    description: "A family-style curry with onion, ginger, tomatoes and yogurt.",
    icon: "bowl",
    ingredients: ["chicken", "onion", "garlic", "ginger", "tomato", "yogurt"],
    badges: [
      { label: "Family Dinner", tone: "orange" },
      { label: "Comforting", tone: "neutral" },
    ],
    prepTime: "45 min",
    servings: "Serves 4",
    steps: [
      "Brown the onion, then add ginger and garlic.",
      "Add chicken, spices and tomatoes, then simmer.",
      "Stir in yogurt at the end and serve with rice.",
    ],
  },
  {
    id: "chicken-veg-curry",
    collection: "Chicken Dinner",
    title: "Chicken & Vegetable Curry",
    description: "A quick curry with peppers, peas and a simple tomato base.",
    icon: "wok",
    ingredients: ["chicken", "onion", "pepper", "peas", "tomato", "coriander"],
    badges: [
      { label: "High Protein", tone: "amber" },
      { label: "Weeknight", tone: "green" },
    ],
    prepTime: "30 min",
    servings: "Serves 2",
    steps: [
      "Marinate the chicken briefly with spice paste.",
      "Cook onion and peppers until soft, then add tomatoes.",
      "Return the chicken to the pan and finish with coriander.",
    ],
  },
  {
    id: "slow-cooker-chicken-curry",
    collection: "Chicken Dinner",
    title: "Slow-Cooker Chicken Curry",
    description: "Hands-off chicken curry with onions, peppers and tomatoes.",
    icon: "bowl",
    ingredients: ["chicken", "onion", "pepper", "tomato", "ginger", "coriander"],
    badges: [
      { label: "Hands Off", tone: "neutral" },
      { label: "Meal Prep", tone: "green" },
    ],
    prepTime: "6 hrs",
    servings: "Serves 2",
    steps: [
      "Combine the curry base ingredients in the slow cooker.",
      "Nestle the chicken in the sauce and cook until tender.",
      "Finish with coriander and serve over rice.",
    ],
  },
  {
    id: "mix-veg-curry",
    collection: "Rice & Biryani",
    title: "Mix Veg Curry & Roti",
    description: "Healthy mix veg curry with roti. Comforting and wholesome.",
    icon: "bowl",
    ingredients: ["potato", "onion", "tomato", "spinach"],
    badges: [
      { label: "Vegetarian", tone: "green" },
      { label: "Balanced", tone: "neutral" },
    ],
    prepTime: "25 min",
    servings: "Serves 3",
    steps: [
      "Cook potatoes and mixed vegetables until tender.",
      "Build the gravy with onion and tomato masala.",
      "Serve with roti or rice.",
    ],
  },
  {
    id: "vegetable-biryani",
    collection: "Rice & Biryani",
    title: "Vegetable Biryani",
    description: "One-pot rice with cauliflower, sweet potato, beans and warm spices.",
    icon: "wok",
    ingredients: ["cauliflower", "sweet potato", "onion", "rice", "green bean", "coriander"],
    badges: [
      { label: "One Pot", tone: "green" },
      { label: "Vegan", tone: "neutral" },
    ],
    prepTime: "1 hr",
    servings: "Serves 6",
    steps: [
      "Roast the vegetables with oil and curry paste.",
      "Add rice, stock and spices to the same pot.",
      "Bake until the rice is tender and finish with lemon and coriander.",
    ],
  },
  {
    id: "veggie-subzi-biryani",
    collection: "Rice & Biryani",
    title: "Veggie Subzi Biryani",
    description: "A layered biryani with potatoes, carrots, peas and fragrant whole spices.",
    icon: "wok",
    ingredients: ["rice", "potato", "carrot", "pea", "onion", "yogurt"],
    badges: [
      { label: "Party Rice", tone: "amber" },
      { label: "Vegetarian", tone: "green" },
    ],
    prepTime: "1 hr 30 min",
    servings: "Serves 6",
    steps: [
      "Par-cook the rice and prep the spiced vegetables.",
      "Layer everything with herbs, yogurt and whole spices.",
      "Steam gently until the biryani is fragrant.",
    ],
  },
  {
    id: "easy-veggie-biryani",
    collection: "Rice & Biryani",
    title: "Easy Veggie Biryani",
    description: "A shortcut biryani with mixed vegetables, raisins and cashews.",
    icon: "bowl",
    ingredients: ["rice", "mixed vegetables", "raisins", "cashew", "curry paste"],
    badges: [
      { label: "Fast", tone: "green" },
      { label: "Healthy", tone: "neutral" },
    ],
    prepTime: "20 min",
    servings: "Serves 4",
    steps: [
      "Combine rice, vegetables and raisins in a microwave-safe bowl.",
      "Add hot water, stock and curry paste, then cook covered.",
      "Rest briefly and finish with cashews.",
    ],
  },
  {
    id: "spinach-dhal-paneer",
    collection: "Quick Fixes",
    title: "Spinach Dhal with Paneer",
    description: "Comforting dal upgraded with spinach and paneer for a fuller meal.",
    icon: "bowl",
    ingredients: ["lentils", "spinach", "paneer", "onion", "garlic"],
    badges: [
      { label: "Protein Boost", tone: "amber" },
      { label: "Budget Friendly", tone: "neutral" },
    ],
    prepTime: "35 min",
    servings: "Serves 3",
    steps: [
      "Cook the lentils until soft.",
      "Stir in spinach and a quick onion-garlic tempering.",
      "Add paneer cubes at the end and simmer briefly.",
    ],
  },
  {
    id: "paneer-broccoli-sesame",
    collection: "Quick Fixes",
    title: "Paneer with Broccoli & Sesame",
    description: "A quick wok-style dish with broccoli, paneer, sesame and ginger.",
    icon: "wok",
    ingredients: ["broccoli", "paneer", "ginger", "garlic", "sesame", "green chilli"],
    badges: [
      { label: "Weeknight", tone: "green" },
      { label: "Vegetarian", tone: "amber" },
    ],
    prepTime: "15 min",
    servings: "Serves 4",
    steps: [
      "Steam the broccoli until just tender.",
      "Toast the aromatics and paneer in a hot pan.",
      "Toss everything together with lemon and sesame.",
    ],
  },
  {
    id: "aloo-gobi",
    collection: "Quick Fixes",
    title: "Aloo Gobi",
    description: "Homestyle dry sabzi. Light and comforting.",
    icon: "bowl",
    ingredients: ["potato", "cauliflower", "onion", "turmeric"],
    badges: [
      { label: "Vegetarian", tone: "green" },
      { label: "Low Effort", tone: "neutral" },
    ],
    prepTime: "28 min",
    servings: "Serves 2",
    steps: [
      "Temper cumin and add onion.",
      "Cook potatoes and cauliflower with spices.",
      "Finish dry and serve with roti.",
    ],
  },
  {
    id: "simple-dal",
    collection: "Quick Fixes",
    title: "Simple Dal",
    description: "Classic dal with tadka. Everyday comfort.",
    icon: "bowl",
    ingredients: ["lentils", "onion", "tomato", "garlic"],
    badges: [
      { label: "Budget Friendly", tone: "amber" },
      { label: "Staple", tone: "neutral" },
    ],
    prepTime: "35 min",
    servings: "Serves 3",
    steps: [
      "Boil lentils until soft.",
      "Prepare onion-tomato tadka.",
      "Combine and simmer before serving.",
    ],
  },
];
