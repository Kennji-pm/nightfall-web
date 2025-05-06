import { Punishment } from "@/types/punishment";

export const punishments: Punishment[] = [
  {
    id: "PUN-1001",
    playerName: "MinecraftPro123",
    executorName: "AdminSteve",
    reason: "Using unauthorized mods",
    executionDate: "2025-04-10T12:00:00Z",
    expirationDate: "2025-05-10T12:00:00Z",
    status: "active",
  },
  {
    id: "PUN-1002",
    playerName: "DiamondDigger",
    executorName: "ModeratorAlex",
    reason: "Griefing other players' builds",
    executionDate: "2025-04-08T15:30:00Z",
    expirationDate: "2025-04-22T15:30:00Z",
    status: "active",
  },
  {
    id: "PUN-1003",
    playerName: "EnderSlayer",
    executorName: "AdminSteve",
    reason: "Abusive chat behavior",
    executionDate: "2025-04-05T09:45:00Z",
    expirationDate: "2025-04-12T09:45:00Z",
    status: "expired",
  },
  {
    id: "PUN-1004",
    playerName: "RedstoneWizard",
    executorName: "ModeratorAlex",
    reason: "Exploiting server bugs",
    executionDate: "2025-04-01T14:20:00Z",
    expirationDate: "permanent",
    status: "permanent",
  },
  {
    id: "PUN-1005",
    playerName: "PvPMaster",
    executorName: "AdminSteve",
    reason: "Using combat hacks",
    executionDate: "2025-03-28T11:10:00Z",
    expirationDate: "2025-06-28T11:10:00Z",
    status: "active",
  },
  {
    id: "PUN-1006",
    playerName: "CraftingKing",
    executorName: "ModeratorZoe",
    reason: "Inappropriate building structures",
    executionDate: "2025-03-25T16:40:00Z",
    expirationDate: "2025-04-08T16:40:00Z",
    status: "expired",
  },
  {
    id: "PUN-1007",
    playerName: "SurvivalExpert",
    executorName: "AdminSteve",
    reason: "Account sharing",
    executionDate: "2025-03-22T10:30:00Z",
    expirationDate: "2025-04-05T10:30:00Z",
    status: "expired",
  },
  {
    id: "PUN-1008",
    playerName: "NetherRunner",
    executorName: "ModeratorZoe",
    reason: "Spam in chat",
    executionDate: "2025-03-20T13:15:00Z",
    expirationDate: "2025-03-27T13:15:00Z",
    status: "pardoned",
  },
  {
    id: "PUN-1009",
    playerName: "VillagerTrader",
    executorName: "AdminJohn",
    reason: "Duplication glitch abuse",
    executionDate: "2025-03-18T09:00:00Z",
    expirationDate: "permanent",
    status: "permanent",
  },
  {
    id: "PUN-1010",
    playerName: "EndermanHunter",
    executorName: "ModeratorAlex",
    reason: "Bypassing world borders",
    executionDate: "2025-03-15T17:20:00Z",
    expirationDate: "2025-04-15T17:20:00Z",
    status: "active",
  },
  {
    id: "PUN-1011",
    playerName: "PixelBuilder",
    executorName: "AdminJohn",
    reason: "Disrespecting staff",
    executionDate: "2025-03-12T11:45:00Z",
    expirationDate: "2025-03-26T11:45:00Z",
    status: "expired",
  },
  {
    id: "PUN-1012",
    playerName: "BlockBreaker",
    executorName: "ModeratorZoe",
    reason: "X-ray texture pack use",
    executionDate: "2025-03-10T14:30:00Z",
    expirationDate: "permanent",
    status: "permanent",
  },
  {
    id: "PUN-1013",
    playerName: "CaveExplorer",
    executorName: "AdminSteve",
    reason: "Alt account evasion",
    executionDate: "2025-03-08T09:20:00Z",
    expirationDate: "2025-05-08T09:20:00Z",
    status: "active",
  },
  {
    id: "PUN-1014",
    playerName: "MountainClimber",
    executorName: "ModeratorAlex",
    reason: "Advertising other servers",
    executionDate: "2025-03-05T16:15:00Z",
    expirationDate: "2025-03-19T16:15:00Z",
    status: "pardoned",
  },
  {
    id: "PUN-1015",
    playerName: "OceanDiver",
    executorName: "AdminJohn",
    reason: "Threatening players",
    executionDate: "2025-03-02T10:50:00Z",
    expirationDate: "2025-04-02T10:50:00Z",
    status: "expired",
  },
];

export const getPunishmentById = (id: string): Punishment | undefined => {
  return punishments.find(punishment => punishment.id === id);
};

export const getPunishments = (
  page: number = 1, 
  searchTerm: string = "",
  limit: number = 10
): {
  data: Punishment[];
  total: number;
  totalPages: number;
} => {
  // Filter punishments based on search term
  const filteredPunishments = searchTerm 
    ? punishments.filter(p => 
        p.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [...punishments];
  
  const total = filteredPunishments.length;
  const totalPages = Math.ceil(total / limit);
  
  // Get current page data
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const data = filteredPunishments.slice(startIndex, endIndex);
  
  return {
    data,
    total,
    totalPages
  };
};