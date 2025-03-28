"use client"

import { Box, Flex, Text, Link } from "@chakra-ui/react";
import {
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  UsersIcon,
  NewspaperIcon,
  DeviceTabletIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  FolderOpenIcon,
  BookmarkIcon,
  HandThumbUpIcon,
  FolderArrowDownIcon,
  Bars3Icon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

type Menu = {
  icon: typeof ChatBubbleLeftRightIcon
  menuName: string
  href: string
};
const mainMenu: Menu[] = [
  {
    icon: ChatBubbleLeftRightIcon,
    menuName: "Messages",
    href: '/messages',
  },
  {
    icon: UsersIcon,
    menuName: "People",
    href: '/people',
  },
  {
    icon: NewspaperIcon,
    menuName: "Feed",
    href: '#',
  },
  {
    icon: UserCircleIcon,
    menuName: "Profile",
    href: '/profile'
  },
  {
    icon: Cog6ToothIcon,
    menuName: "Settings",
    href: '/settings'
  },
];

const exploreMenu: Menu[] = [
  {
    icon: DeviceTabletIcon,
    menuName: "Pages",
    href: "/home",
  },
  {
    icon: CalendarDaysIcon,
    menuName: "Events",
    href: "#",
  },
  {
    icon: BriefcaseIcon,
    menuName: "Jobs",
    href: "#",
  },
  {
    icon: FolderArrowDownIcon,
    menuName: "Groups",
    href: "#",
  },
  {
    icon: BookmarkIcon,
    menuName: "Saved",
    href: "#",
  },
  {
    icon: HandThumbUpIcon,
    menuName: "Recommendations",
    href: "#",
  },
  {
    icon: FolderOpenIcon,
    menuName: "Memories",
    href: "#",
  }
]



export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();


  return (
    <Box minHeight={"dvh"} bgColor={"white"} px={5}>
      <Flex direction={"row"} color={"black"} py="4" alignItems={"center"}>
        <Box>
          <Text textStyle={"3xl"} fontWeight={"bold"}>
            fesnuk.
          </Text>
        </Box>
        <Box className="ms-auto">
          <Bars3Icon className="size-8" />
        </Box>
      </Flex>

      <Flex direction={"column"} mt={"15%"} color="black" gap={1}>
        <Text textStyle={"md"} fontWeight={"semibold"} mb={"5"}>
          Main Menu
        </Text>
        {mainMenu.map((menu, index) => (
          <Link
            key={index}
            _hover={{ bgColor: "gray.100", color: "blue.500" }}
            transition={"all 0.3s"}
            borderRadius={"md"}
            onClick={() => {
              if (menu.href == '/profile') return router.push(`/pages/profile/${session?.user?.id}`)
              return router.push(`/pages/${menu.href}`)
            }}
          >
            <Flex p={3} direction={"row"} gapX={4}>
              <menu.icon className="size-6" />
              <Text textStyle={"lg"}>{menu.menuName}</Text>
            </Flex>
          </Link>
        ))}
      </Flex>

      <Flex direction={"column"} gap={1} mt={"15%"} color={"black"}>
        <Text textStyle={"md"} fontWeight={"semibold"} mb={"5"}>
          Explore
        </Text>
        {exploreMenu.map((menu, index) => (
          <Link
            key={index}
            _hover={{ bgColor: "gray.100", color: "blue.500" }}
            transition={"all 0.3s"}
            borderRadius={"md"}
            onClick={() => { router.push(`/pages/${menu.href}`) }}
          >
            <Flex p={3} direction={"row"} gapX={4}>
              <menu.icon className="size-6" />
              <Text textStyle={"lg"}>{menu.menuName}</Text>
            </Flex>
          </Link>
        ))}

      </Flex>
    </Box>
  );
}
