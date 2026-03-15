import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import Link from "next/link";

export const Navbar = () => {
  const navbarItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Guestbook",
      href: "/guestbook",
    },
  ];
  return (
    <NavigationMenu className="fixed top-4 left-1/2 -translate-x-1/2 px-6 h-14 bg-white border-[0.33px] rounded-full shadow-md z-50">
      <NavigationMenuList className="flex flex-row gap-6">
        {navbarItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <Link href={item.href} className="text-[14px]">
              {item.name}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
