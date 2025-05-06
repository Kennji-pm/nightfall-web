"use client";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  X,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePunishments, type SortField } from "@/hooks/usePunishments";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TranslationProvider } from "@/hooks/useTranslation";
import Link from "next/link";
import { ContactPopup } from "@/components/ContactPopup";

const PunishmentList = () => {
  const {
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
    setSorting,
  } = usePunishments();

  const [searchInput, setSearchInput] = useState(searchTerm);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update search input when search term changes from URL
  useEffect(() => {
    setSearchInput(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchInput(suggestion);
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleSortClick = (field: SortField) => {
    setSorting(field);
  };

  const renderSortIcon = (field: SortField) => {
    if (field === sortField) {
      return sortOrder === "asc" ? (
        <ArrowUp className="ml-1 h-4 w-4 inline" />
      ) : (
        <ArrowDown className="ml-1 h-4 w-4 inline" />
      );
    }
    return null;
  };

  // Background animation variants
  const backgroundVariants = {
    animate: {
      backgroundPosition: ["0% 0%", "100% 100%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  // Card animation variants
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const renderPagination = () => {
    const pageItems = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={(e) => {
              e.preventDefault();
              setPage(i);
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setPage(currentPage - 1);
              }}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center">
                    ...
                  </span>
                </PaginationItem>
              )}
            </>
          )}

          {pageItems}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center">
                    ...
                  </span>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setPage(currentPage + 1);
              }}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  // Function to format expiration date display
  const formatExpirationDate = (expirationDate: string | "permanent") => {
    if (expirationDate === "permanent") {
      return "Permanent";
    }
    return new Date(expirationDate).toLocaleDateString();
  };

  return (
    <TranslationProvider>
      <div
        className="min-h-screen flex flex-col bg-background text-foreground"
      >
        <Navbar />

        <div className="h-10"></div>

        <div className="container py-10 max-w-7xl flex-grow">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold">Player Punishment List</h1>
            <div className="mt-2 md:mt-0 text-sm text-muted-foreground">
              Server: play.craftworld.com
            </div>
          </motion.div>

          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
          >
            <Card className="mb-8 border-2 border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div ref={searchRef} className="relative">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Search by player name or ID..."
                        value={searchInput}
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                          setShowSuggestions(e.target.value.length > 1);
                        }}
                        onFocus={() =>
                          setShowSuggestions(searchInput.length > 1)
                        }
                        className="pr-8"
                      />
                      {searchInput && (
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            setSearchInput("");
                            if (searchTerm) setSearch("");
                          }}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <Button type="submit">
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                  </form>

                  {showSuggestions && searchSuggestions.length > 0 && (
                    <motion.div
                      className="absolute z-10 mt-1 w-full bg-background border border-border rounded-md shadow-lg"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="py-1">
                        {searchSuggestions.map((suggestion) => (
                          <motion.li
                            key={suggestion}
                            className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center"
                            onClick={() => handleSelectSuggestion(suggestion)}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          >
                            <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                            {suggestion}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/10">
                <CardContent className="pt-6 text-center text-red-600 dark:text-red-400">
                  {error}
                </CardContent>
              </Card>
            </motion.div>
          ) : null}

          <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-border/50 shadow-lg bg-white/50 dark:bg-black/20 backdrop-blur-sm">
              <CardContent className="p-0 overflow-auto">
                <div className="lg:hidden">
                  <div className="space-y-4 p-4">
                    {isLoading
                      ? Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="border rounded-lg p-4 space-y-2"
                            >
                              <div className="flex justify-between">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-5 w-24" />
                              </div>
                              <Skeleton className="h-4 w-24" />
                            </div>
                          ))
                      : punishments.map((punishment) => (
                          <Link
                            key={punishment.id}
                            href={`/punishments/${punishment.id}`}
                            className="block border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">
                                  {punishment.playerName}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {punishment.id}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm">
                                  {punishment.executorName}
                                </div>
                                <div
                                  className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                                    punishment.status === "permanent"
                                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                      : punishment.status === "active"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                      : punishment.status === "expired"
                                      ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                                      : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  }`}
                                >
                                  {punishment.status === "permanent"
                                    ? "Permanent"
                                    : punishment.status
                                        .charAt(0)
                                        .toUpperCase() +
                                      punishment.status.slice(1)}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                  </div>
                </div>

                <div className="hidden lg:block">
                  <Table>
                    <TableCaption>
                      {isLoading ? (
                        <Skeleton className="h-5 w-48 mx-auto" />
                      ) : (
                        `Total players: ${totalItems}`
                      )}
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-foreground transition-colors group"
                          onClick={() => handleSortClick("playerName")}
                        >
                          <span className="inline-flex items-center">
                            Player Name
                            {renderSortIcon("playerName")}
                          </span>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-foreground transition-colors"
                          onClick={() => handleSortClick("executorName")}
                        >
                          <span className="inline-flex items-center">
                            Executed By
                            {renderSortIcon("executorName")}
                          </span>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-foreground transition-colors"
                          onClick={() => handleSortClick("reason")}
                        >
                          <span className="inline-flex items-center">
                            Reason
                            {renderSortIcon("reason")}
                          </span>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-foreground transition-colors"
                          onClick={() => handleSortClick("executionDate")}
                        >
                          <span className="inline-flex items-center">
                            Executed On
                            {renderSortIcon("executionDate")}
                          </span>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-foreground transition-colors"
                          onClick={() => handleSortClick("expirationDate")}
                        >
                          <span className="inline-flex items-center">
                            Expires On
                            {renderSortIcon("expirationDate")}
                          </span>
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-foreground transition-colors"
                          onClick={() => handleSortClick("status")}
                        >
                          <span className="inline-flex items-center">
                            Status
                            {renderSortIcon("status")}
                          </span>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading
                        ? Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <TableRow
                                key={i}
                                className="animate-pulse bg-muted/30"
                              >
                                <TableCell>
                                  <Skeleton className="h-5 w-20" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-5 w-32" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-5 w-24" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-5 w-40" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-5 w-24" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-5 w-24" />
                                </TableCell>
                                <TableCell>
                                  <Skeleton className="h-5 w-16" />
                                </TableCell>
                                <TableCell className="text-right">
                                  <Skeleton className="h-5 w-16 ml-auto" />
                                </TableCell>
                              </TableRow>
                            ))
                        : punishments.map((punishment) => {
                            // Format dates for better readability
                            const executionDate = new Date(
                              punishment.executionDate
                            ).toLocaleDateString();
                            const expirationDate = formatExpirationDate(
                              punishment.expirationDate
                            );

                            return (
                              <TableRow
                                key={punishment.id}
                                className="hover:bg-muted/50 transition-colors"
                              >
                                <TableCell className="font-medium">
                                  {punishment.id}
                                </TableCell>
                                <TableCell>{punishment.playerName}</TableCell>
                                <TableCell>{punishment.executorName}</TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                  {punishment.reason}
                                </TableCell>
                                <TableCell>{executionDate}</TableCell>
                                <TableCell>
                                  {punishment.expirationDate === "permanent" ? (
                                    <span className="font-medium text-purple-600 dark:text-purple-400">
                                      Permanent
                                    </span>
                                  ) : (
                                    expirationDate
                                  )}
                                </TableCell>
                                <TableCell>
                                  <span
                                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                                      punishment.status === "permanent"
                                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                                        : punishment.status === "active"
                                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                        : punishment.status === "expired"
                                        ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                    }`}
                                  >
                                    {punishment.status === "permanent"
                                      ? "Permanent"
                                      : punishment.status
                                          .charAt(0)
                                          .toUpperCase() +
                                        punishment.status.slice(1)}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Link href={`/punishments/${punishment.id}`}>
                                    <Button variant="outline" size="sm">
                                      Details
                                    </Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {!isLoading && renderPagination()}
        </div>
        
        <ContactPopup/>
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default PunishmentList;
