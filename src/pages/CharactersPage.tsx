import {Alert, AlertIcon, Center, AlertTitle, AlertDescription} from "@chakra-ui/react";
import {useGetAllCharactersForSelfQuery} from "../services/character";
import { CharacterList } from "../components/character/CharacterList";

export const CharactersPage = () => {

	const { data: characters, error: charactersError} =
		useGetAllCharactersForSelfQuery();

	const activeCharacters = characters?.filter(it => it.status === "active" || it.status == null)
	const otherCharacters = characters?.filter(it => it.status !== "active" && it.status != null)

	return (
		<Center>
			<CharacterList activeCharacters={activeCharacters} otherCharacters={otherCharacters} />
			{!!charactersError && (
				<Alert status="error">
					<AlertIcon />
					<AlertTitle>There was an error while loading your characters</AlertTitle>
					<AlertDescription>
						{JSON.stringify(charactersError)}
					</AlertDescription>
				</Alert>
			)}
		</Center>
	);
};
