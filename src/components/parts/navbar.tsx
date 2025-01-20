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
  Bars3Icon
} from "@heroicons/react/24/outline";

type Menu = {
  icon: typeof ChatBubbleLeftRightIcon;
  menuName: String;
};

const mainMenu: Menu[] = [
  {
    icon: ChatBubbleLeftRightIcon,
    menuName: "Messages",
  },
  {
    icon: UsersIcon,
    menuName: "People",
  },
  {
    icon: NewspaperIcon,
    menuName: "Feed",
  },
  {
    icon: UserCircleIcon,
    menuName: "Profile",
  },
];

const exploreMenu: Menu[] = [
  {
    icon: DeviceTabletIcon,
    menuName: "Pages"
  },
  {
    icon: CalendarDaysIcon,
    menuName: "Events"
  },
  {
    icon: BriefcaseIcon,
    menuName: "Jobs"
  },
  {
    icon: FolderArrowDownIcon,
    menuName: "Groups"
  },
  {
    icon: BookmarkIcon,
    menuName: "Saved"
  },
  {
    icon: HandThumbUpIcon,
    menuName: "Recommendations"
  },
  {
    icon: FolderOpenIcon,
    menuName: "Memories"
  }
]

export default function Navbar() {
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
