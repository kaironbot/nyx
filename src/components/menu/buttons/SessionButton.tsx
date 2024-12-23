import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Role } from "../../../utils/jwt-utils";

export const SessionButton = ({ roles, backgroundColor }: { roles: Role[], backgroundColor: string }) => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                background={backgroundColor}
                backdropFilter="saturate(180%) blur(5px)"
                borderRadius='0'
            >
                Sessions
            </MenuButton>
            <MenuList>
                <Link to="/session/list"><MenuItem>List Sessions</MenuItem></Link>
                {roles.includes(Role.MANAGE_SESSIONS) &&<Link to="/session/insert"><MenuItem>Insert Session</MenuItem></Link>}
            </MenuList>
        </Menu>
    );
};
