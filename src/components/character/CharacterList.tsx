import {Container, Heading, SimpleGrid, Skeleton, useBreakpointValue, VStack} from "@chakra-ui/react";
import { CharacterCard } from "./CharacterCard";
import { Character } from "../../models/character/Character";
import {cardsForSize} from "../../utils/character-utils";

export const CharacterList = ({
	activeCharacters,
	otherCharacters
}: {
	activeCharacters: Character<string>[] | undefined;
	otherCharacters: Character<string>[] | undefined;
}) => {
	const size = useBreakpointValue<{ cards: number }>(cardsForSize, {fallback: 'md'})
	return (
		<VStack spacing="2rem">
			{(activeCharacters == null || otherCharacters == null) && [1, 2, 3, 4, 5].map((it) => (
				<Container key={it}>
					<Skeleton height="10vh"></Skeleton>
				</Container>
			))}
			{!!activeCharacters && activeCharacters.length > 0 &&
				<>
					<Container>
						<Heading>Your active characters</Heading>
					</Container>
					<SimpleGrid columns={size?.cards ?? 3} spacing={2}>
						{!!activeCharacters &&
							activeCharacters.map((it) => (
								<CharacterCard key={it.id} character={it} linkToProfile={true}/>
							))}
					</SimpleGrid>
				</>
			}
			{!!otherCharacters && otherCharacters.length > 0 &&
				<>
					<Container>
						<Heading>Character history</Heading>
					</Container>
					<SimpleGrid columns={size?.cards ?? 3} spacing={2}>
						{!!activeCharacters &&
							activeCharacters.map((it) => (
								<CharacterCard key={it.id} character={it} linkToProfile={false}/>
							))}
					</SimpleGrid>
				</>
			}
		</VStack>
	);
};
