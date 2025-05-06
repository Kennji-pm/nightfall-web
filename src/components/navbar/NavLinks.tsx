import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { useState } from "react";
// import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

interface NavLinksProps {
  t: any;
  onClose?: () => void;
}

export const NavLinks = ({ t, onClose }: NavLinksProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleOpenChange = (open: boolean, menu: string) => {
    if (open) {
      setOpenMenu(menu);
    } else {
      setOpenMenu(null);
    }
  };

  const handleLinkClick = () => {
    setOpenMenu(null);
    if (onClose) onClose();
  };

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuLink 
            asChild 
            className="group transition-colors"
          >
            <Link 
              href="/" 
              className="text-base px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:bg-accent/50"
              onClick={handleLinkClick}
            >
              {t.navbar.home}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link 
              href="/vote" 
              className="text-base px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:bg-accent/50"
              onClick={handleLinkClick}
            >
              {t.navbar.vote}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            onClick={() => handleOpenChange(true, 'gallery')}
            className="text-base bg-transparent hover:bg-accent hover:text-foreground data-[state=open]:bg-accent/50 data-[state=open]:text-foreground px-3 py-2"
          >
            {t.navbar.gallery}
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            onPointerEnter={() => handleOpenChange(true, 'gallery')} 
            onPointerLeave={() => handleOpenChange(false, 'gallery')}
            className="min-w-[220px] animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            <div className="grid gap-2 p-4 w-[220px] md:w-[280px]">
              <Link 
                href="/gallery" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
                onClick={handleLinkClick}
              >
                <div className="font-medium">{t.navbar.gallery}</div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Browse our amazing collection of screenshots
                </p>
              </Link>
              <div className="h-px bg-border my-1"></div>
              <Link 
                href="/gallery?category=builds" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
                onClick={handleLinkClick}
              >
                <div className="font-medium">Builds</div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Our best architectural creations
                </p>
              </Link>
              <Link 
                href="/gallery?category=landscapes" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
                onClick={handleLinkClick}
              >
                <div className="font-medium">Landscapes</div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Beautiful biomes and natural wonders
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger 
            onClick={() => handleOpenChange(true, 'server')}
            className="text-base bg-transparent hover:bg-accent hover:text-foreground data-[state=open]:bg-accent/50 data-[state=open]:text-foreground px-3 py-2"
          >
            {t.navbar.server}
          </NavigationMenuTrigger>
          <NavigationMenuContent 
            onPointerEnter={() => handleOpenChange(true, 'server')}
            onPointerLeave={() => handleOpenChange(false, 'server')}
            className="min-w-[220px] animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          >
            <div className="grid gap-2 p-4 w-[220px] md:w-[280px]">
              <Link 
                href="/punishments" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
                onClick={handleLinkClick}
              >
                <div className="font-medium">Punishments</div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  View punishment history and logs
                </p>
              </Link>
              <Link 
                href="/about" 
                className="block select-none space-y-1 rounded-md p-3 hover:bg-accent"
                onClick={handleLinkClick}
              >
                <div className="font-medium">About</div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  Learn about our server history
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};