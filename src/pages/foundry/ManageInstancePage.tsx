import {useStreamInstancesInfoQuery} from "../../services/foundry";
import {Alert, AlertIcon, AlertTitle, Center, Flex, Grid, GridItem, Heading, Text} from "@chakra-ui/react";
import {StackedSkeleton} from "../../components/ui/StackedSkeleton";
import React from "react";
import {FoundryRow} from "../../components/foundry/FoundryRow";

export const ManageInstancePage = () => {

	const { data, isLoading, isError, isSuccess } = useStreamInstancesInfoQuery();

	return (<Flex mr="4em" ml="4em" direction="column">
		<Center pb="2em">
			<Heading>Manage Foundry Instances</Heading>
		</Center>
		{isLoading && <StackedSkeleton quantity={5} height="6vh"/>}
		{isError && (
			<Alert status="error">
				<AlertIcon />
				<AlertTitle>There was an error while loading the instances</AlertTitle>
			</Alert>
		)}
		{isSuccess && (
			<Grid templateColumns='repeat(8, 1fr)' gap={4}>
				<GridItem>
					<Flex align="center">
						<Text
							as="b"
							fontSize="xl"
							mr="0.5em"
						>Instance Name</Text>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex align="center">
						<Text
							as="b"
							fontSize="xl"
							mr="0.5em"
						>Master</Text>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex align="center">
						<Text
							as="b"
							fontSize="xl"
							mr="0.5em"
						>Uptime</Text>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex align="center">
						<Text
							as="b"
							fontSize="xl"
							mr="0.5em"
						>Status</Text>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex align="center">
						<Text
							as="b"
							fontSize="xl"
							mr="0.5em"
						>CPU</Text>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex align="center">
						<Text
							as="b"
							fontSize="xl"
							mr="0.5em"
						>RAM</Text>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex align="center">
						<Text
							as="b"
							fontSize="xl"
							mr="0.5em"
						>Disk Occupation</Text>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex align="center">
						<Text
							as="b"
							fontSize="xl"
							mr="0.5em"
						>Terminate</Text>
					</Flex>
				</GridItem>
				{data != null && data["deposito-pg"] != null && <FoundryRow instanceInfo={data["deposito-pg"]} />}
				{data != null && Object.values(data)
					.filter(it => it.id !== "deposito-pg")
					.map(it => <FoundryRow key={it.id} instanceInfo={it} />)
				}
			</Grid>
		)}
	</Flex>)
}
