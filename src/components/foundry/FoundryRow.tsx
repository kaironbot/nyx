import {
	Badge, Button,
	GridItem,
	Link,
	Text
} from "@chakra-ui/react";
import React from "react";
import {InstanceInfo} from "../../models/foundry/InstanceInfo";
import {useStopInstanceMutation} from "../../services/foundry";

interface FoundryRowProps {
	instanceInfo: InstanceInfo
}

export const FoundryRow = ({ instanceInfo }: FoundryRowProps) => {
	const [stopInstance] = useStopInstanceMutation()
	return (
		<>
			<GridItem display="flex" alignItems="center">
				<Link color='teal.500' href={instanceInfo.url} isExternal>
					{instanceInfo.id}
				</Link>
			</GridItem>
			<GridItem display="flex" alignItems="center">
				<Text>{instanceInfo.masterName}</Text>
			</GridItem>
			<GridItem display="flex" alignItems="center">
				<Text>{computeTtl(instanceInfo.uptime)}</Text>
			</GridItem>
			<GridItem display="flex" alignItems="center">
				{instanceInfo.status === "online" && <Badge colorScheme='green'>ONLINE</Badge>}
				{instanceInfo.status === "stopped" && <Badge colorScheme='red'>STOPPED</Badge>}
				{instanceInfo.status !== "stopped"
					&& instanceInfo.status !== "online"
					&& <Badge colorScheme='yellow'>{instanceInfo.status.toUpperCase()}</Badge>}
			</GridItem>
			<GridItem display="flex" alignItems="center">
				<Text>{Math.ceil(instanceInfo.cpu * 100)}%</Text>
			</GridItem>
			<GridItem display="flex" alignItems="center">
				<Text>{Math.ceil(instanceInfo.memory / 1024 / 1024)} Mb</Text>
			</GridItem>
			<GridItem display="flex" alignItems="center">
				<Text>{Math.ceil(instanceInfo.diskSize / 1024 / 1024)} Mb</Text>
			</GridItem>
			<GridItem display="flex" alignItems="center">
				<Button colorScheme="red" onClick={() => {stopInstance(instanceInfo.id)}}>Terminate {instanceInfo.id}</Button>
			</GridItem>
		</>
	)
}

function computeTtl(timestamp: number) {
	const differenceInMinutes = Math.floor((new Date().getTime() - timestamp) / 1000 / 60)
	const days = Math.floor(differenceInMinutes / 60 / 24)
	const hours = Math.floor((differenceInMinutes - days * 60 * 24) / 60)
	const minutes = differenceInMinutes - days * 60 * 24 - hours * 60
	return `${days > 0 ? `${days}D ` : ''}${hours > 0 ? `${hours}H ` : ''}${minutes}m`
}