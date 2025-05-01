import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/auth-slice";
import { guildApi } from "../services/guild";
import { authListenerMiddleware } from "./auth/auth-middleware";
import { authApi } from "../services/auth";
import { characterApi } from "../services/character";
import { labelApi } from "../services/label";
import { sessionApi } from "../services/session";
import { itemApi } from "../services/item";
import {recipesReducer} from "./recipes/recipes-slice";
import {playerApi} from "../services/player";
import {utilitiesApi} from "../services/utilities";
import {foundryApi} from "../services/foundry";


export const store = configureStore({
	reducer: {
		auth: authReducer,
		recipes: recipesReducer,
		[guildApi.reducerPath]: guildApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[characterApi.reducerPath]: characterApi.reducer,
		[itemApi.reducerPath]: itemApi.reducer,
		[labelApi.reducerPath]: labelApi.reducer,
		[playerApi.reducerPath]: playerApi.reducer,
		[sessionApi.reducerPath]: sessionApi.reducer,
		[utilitiesApi.reducerPath]: utilitiesApi.reducer,
		[foundryApi.reducerPath]: foundryApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.prepend(authListenerMiddleware.middleware)
			.concat(guildApi.middleware)
			.concat(authApi.middleware)
			.concat(characterApi.middleware)
			.concat(labelApi.middleware)
			.concat(sessionApi.middleware)
			.concat(itemApi.middleware)
			.concat(playerApi.middleware)
			.concat(utilitiesApi.middleware)
			.concat(foundryApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch