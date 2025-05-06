import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGallery } from "@/contexts/GalleryContext";
import { User, Upload, Heart, LogOut, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export const UserMenu = () => {
  const { isAuthenticated, currentUser, logout, toggleUploadModal } = useGallery();
  
  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <LogIn className="h-4 w-4 mr-1" />
            Login
          </Button>
        </Link>
        <Link href="/auth?tab=register">
          <Button variant="default" size="sm" className="flex items-center gap-1">
            <UserPlus className="h-4 w-4 mr-1" />
            Register
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${currentUser}`} alt={currentUser || ""} />
            <AvatarFallback>
              {currentUser?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer flex items-center">
            <Heart className="mr-2 h-4 w-4" />
            Liked Images
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleUploadModal} className="cursor-pointer">
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={logout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;