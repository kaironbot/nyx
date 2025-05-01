import {useNavigate, useParams} from "react-router-dom";
import {useStartInstanceQuery} from "../services/foundry";
import {Alert, AlertIcon, AlertTitle, Center, Flex, Heading, Progress} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";

export const RedirectPage = () => {
	const { instanceUrl } = useParams()
	const [progressValue, setProgressValue] = useState<number>(0);
	const navigate = useNavigate();
	const { data, isSuccess, isError } = useStartInstanceQuery(instanceUrl!!, { skip: !instanceUrl})

	useEffect(() => {
		if(!instanceUrl) {
			setTimeout(() => {
				navigate("/")
			}, 3000)
		}
	}, [instanceUrl, navigate])

	useEffect(() => {
		if(isSuccess) {
			setInterval(() => {
				setProgressValue(current => current + 1)
			}, 100)
		}
	}, [isSuccess])

	useEffect(() => {
		if (!!data && progressValue === 100) {
			window.location.replace(data)
		}
	}, [data, navigate, progressValue]);

	return <Center>
		{!instanceUrl && (
			<Alert status="error">
				<AlertIcon />
				<AlertTitle>Invalid redirect, you will return to the home page shortly</AlertTitle>
			</Alert>
		)}
		{isError && (
			<Alert status="error">
				<AlertIcon />
				<AlertTitle>Invalid foundry instance: {instanceUrl}</AlertTitle>
			</Alert>
		)}
		{isSuccess && <Flex direction="column" mt="5vh">
			<Heading>Instance successfully activated, you will be redirected shortly</Heading>
            <Progress value={progressValue} mt="2em"/>
		</Flex>}
	</Center>
};
