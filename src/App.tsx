import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { CharactersPage } from './pages/CharactersPage';
import { CharacterPage } from './pages/characters/CharacterPage';
import { AuthenticatedLayout } from './pages/layouts/AuthenticatedLayout';
import { AuthPage } from './pages/AuthPage';
import { InsertSessionPage } from './pages/sessions/InsertSessionPage';
import { AddErrataPage } from "./pages/errata/AddErrataPage";
import { ListSessionsPage } from './pages/sessions/ListSessionsPage';
import { AllItemsPage } from './pages/items/AllItemsPage';
import {AddItemPage} from "./pages/items/AddItemPage";
import {GiveRandomItemPage} from "./pages/characters/GiveRandomItemPage";
import {ItemUsagePage} from "./pages/items/ItemUsagePage";
import {SessionsStatsPage} from "./pages/sessions/SessionsStatsPage";
import {AllCharactersPage} from "./pages/characters/AllCharactersPage";
import {AllPlayersPage} from "./pages/players/AllPlayersPage";
import CharacterSheetPage from "./pages/CharacterSheetPage";

const router = createBrowserRouter([
	{
		path: "/",
		children: [
		
			{ index: true, element: <HomePage /> },
			{ path: "auth", element: <AuthPage /> },
			{
				path: "user",
				element: <AuthenticatedLayout />,
				children : [
					{ index: true, element: <CharactersPage /> },
					{ path: ":characterId", element: <CharacterPage />},
					{ path: ":characterCreation", element: <CharacterSheetPage />}
				]
			},
			{
				path: "session",
				element: <AuthenticatedLayout />,
				children: [
					{ path: "list", element: <ListSessionsPage /> },
					{ path: "insert", element: <InsertSessionPage /> },
					{ path: "stats", element: <SessionsStatsPage /> }
				]
			},
			{
				path: "character",
				element: <AuthenticatedLayout />,
				children: [
					{ path: "update", element: <AddErrataPage /> },
					{ path: "giveRandomItem", element: <GiveRandomItemPage /> },
					{ path: "all", element: <AllCharactersPage /> },
					{ path: "sheet", element: <CharacterSheetPage /> }
				]
			},
			{
				path: "player",
				element: <AuthenticatedLayout />,
				children: [
					{ path: "all", element: <AllPlayersPage /> },
				]
			},
			{
				path: "item",
				element: <AuthenticatedLayout />,
				children: [
					{ path: "list", element: <AllItemsPage /> },
					{ path: "add", element: <AddItemPage /> },
					{ path: "usage", element: <ItemUsagePage /> }
				]
			}
		],
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
