import {useCreatePendingCharacterMutation, useGetPendingCharactersQuery} from "../../services/character";
import {Container, Heading, SimpleGrid, Skeleton, useBreakpointValue, VStack} from "@chakra-ui/react";
import {cardsForSize} from "../../utils/character-utils";

export const PendingCharacterList = () => {
	const size = useBreakpointValue<{ cards: number }>(cardsForSize, {fallback: 'md'})
	const { data: pendingCharacters, error: pendingError } = useGetPendingCharactersQuery()

	return (
		<VStack spacing="2rem">
			{pendingCharacters == null && [1, 2, 3, 4, 5].map((it) => (
				<Container key={it}>
					<Skeleton height="10vh"></Skeleton>
				</Container>
			))}
			{pendingCharacters != null && pendingCharacters.length > 0 &&
                <>
                    <Container>
                        <Heading>Your pending characters</Heading>
                    </Container>
                    <SimpleGrid columns={size?.cards ?? 3} spacing={2}>
						{pendingCharacters.map((it) => (
							<></>
								// TODO Un'altra card che cliccando apre un modal col form
							))}
                    </SimpleGrid>
                </>
			}
		</VStack>
	);
}