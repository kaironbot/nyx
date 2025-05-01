import { a2b } from "./string-utils";

export function isJwtInvalidOrExpired(jwt: string): boolean {
    return getJwtExpirationMillis(jwt) < new Date().getTime();
}

export function getJwtExpirationMillis(jwt: string): number {
    const parts = jwt.split(".");
    if (parts.length !== 3) {
        return 0;
    }
    const payload = JSON.parse(a2b(parts[1]));
    // Using the 'exp' string is safe to use as it is part of the JWT RFC and cannot be modified by us.
    return ("exp" in payload) && !isNaN(+payload["exp"]) ? (payload["exp"] * 1000) - 10000 : 0
}

export enum Role {
    ADMIN,
    MANAGE_SESSIONS,
    PLAYER,
    MANAGE_CHARACTERS,
    MANAGE_ITEMS,
    DELETE_ITEMS,
    MANAGE_FOUNDRY
}

const reverseEnum: { [key: string]: Role} = {
    "a": Role.ADMIN,
    "mS": Role.MANAGE_SESSIONS,
    "p": Role.PLAYER,
    "mC": Role.MANAGE_CHARACTERS,
    "mI": Role.MANAGE_ITEMS,
    "dI": Role.DELETE_ITEMS,
    "mF": Role.MANAGE_FOUNDRY
}

export function getRolesFromJwt(jwt: string | null): Role[] {
    if(!jwt) return [];
    const parts = jwt.split(".");
    if (parts.length !== 3) {
        throw Error("Invalid JWT format");
    }
    try {
        const rawRoles = JSON.parse(JSON.parse(a2b(parts[1]))["r"]) as string[];
        return rawRoles.map( it => {
            const role = reverseEnum[it]
            if(!!role) {
                return role
            } else {
                throw Error(`Invalid Roles: ${it}`);
            }
        })
    } catch(e) {
        return [];
    }
}