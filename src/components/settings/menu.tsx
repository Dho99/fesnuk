"use client";

import { useRouter } from "next/navigation";
import { Link, Flex, Text } from "@chakra-ui/react";
import {
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Menu(): React.ReactNode {
  type SettingsMenu = {
    name: string;
    icon: typeof UserIcon;
    href: string;
  };

  const settingsMenus: SettingsMenu[] = [
    {
      name: "Account",
      icon: UserIcon,
      href: "/account",
    },
    {
      name: "Sign Out",
      icon: ArrowLeftStartOnRectangleIcon,
      href: "/signout",
    },
  ];

  const router = useRouter();

  return (
    <>
      {settingsMenus.map((menu, index) => (
        <Link
          key={index}
          px={4}
          py={2}
          color={menu.name != "Sign Out" ? "black" : "red"}
          onClick={() => {
            router.push(`/pages/settings/${menu.href}`);
          }}
        >
          <Flex direction={"row"} gap={3} alignContent={"center"}>
            <menu.icon className="size-6" />
            <Text textStyle="md">{menu.name}</Text>
          </Flex>
        </Link>
      ))}
    </>
  );
}
