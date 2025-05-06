export interface Punishment {
    id: string;
    playerName: string;
    executorName: string;
    reason: string;
    executionDate: string;
    expirationDate: string | "permanent";
    status: "active" | "expired" | "pardoned" | "permanent";
}

export type PunishmentSearchParams = {
    page?: string;
    search?: string;
    sort?: string;
    order?: "asc" | "desc";
};