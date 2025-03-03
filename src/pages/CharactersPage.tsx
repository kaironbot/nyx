import {Alert, AlertIcon, Box, Button, Center, AlertTitle, AlertDescription, useBreakpointValue, VStack, Text} from "@chakra-ui/react";
import {useCreatePendingCharacterMutation, useGetAllCharactersForSelfQuery, useGetPendingCharactersQuery} from "../services/character";
import { CharacterList } from "../components/character/CharacterList";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCard } from "../components/character/CharacterCard";
import { exp } from "../models/character/Character"

export const CharactersPage = () => {

	const navigate = useNavigate();
	const { data: characters, error: charactersError} =
		useGetAllCharactersForSelfQuery();
	
	 // 🔹 Query per prendere i pending characters dal backend
	 const { data: pendingCharacters = [], error: pendingError, refetch } = useGetPendingCharactersQuery();

	 // 🔹 Mutation per creare un nuovo pending character
	 const [createPendingCharacter] = useCreatePendingCharacterMutation();
   
	 // 🔹 Pulsante per creare un nuovo personaggio -> lo salva nel backend e poi naviga
	 const handleCreateNewCharacter = async () => {
		try {
		  const newCharacter = {
			name: "Nuovo Personaggio",
			characterClass: [],
			background: "",
			race: "",
			age: 0,
			features: "",
			equipment: "",
			tools_languages: "",
			backstory: "",
			spells: "",
			strength: 10,
			dexterity: 10,
			constitution: 10,
			intelligence: 10,
			wisdom: 10,
			charisma: 10,
			skills: {},
		  };
   
		 // 🔹 Crea il pending character nell'API
		 const response = await createPendingCharacter(newCharacter).unwrap();
   
		 // 🔹 Dopo aver creato il personaggio, aggiorna la lista e naviga
		 refetch();
		 navigate(`/character/sheet?id=${response.id}&edit=true`);
	   } catch (error) {
		 console.error("Errore nella creazione del personaggio:", error);
	   }
	 };

	const activeCharacters = characters?.filter(it => it.status === "active" || it.status == null)
	const otherCharacters = characters?.filter(it => it.status !== "active" && it.status != null)

	return (
		<Center>
			{/* 🔹 Pulsante per creare un nuovo personaggio */}
			<Button colorScheme="blue" alignSelf="flex-end" mb={4} onClick={handleCreateNewCharacter}>
        		Crea Nuovo Personaggio
      		</Button>

			<CharacterList activeCharacters={activeCharacters} otherCharacters={otherCharacters} />
			
			{/* 🔹 Sezione Pending Characters */}
			{pendingCharacters.length > 0 && (
				<VStack align="start" mt={6} width="100%">
					<Text as="b" fontSize="xl">Pending Characters</Text>
					{pendingCharacters.map((char) => (
						<CharacterCard 
							key={char.id} 
							character={char} 
							linkToProfile={`/character/sheet?id=${char.id}&edit=false`} // 🔹 Link per editare
						/>
					))}
				</VStack>
			)}

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
