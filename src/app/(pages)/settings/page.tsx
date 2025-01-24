"use client"

import { Box, Flex, Link, Text } from "@chakra-ui/react";
import {
  UserIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Logout from "@/components/settings/logout";
import { useState } from "react";

export default function Page() {
    const [section, setSection] = useState<string>('Account')

  type SettingsMenu = {
    name: string;
    icon: typeof UserIcon;
  };

  const settingsMenus: SettingsMenu[] = [
    {
      name: "Account",
      icon: UserIcon,
    },
    {
      name: "Sign Out",
      icon: ArrowLeftStartOnRectangleIcon,
    },
  ];

  return (
    <Flex
      justifyContent={{
        xl: "start",
        lg: "start",
        md: "center",
        sm: "center",
        base: "center",
      }}
      overflow={"hidden"}
      position={"relative"}
    >
      <Box
        w={{ xl: "98%", lg: "98%", md: "95%", sm: "95%", base: "95%" }}
        h="90vh"
        bgColor={"white"}
        rounded="lg"
      >
        <Flex direction={{xl: "row", lg: "row", md: "column", sm: "column", base: "column"}}>
          <Flex
            minWidth={"17%"}
            flexBasis={"17%"}
            shadow={"sm"}
            py={5}
            h="90vh"
            overflowY={"auto"}
            flexDir={"column"}
            rounded={{xl: "none", lg: "none", md: "lg", sm: "lg", base: "lg"}}
            gap={2}
          >
            {settingsMenus.map((menu, index) => (
              <Link
                key={index}
                px={4}
                py={2}
                color={menu.name != "Sign Out" ? "black" : "red"}
                onClick={() => {setSection(menu.name)}}
              >
                <Flex direction={"row"} gap={3} alignContent={"center"}>
                  <menu.icon className="size-6" />
                  <Text textStyle="md">{menu.name}</Text>
                </Flex>
              </Link>
            ))}
          </Flex>
           <Box p="5" h="full" w="full">
            <SectionController section={section} />
          </Box>
         
        </Flex>
      </Box>
    </Flex>
  );
}

// Section Controller Component
type SectionControllerProps = {
  section: string,
}

export function SectionController({ section }: SectionControllerProps) {
    if(section === "Sign Out"){
        return (
            <Logout /> 
        )
    }
}