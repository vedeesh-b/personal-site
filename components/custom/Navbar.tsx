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
      name: "Guestbook",
      href: "/guestbook",
    },
    {
      name: "Projects",
      href: "/projects",
    },
  ];
  return (
    <NavigationMenu className="fixed top-4 left-1/2 -translate-x-1/2 px-6 h-14 bg-white border-[0.33px] rounded-full shadow-md z-100">
      <NavigationMenuList>
        {navbarItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink asChild>
              <Link href={item.href} className="text-[14px]">
                {item.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
