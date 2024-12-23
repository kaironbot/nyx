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
          { path: ":characterId", element: <CharacterPage />}
        ]
      },
      {
        path: "session",
        element: <AuthenticatedLayout />,
        children: [
          { path: "list", element: <ListSessionsPage /> },
          { path: "insert", element: <InsertSessionPage /> }
        ]
      },
      {
        path: "character",
        element: <AuthenticatedLayout />,
        children: [
          { path: "update", element: <AddErrataPage /> }
        ]
      },
      {
        path: "item",
        element: <AuthenticatedLayout />,
        children: [
          { path: "list", element: <AllItemsPage /> },
          { path: "add", element: <AddItemPage /> }
        ]
      }
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
