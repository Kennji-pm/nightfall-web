import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPunishments, getPunishmentById } from "@/data/punishment-data";
import { Punishment } from "@/types/punishment";

export type SortField = "playerName" | "executorName" | "reason" | "executionDate" | "expirationDate" | "status";
export type SortOrder = "asc" | "desc";

export const usePunishments = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchTerm = searchParams.get("search") || "";
  const sortField = searchParams.get("sort") as SortField || "executionDate";
  const sortOrder = searchParams.get("order") as SortOrder || "desc";
  
  const [punishments, setPunishments] = useState<Punishment[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

  // Effect for fetching punishments
  useEffect(() => {
    const fetchPunishments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const result = getPunishments(currentPage, searchTerm, 10);
        
        // Sort the punishments based on the sort field and order
        const sortedPunishments = [...result.data].sort((a, b) => {
          if (sortField === "executionDate") {
            const dateA = new Date(a[sortField]).getTime();
            const dateB = new Date(b[sortField]).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
          } else if (sortField === "expirationDate") {
            // Handle permanent expiration date
            if (a[sortField] === "permanent" && b[sortField] === "permanent") {
              return 0;
            }
            if (a[sortField] === "permanent") {
              return sortOrder === "asc" ? 1 : -1;
            }
            if (b[sortField] === "permanent") {
              return sortOrder === "asc" ? -1 : 1;
            }
            const dateA = new Date(a[sortField] as string).getTime();
            const dateB = new Date(b[sortField] as string).getTime();
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
          } else {
            const valueA = a[sortField].toLowerCase();
            const valueB = b[sortField].toLowerCase();
            return sortOrder === "asc" 
              ? valueA.localeCompare(valueB)
              : valueB.localeCompare(valueA);
          }
        });
        
        setPunishments(sortedPunishments);
        setTotalPages(result.totalPages);
        setTotalItems(result.total);
        
        if (searchTerm && result.data.length === 0) {
          setError("No punishments found matching your search criteria");
        }
      } catch (err) {
        console.error("Error fetching punishments:", err);
        setError("Failed to load punishments data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPunishments();
  }, [currentPage, searchTerm, sortField, sortOrder]);

  // Generate search suggestions based on the search term
  useEffect(() => {
    if (searchTerm.length > 1) {
      // Get all punishments for suggestions (without pagination)
      const allPunishments = getPunishments(1, "", 1000).data;
      
      // Find unique player names that match the search term
      const matchingNames = allPunishments
        .filter(p => p.playerName.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(p => p.playerName);
      
      // Remove duplicates and limit to 5 suggestions
      const uniqueNames = Array.from(new Set(matchingNames)).slice(0, 5);
      setSearchSuggestions(uniqueNames);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm]);

  const setPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    router.replace(newParams.toString());
  };

  const setSearch = (search: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (search) {
      newParams.set("search", search);
    } else {
      newParams.delete("search");
    }
    newParams.set("page", "1"); // Reset to first page on new search
    router.replace(newParams.toString());
  };

  const setSorting = (field: SortField) => {
    const newParams = new URLSearchParams(searchParams);
    const currentSortField = newParams.get("sort") || "executionDate";
    const currentSortOrder = newParams.get("order") || "desc";
    
    // If clicking on the same field, toggle the sort order
    if (field === currentSortField) {
      newParams.set("order", currentSortOrder === "asc" ? "desc" : "asc");
    } else {
      // Otherwise, set the new field and default to ascending order
      newParams.set("sort", field);
      newParams.set("order", "asc");
    }
    
    router.replace(newParams.toString());
  };

  return {
    punishments,
    totalPages,
    totalItems,
    currentPage,
    searchTerm,
    sortField,
    sortOrder,
    isLoading,
    error,
    searchSuggestions,
    setPage,
    setSearch,
    setSorting
  };
};

export const usePunishmentDetail = (id: string) => {
  const [punishment, setPunishment] = useState<Punishment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPunishmentDetail = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const result = getPunishmentById(id);
        
        if (result) {
          setPunishment(result);
        } else {
          setError("Punishment record not found");
        }
      } catch (err) {
        console.error("Error fetching punishment detail:", err);
        setError("Failed to load punishment details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPunishmentDetail();
  }, [id]);

  return { punishment, isLoading, error };
};