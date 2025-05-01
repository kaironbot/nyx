import {Box, Flex, useColorMode} from "@chakra-ui/react";
import { SessionButton } from "./buttons/SessionButton";
import { Role } from "../../utils/jwt-utils";
import { useGetCurrentMemberQuery } from "../../services/guild";
import { AvatarIcon } from "./AvatarIcon";
import React from "react";
import { CharacterButton } from "./buttons/CharacterButton";
import { ItemButton } from "./buttons/ItemButton";
import {PlayerButton} from "./buttons/PlayerButton";
import {hasRole} from "../../utils/role-utils";
import {FoundryButton} from "./buttons/FoundryButton";

export const TopMenu = ({ roles }: { roles: Role[] }) => {
	const { colorMode } = useColorMode()
	const { data: member } = useGetCurrentMemberQuery();
	const backgroundColor = colorMode === "light" ? "rgb(255, 255, 255, 0.7)" : "rgb(26, 32, 44, 0.7)"

	return (
		<Flex
			as="header"
			w="100vw"
			h="5vh"
			position="fixed"
			zIndex="sticky"
			background={backgroundColor}
			pl="30vw"
			backdropFilter="saturate(180%) blur(5px)"
		>
			<SessionButton roles={roles} backgroundColor={backgroundColor} />
			<CharacterButton roles={roles} backgroundColor={backgroundColor} />
			<PlayerButton roles={roles} backgroundColor={backgroundColor}/>
			<ItemButton roles={roles} backgroundColor={backgroundColor}/>
			{hasRole(roles, Role.MANAGE_SESSIONS) && <FoundryButton backgroundColor={backgroundColor}/>}
			<Box position="absolute" right="2vw" paddingTop="0.25em">
				<AvatarIcon user={member} />
			</Box>
		</Flex>
	);
};
