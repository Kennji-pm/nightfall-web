"use client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  AlertTriangle,
  Info,
  User,
  InfinityIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { usePunishmentDetail } from "@/hooks/usePunishments";
import { TranslationProvider } from "@/hooks/useTranslation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ContactPopup } from "@/components/ContactPopup";

const PunishmentDetail = () => {
  const params = useParams<{ id: string }>();
  const { punishment, isLoading, error } = usePunishmentDetail(params.id);
  const [countdown, setCountdown] = useState<string>("");

  // Calculate punishment progress/timeline
  const calculateProgress = () => {
    if (!punishment) return 0;

    // If punishment is permanent, return 100% (always full)
    if (
      punishment.status === "permanent" ||
      punishment.expirationDate === "permanent"
    )
      return 100;
    if (punishment.status === "pardoned") return 100;

    const start = new Date(punishment.executionDate).getTime();
    const end = new Date(punishment.expirationDate as string).getTime();
    const now = Date.now();

    if (now >= end) return 100;

    const total = end - start;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
  };

  // Update countdown timer for active punishments
  useEffect(() => {
    if (
      !punishment ||
      punishment.status !== "active" ||
      punishment.expirationDate === "permanent"
    )
      return;

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const expiration = new Date(
        punishment.expirationDate as string
      ).getTime();
      const timeLeft = expiration - now;

      if (timeLeft <= 0) {
        setCountdown("Expired");
        return;
      }

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    calculateCountdown(); // Calculate immediately
    const timerId = setInterval(calculateCountdown, 1000); // Then every second

    return () => clearInterval(timerId); // Cleanup on unmount
  }, [punishment]);

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get relative time description
  const getTimeDescription = (dateString: string | "permanent") => {
    if (dateString === "permanent") {
      return "never expires";
    }

    const then = new Date(dateString).getTime();
    const now = Date.now();

    const diffInSeconds = Math.floor((then - now) / 1000);
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInSeconds < 0) {
      if (Math.abs(diffInDays) > 30) {
        return `${Math.floor(Math.abs(diffInDays) / 30)} months ago`;
      }
      return `${Math.abs(diffInDays)} days ago`;
    }

    if (diffInDays > 30) {
      return `in ${Math.floor(diffInDays / 30)} months`;
    }
    return diffInDays === 0 ? "today" : `in ${diffInDays} days`;
  };

//   // Background animation variants
//   const backgroundVariants = {
//     animate: {
//       backgroundPosition: ["0% 0%", "100% 100%"],
//       transition: {
//         duration: 20,
//         ease: "linear",
//         repeat: Infinity,
//         repeatType: "reverse" as const,
//       },
//     },
//   };

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

  return (
    <TranslationProvider>
      <div
        className="min-h-screen flex flex-col bg-background text-foreground"
      >
        <Navbar />

        <div className="h-10"></div>

        <div className="container py-10 max-w-4xl flex-grow">
          <motion.div
            className="flex items-center mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/punishments">
              <Button variant="outline" className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">
              Punishment Details
            </h1>
          </motion.div>

          {isLoading ? (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Skeleton className="h-8 w-1/3" />
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center">
                    <AlertTriangle className="mr-2" />
                    Error
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                  <Button variant="outline" className="mt-4">
                    <Link href="/punishments">Return to Punishment List</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : punishment ? (
            <motion.div
              variants={cardVariants}
              initial="initial"
              animate="animate"
            >
              <Card className="border-2 border-border/50 shadow-lg overflow-hidden bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <div
                  className={`h-2 ${
                    punishment.status === "permanent"
                      ? "bg-purple-500"
                      : punishment.status === "active"
                      ? "bg-red-500"
                      : punishment.status === "expired"
                      ? "bg-gray-500"
                      : "bg-green-500"
                  }`}
                />

                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-border">
                        <AvatarImage
                          src={`https://mc-heads.net/avatar/${punishment.playerName}`}
                        />
                        <AvatarFallback className="bg-muted">
                          <User className="h-8 w-8 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl md:text-2xl mb-1">
                          {punishment.playerName}
                        </CardTitle>
                        <CardDescription>ID: {punishment.id}</CardDescription>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
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
                        : punishment.status.charAt(0).toUpperCase() +
                          punishment.status.slice(1)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Reason</h3>
                    <p className="bg-muted/50 p-3 rounded-md border border-border/50">
                      {punishment.reason}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Executed By
                      </h3>
                      <p className="font-medium">{punishment.executorName}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Punishment Status
                      </h3>
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            punishment.status === "permanent"
                              ? "bg-purple-500"
                              : punishment.status === "active"
                              ? "bg-red-500 animate-pulse"
                              : punishment.status === "expired"
                              ? "bg-gray-500"
                              : "bg-green-500"
                          }`}
                        />
                        <span>
                          {punishment.status === "permanent"
                            ? "Permanent Ban"
                            : punishment.status === "active"
                            ? "Active"
                            : punishment.status === "expired"
                            ? "Expired"
                            : "Pardoned"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Countdown timer for active punishments */}
                  {punishment.status === "active" &&
                    punishment.expirationDate !== "permanent" && (
                      <motion.div
                        className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 flex items-center justify-between"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-red-500 mr-2" />
                          <span className="font-medium">Time Remaining:</span>
                        </div>
                        <div className="text-lg font-mono font-bold text-red-600 dark:text-red-400">
                          {countdown}
                        </div>
                      </motion.div>
                    )}

                  <div className="border-t border-border pt-4">
                    <div className="mb-2 flex justify-between items-center">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-4 w-4" />
                        <span>Timeline:</span>
                      </div>
                      {punishment.status === "active" &&
                        punishment.expirationDate !== "permanent" && (
                          <span className="text-sm">
                            {calculateProgress()}% complete
                          </span>
                        )}
                      {(punishment.status === "permanent" ||
                        punishment.expirationDate === "permanent") && (
                        <span className="text-sm flex items-center text-purple-600">
                          <InfinityIcon className="h-4 w-4 mr-1" /> Permanent
                        </span>
                      )}
                    </div>

                    <Progress
                      value={calculateProgress()}
                      className="h-2 mb-6"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-border/50 rounded-md p-3">
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>Execution Date</span>
                        </div>
                        <p className="font-medium">
                          {formatDate(punishment.executionDate)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getTimeDescription(punishment.executionDate)}
                        </p>
                      </div>

                      <div className="border border-border/50 rounded-md p-3">
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Clock className="mr-1 h-4 w-4" />
                          <span>Expiration Date</span>
                        </div>
                        {punishment.expirationDate === "permanent" ? (
                          <>
                            <p className="font-medium flex items-center text-purple-600 dark:text-purple-400">
                              <InfinityIcon className="mr-1 h-4 w-4" />
                              Permanent
                            </p>
                            <p className="text-sm text-muted-foreground">
                              This punishment never expires
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">
                              {formatDate(punishment.expirationDate as string)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {getTimeDescription(punishment.expirationDate)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="bg-muted/30 p-4 rounded-md border border-border/50 flex items-start gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="mt-1">
                      <Info className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">
                        Additional Information
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        This punishment was issued in accordance with our server
                        rules. If you believe this was issued in error, you can
                        appeal this punishment on our Discord server.
                        {punishment.expirationDate === "permanent" && (
                          <span className="block mt-2 text-purple-600 dark:text-purple-400 font-medium">
                            This is a permanent punishment and will not expire
                            automatically.
                          </span>
                        )}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </div>
        
        <ContactPopup/>
        <Footer />
      </div>
    </TranslationProvider>
  );
};

export default PunishmentDetail;
