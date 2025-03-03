import {useGetAllActiveCharactersQuery} from "../../services/character";
import {
	Flex,
	Grid,
	GridItem,
	Icon,
	Input,
	InputGroup,
	InputLeftAddon,
	InputRightElement,
	Spinner,
	Text,
} from "@chakra-ui/react";
import {CharacterRow} from "../../components/character/CharacterRow";
import React, {useCallback, useEffect, useState} from "react";
import {Character, exp} from "../../models/character/Character";
import {SearchIcon, TriangleDownIcon, TriangleUpIcon} from "@chakra-ui/icons";

export const AllCharactersPage = () => {
	const { data: characters } = useGetAllActiveCharactersQuery()
	const [sortedCharacters, setSortedCharacters] = useState<Character<string>[]>([])
	const [sortProperty, setSortProperty] = useState<{ prop: string, dir: number } | undefined>(undefined)
	const [isTyping, setIsTyping] = useState(false);
	const [query, setQuery] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (characters != null) {
			setSortedCharacters([...characters])
		}
	}, [characters])

	const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		if(e.target.value.trim().length > 0) {
			setQuery(e.target.value.trim());
		} else {
			setQuery(undefined);
		}
	}

	const onSort = useCallback((property: string) => {
		const newParams = sortProperty?.prop === property
			? { prop: property, dir: sortProperty.dir * -1 }
			: { prop: property, dir: 1 }
		setSortProperty(newParams)
		setSortedCharacters(current => current.sort((a, b) => {
			// @ts-ignore
			const valA: string | number = property === "exp" || property === "lvl" ? exp(a) : (a[property] ?? 0)
			// @ts-ignore
			const valB: string | number = property === "exp" || property === "lvl" ? exp(b) : (b[property] ?? 0)


			if (typeof valA === "number" && typeof valB === "number") {
				return (valA - valB) * newParams.dir
			}
			if (typeof valA === "string" && typeof valB === "string") {
				return valA.localeCompare(valB) * newParams.dir
			}
			return 0
		}))
	}, [sortProperty])

	useEffect(() => {
		setIsTyping(true);
		const timeoutId = setTimeout(() => {
			if(query != null && query.length >= 1) {
				setSortedCharacters(current => current.filter(it => {
					const parsedQuery = query.toLowerCase().replace(" ", "")
					const parsedName = it.name.toLowerCase().replace(" ", "")
					return parsedName.includes(parsedQuery)
				}))
			} else if (characters != null) {
				setSortedCharacters([...characters])
			}
			setIsTyping(false);
		}, 300);

		return () => clearTimeout(timeoutId)
	}, [characters, query])

	return (<Flex mr="2em" ml="2em" direction="column">
		<InputGroup mb="1em">
			<InputLeftAddon><SearchIcon /></InputLeftAddon>
			<Input id="item-search-bar" placeholder="Search" minWidth="75vw" onChange={onChangeFilter}/>
			{isTyping && <InputRightElement><Spinner /></InputRightElement>}
		</InputGroup>
		<Grid templateColumns='repeat(6, 1fr)' gap={6}>
			<GridItem>
				<Flex align="center">
					<Text
						as="b"
						fontSize="xl"
						_hover={{ cursor: "pointer" }}
						onClick={() => onSort("name")}
						mr="0.5em"
					>Name</Text>
					{ sortProperty?.prop === "name" && sortProperty.dir === 1 && <Icon as={TriangleUpIcon} boxSize={4} />}
					{ sortProperty?.prop === "name" && sortProperty.dir === -1 && <Icon as={TriangleDownIcon} boxSize={4} />}
				</Flex>
			</GridItem>
			<GridItem>
				<Flex align="center">
					<Text
						as="b"
						fontSize="xl"
						_hover={{ cursor: "pointer" }}
						onClick={() => onSort("created")}
						mr="0.5em"
					>Created</Text>
					{ sortProperty?.prop === "created" && sortProperty.dir === 1 && <Icon as={TriangleUpIcon} boxSize={4} />}
					{ sortProperty?.prop === "created" && sortProperty.dir === -1 && <Icon as={TriangleDownIcon} boxSize={4} />}
				</Flex>
			</GridItem>
			<GridItem>
				<Flex align="center">
					<Text
						as="b"
						fontSize="xl"
						_hover={{ cursor: "pointer" }}
						onClick={() => onSort("exp")}
						mr="0.5em"
					>Exp</Text>
					{ sortProperty?.prop === "exp" && sortProperty.dir === 1 && <Icon as={TriangleUpIcon} boxSize={4} />}
					{ sortProperty?.prop === "exp" && sortProperty.dir === -1 && <Icon as={TriangleDownIcon} boxSize={4} />}
				</Flex>
			</GridItem>
			<GridItem>
				<Flex align="center">
					<Text
						as="b"
						fontSize="xl"
						_hover={{ cursor: "pointer" }}
						onClick={() => onSort("lvl")}
						mr="0.5em"
					>Level</Text>
					{ sortProperty?.prop === "lvl" && sortProperty.dir === 1 && <Icon as={TriangleUpIcon} boxSize={4} />}
					{ sortProperty?.prop === "lvl" && sortProperty.dir === -1 && <Icon as={TriangleDownIcon} boxSize={4} />}
				</Flex>
			</GridItem>
			<GridItem>
				<Flex align="center">
					<Text
						as="b"
						fontSize="xl"
						_hover={{ cursor: "pointer" }}
						onClick={() => onSort("money")}
						mr="0.5em"
					>Money</Text>
					{ sortProperty?.prop === "money" && sortProperty.dir === 1 && <Icon as={TriangleUpIcon} boxSize={4} />}
					{ sortProperty?.prop === "money" && sortProperty.dir === -1 && <Icon as={TriangleDownIcon} boxSize={4} />}
				</Flex>
			</GridItem>
			<GridItem>
				<Flex align="center">
					<Text
						as="b"
						fontSize="xl"
						_hover={{ cursor: "pointer" }}
						onClick={() => onSort("lastPlayed")}
						mr="0.5em"
					>Last Played</Text>
					{ sortProperty?.prop === "lastPlayed" && sortProperty.dir === 1 && <Icon as={TriangleUpIcon} boxSize={4} />}
					{ sortProperty?.prop === "lastPlayed" && sortProperty.dir === -1 && <Icon as={TriangleDownIcon} boxSize={4} />}
				</Flex>
			</GridItem>
			{sortedCharacters.map(it => <CharacterRow key={it.id} character={it} />)}
		</Grid>
	</Flex>)
}