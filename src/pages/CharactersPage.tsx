import {Alert, AlertIcon, Button, Center, AlertTitle, AlertDescription } from "@chakra-ui/react";
import { useGetAllCharactersForSelfQuery } from "../services/character";
import { CharacterList } from "../components/character/CharacterList";
import { useNavigate } from "react-router-dom";
import {PendingCharacterList} from "../components/character/PendingCharacterList";

export const CharactersPage = () => {

	const navigate = useNavigate();
	const { data: characters, error: charactersError} = useGetAllCharactersForSelfQuery();

	const activeCharacters = characters?.filter(it => it.status === "active" || it.status == null)
	const otherCharacters = characters?.filter(it => it.status !== "active" && it.status != null)

	// TODO: Visualizzare in maniera condizionale
	return (
		<Center>
			{/* 🔹 Pulsante per creare un nuovo personaggio */}
			<Button colorScheme="blue" alignSelf="flex-end" mb={4} onClick={() => {}/* Open modal */}>
				Crea Nuovo Personaggio
			</Button>

			<CharacterList activeCharacters={activeCharacters} otherCharacters={otherCharacters} />

			<PendingCharacterList />

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
