import { GalleryImage } from "@/contexts/GalleryContext";

// Image data with additional metadata
const galleryImages: GalleryImage[] = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop",
    title: "Epic Castle",
    description: "A magnificent castle built by our community",
    category: "builds",
    tags: ["medieval", "castle"],
    author: "CraftMaster",
    views: 1230,
    likes: 342,
    date: "2023-05-15",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
    title: "Scenic Landscape",
    description: "Beautiful terrain generation in our survival world",
    category: "landscapes",
    tags: ["survival", "adventure"],
    author: "NatureLover",
    views: 956,
    likes: 287,
    date: "2023-06-22",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=1920&h=1080&fit=crop",
    title: "Medieval Village",
    description: "A thriving medieval-themed village built by our players",
    category: "builds",
    tags: ["medieval", "community"],
    author: "VillageBuilder",
    views: 847,
    likes: 198,
    date: "2023-07-10",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?w=1920&h=1080&fit=crop",
    title: "Modern House",
    description: "A modern architectural masterpiece",
    category: "builds",
    tags: ["modern", "house"],
    author: "ArchDesigner",
    views: 1102,
    likes: 413,
    date: "2023-08-05",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?w=1920&h=1080&fit=crop",
    title: "Futuristic Building",
    description: "Pushing the boundaries of what's possible in Minecraft",
    category: "builds",
    tags: ["modern", "creative"],
    author: "FutureCrafter",
    views: 765,
    likes: 231,
    date: "2023-08-17",
  },
  {
    id: 6,
    thumbnail: "https://images.unsplash.com/photo-1516571748831-5d81767b044d?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1516571748831-5d81767b044d?w=1920&h=1080&fit=crop",
    title: "Crystal Cave",
    description: "Discover the hidden wonders beneath the surface",
    category: "landscapes",
    tags: ["adventure", "survival"],
    author: "CaveExplorer",
    views: 624,
    likes: 189,
    date: "2023-09-02",
  },
  {
    id: 7,
    thumbnail: "https://images.unsplash.com/photo-1563282222-73ae0eeae7b9?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1563282222-73ae0eeae7b9?w=1920&h=1080&fit=crop",
    title: "Automated Farm",
    description: "Efficient crop production through redstone engineering",
    category: "redstone",
    tags: ["farm", "redstone"],
    author: "RedstoneGenius",
    views: 891,
    likes: 267,
    date: "2023-09-14",
  },
  {
    id: 8,
    thumbnail: "https://images.unsplash.com/photo-1608354580875-30bd4170fff8?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1608354580875-30bd4170fff8?w=1920&h=1080&fit=crop",
    title: "Ancient Temple",
    description: "A mysterious temple hidden in the jungle",
    category: "builds",
    tags: ["medieval", "adventure"],
    author: "TempleFinder",
    views: 712,
    likes: 203,
    date: "2023-09-28",
  },
  {
    id: 9,
    thumbnail: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=1920&h=1080&fit=crop",
    title: "Wizard Tower",
    description: "A towering spire of magical energy",
    category: "builds",
    tags: ["medieval", "creative"],
    author: "MagicBuilder",
    views: 542,
    likes: 176,
    date: "2023-10-11",
  },
  {
    id: 10,
    thumbnail: "https://images.unsplash.com/photo-1492535429216-535f6c529620?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1492535429216-535f6c529620?w=1920&h=1080&fit=crop",
    title: "Stone Bridge",
    description: "Connecting worlds through expert craftsmanship",
    category: "builds",
    tags: ["medieval", "community"],
    author: "BridgeArchitect",
    views: 634,
    likes: 192,
    date: "2023-10-25",
  },
  {
    id: 11,
    thumbnail: "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?w=1920&h=1080&fit=crop",
    title: "Nether Portal",
    description: "Gateway to the fiery dimension",
    category: "landscapes",
    tags: ["adventure", "creative"],
    author: "NetherExplorer",
    views: 823,
    likes: 247,
    date: "2023-11-08",
  },
  {
    id: 12,
    thumbnail: "https://images.unsplash.com/photo-1536011269729-f3cec3c890b3?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1536011269729-f3cec3c890b3?w=1920&h=1080&fit=crop",
    title: "PvP Arena",
    description: "Test your combat skills in our custom-built arena",
    category: "events",
    tags: ["pvp", "minigame"],
    author: "ArenaChampion",
    views: 967,
    likes: 301,
    date: "2023-11-21",
  },
  {
    id: 13,
    thumbnail: "https://images.unsplash.com/photo-1628540082046-3aa65e369279?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1628540082046-3aa65e369279?w=1920&h=1080&fit=crop",
    title: "Community Event",
    description: "Players gathering for our annual server anniversary",
    category: "events",
    tags: ["community", "players"],
    author: "EventOrganizer",
    views: 1054,
    likes: 387,
    date: "2023-12-05",
  },
  {
    id: 14,
    thumbnail: "https://images.unsplash.com/photo-1584824388876-55baf252ef3e?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1584824388876-55baf252ef3e?w=1920&h=1080&fit=crop",
    title: "Enchanted Waterfall",
    description: "A magical waterfall in our fantasy realm",
    category: "landscapes",
    tags: ["adventure", "creative"],
    author: "WaterWizard",
    views: 743,
    likes: 221,
    date: "2023-12-19",
  },
  {
    id: 15,
    thumbnail: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=1920&h=1080&fit=crop",
    title: "Advanced Redstone Contraption",
    description: "Complex redstone engineering that pushes the game mechanics",
    category: "redstone",
    tags: ["redstone", "creative"],
    author: "RedstoneMaster",
    views: 876,
    likes: 312,
    date: "2024-01-02",
  },
  {
    id: 16,
    thumbnail: "https://images.unsplash.com/photo-1595344436965-413267afba2f?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1595344436965-413267afba2f?w=1920&h=1080&fit=crop",
    title: "Underwater Base",
    description: "An elaborate base constructed beneath the ocean",
    category: "builds",
    tags: ["modern", "creative"],
    author: "OceanBuilder",
    views: 912,
    likes: 345,
    date: "2024-01-15",
  },
  {
    id: 17,
    thumbnail: "https://images.unsplash.com/photo-1603108518351-e7afa4129467?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1603108518351-e7afa4129467?w=1920&h=1080&fit=crop",
    title: "Mountain Fortress",
    description: "A defensive structure built into the mountainside",
    category: "builds",
    tags: ["medieval", "castle"],
    author: "MountainKing",
    views: 678,
    likes: 203,
    date: "2024-01-30",
  },
  {
    id: 18,
    thumbnail: "https://images.unsplash.com/photo-1579451487737-127171b5c3b3?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1579451487737-127171b5c3b3?w=1920&h=1080&fit=crop",
    title: "Desert Oasis",
    description: "A lush paradise in the middle of endless sand",
    category: "landscapes",
    tags: ["survival", "adventure"],
    author: "DesertWanderer",
    views: 521,
    likes: 167,
    date: "2024-02-14",
  },
  {
    id: 19,
    thumbnail: "https://images.unsplash.com/photo-1628096578541-91046886a4f7?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1628096578541-91046886a4f7?w=1920&h=1080&fit=crop",
    title: "Floating Islands",
    description: "Islands suspended in the sky, connected by bridges",
    category: "builds",
    tags: ["creative", "modern"],
    author: "SkyArchitect",
    views: 1043,
    likes: 392,
    date: "2024-02-28",
  },
  {
    id: 20,
    thumbnail: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=1920&h=1080&fit=crop",
    title: "Parkour Challenge",
    description: "Test your jumping skills in our extreme parkour course",
    category: "events",
    tags: ["minigame", "players"],
    author: "ParkourMaster",
    views: 887,
    likes: 271,
    date: "2024-03-15",
  },
  {
    id: 21,
    thumbnail: "https://images.unsplash.com/photo-1578346446579-64ff65152de9?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1578346446579-64ff65152de9?w=1920&h=1080&fit=crop",
    title: "Redstone Laboratory",
    description: "A facility dedicated to redstone research and experiments",
    category: "redstone",
    tags: ["redstone", "modern"],
    author: "ScienceCrafter",
    views: 763,
    likes: 231,
    date: "2024-03-30",
  },
  {
    id: 22,
    thumbnail: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1585951237318-9ea5e175b891?w=1920&h=1080&fit=crop",
    title: "Jungle Treehouse",
    description: "An elaborate network of treehouses in the dense jungle",
    category: "builds",
    tags: ["survival", "house"],
    author: "TreeBuilder",
    views: 654,
    likes: 198,
    date: "2024-04-12",
  },
  {
    id: 23,
    thumbnail: "https://images.unsplash.com/photo-1633405605754-2480e8c3c4c0?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1633405605754-2480e8c3c4c0?w=1920&h=1080&fit=crop",
    title: "Winter Wonderland",
    description: "A beautiful snowy landscape with ice formations",
    category: "landscapes",
    tags: ["adventure", "survival"],
    author: "FrostExplorer",
    views: 587,
    likes: 176,
    date: "2024-04-25",
  },
  {
    id: 24,
    thumbnail: "https://images.unsplash.com/photo-1568613444556-13cbdfc1a07d?w=600&h=400&fit=crop",
    fullsize: "https://images.unsplash.com/photo-1568613444556-13cbdfc1a07d?w=1920&h=1080&fit=crop",
    title: "Halloween Event",
    description: "Spooky decorations for our annual Halloween celebration",
    category: "events",
    tags: ["community", "minigame"],
    author: "SpookyBuilder",
    views: 742,
    likes: 215,
    date: "2024-05-08",
  }
];

export default galleryImages;