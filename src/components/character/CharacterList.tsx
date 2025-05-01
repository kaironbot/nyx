import {Container, Heading, SimpleGrid, Skeleton, useBreakpointValue, VStack} from "@chakra-ui/react";
import { CharacterCard } from "./CharacterCard";
import { Character } from "../../models/character/Character";
import {Size} from "../form/controls/LabelInput";

const cardsForSize: Record<Size, { cards: number }> = {
	xl: { cards: 4 },
	lg: { cards: 3 },
	md: { cards: 2 },
	sm: { cards: 1 },
	base: { cards: 1 },
}

export const CharacterList = ({
	activeCharacters,
	otherCharacters
}: {
	activeCharacters: Character<string>[] | undefined;
	otherCharacters: Character<string>[] | undefined;
}) => {
	const size = useBreakpointValue<{ cards: number }>(cardsForSize, {
		fallback: 'md',
	})
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
						{!!otherCharacters &&
							otherCharacters.map((it) => (
								<CharacterCard key={it.id} character={it} linkToProfile={false}/>
							))}
					</SimpleGrid>
				</>
			}
		</VStack>
	);
};
