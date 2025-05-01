import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const FoundryButton = ({ backgroundColor }: { backgroundColor: string }) => {
	return (
		<Menu>
			<MenuButton
				as={Button}
				rightIcon={<ChevronDownIcon />}
				background={backgroundColor}
				backdropFilter="saturate(180%) blur(5px)"
				borderRadius='0'
			>
				Foundry
			</MenuButton>
			<MenuList>
				<Link to="/foundry/instances"><MenuItem>Manage Instances</MenuItem></Link>
			</MenuList>
		</Menu>
	);
};
