import {FetchBaseQueryError, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthState} from "../store/auth/auth-slice";
import {Character} from "../models/character/Character";
import {Player} from "../models/player/Player";
import {StatusResponse} from "../models/response/StatusResponse";
import {AddErrataDto} from "../models/character/errata/AddErrataDto";
import {AllCharactersTag, CharactersTagType, CurrentCharactersTag, TokenTagType} from "./tags";
import { UpdateInventoryDto } from "../models/character/UpdateInventoryDto";
import { CharacterToken } from "../models/character/sheet/CharacterToken";
import { UpdateTokenDto } from "../models/dto/UpdateTokenDto";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

export const characterApi = createApi({
	reducerPath: "characterApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `${process.env.REACT_APP_KAIRON_API_URL}/character/`,
		mode: "cors",
		prepareHeaders: async (headers, api) => {
			const {
				auth: { jwt },
			} = api.getState() as { auth: AuthState };
			headers.set("Authorization", `Bearer ${jwt}`);
			headers.set("Access-Control-Allow-Origin", "*");
		},
	}),
	tagTypes: [CharactersTagType, TokenTagType],
	endpoints: (build) => ({
		addErrata: build.mutation<StatusResponse, AddErrataDto>({
			query: (args: AddErrataDto) => ({
				url: `${args.characterId}/errata`,
				method: "POST",
				body: JSON.stringify(args.errata),
				headers: {
					"Content-type": "application/json",
					"Access-Control-Allow-Origin": "*"
				},
			}),
			invalidatesTags: [AllCharactersTag]
		}),
		getCurrentActiveCharacters: build.query<Character<string>[], void>({
			query: () => "current",
			providesTags: [CurrentCharactersTag]
		}),
		getAllCharactersForSelf: build.query<Character<string>[], void>({
			query: () => "forSelf",
			providesTags: [CurrentCharactersTag]
		}),
		getAllActiveCharacters: build.query<Character<string>[], void>({
			query: () => "active",
			providesTags: [AllCharactersTag]
		}),
		getAllActiveCharactersWithPlayer: build.query<Character<Player>[], void>({
			query: () => "active/withPlayer",
			providesTags: [AllCharactersTag]
		}),
		getCharacterById: build.query<Character<string>, string>({
			query: (characterId: string) => `${characterId}`,
			providesTags: (character) =>
				!!character ? [{ type: CharactersTagType, id: character.id }, AllCharactersTag] : [AllCharactersTag]
		}),
		updateInventory: build.mutation<StatusResponse, UpdateInventoryDto>({
			query: (payload: UpdateInventoryDto) => ({
				url: `/${payload.characterId}/inventory`,
				method: "POST",
				body: JSON.stringify({itemId: payload.itemId, qty: payload.qty, operation: payload.operation}),
				headers: {
					"Content-type": "application/json",
					"Access-Control-Allow-Origin": "*"
				},
			}),
			invalidatesTags: (_response, _error, payload) => [{ type: CharactersTagType, id: payload.characterId }]
		}),
		getCharacterToken: build.query<CharacterToken | null, string>({
			queryFn: async (characterId: string, queryApi, extraOptions, baseQuery) => {
				const result = await baseQuery(`/${characterId}/token`);
				if(!!result.error && 'status' in result.error && result.error.status === 404) {
					return { data: null, error: undefined } as QueryReturnValue<CharacterToken | null, FetchBaseQueryError>;
				} else if(!!result.error) {
					return {
						error: {
							status: result.meta?.response?.status,
							data: "An error occurred"
						} } as QueryReturnValue<CharacterToken | null, FetchBaseQueryError>;
				}
				return result as QueryReturnValue<CharacterToken, FetchBaseQueryError>
			},
			providesTags: (_response, _error, id) => [{ type: TokenTagType, id }]
		}),
		updateCharacterToken: build.mutation<StatusResponse, UpdateTokenDto>({
			query: (payload: UpdateTokenDto) => {
				const bodyFormData = new FormData();
				bodyFormData.append('file', payload.token)
				return {
					url: `/${payload.characterId}/token`,
					method: "POST",
					body: bodyFormData,
					headers: {
						"Access-Control-Allow-Origin": "*"
					},
				}
			},
			invalidatesTags: (_response, _error, payload) => [{ type: TokenTagType, id: payload.characterId }]
		}),
		// 🔹 Recupera tutti i pending characters
		getPendingCharacters: build.query<Character<any>[], void>({
			query: () => "pending",
			providesTags: [AllCharactersTag],
		}),

		// 🔹 Crea un nuovo pending character
		createPendingCharacter: build.mutation<Character<any>, Partial<Character<any>>>({
			query: (newCharacter) => ({
				url: "pending",
				method: "POST",
				body: JSON.stringify(newCharacter),
				headers: {
					"Content-type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}),
			invalidatesTags: [AllCharactersTag],
		}),

		// 🔹 Recupera un pending character per ID
		getPendingCharacterById: build.query<Character<any>, string>({
			query: (characterId) => `pending/${characterId}`,
			providesTags: (character) =>
				character ? [{ type: CharactersTagType, id: character.id }, AllCharactersTag] : [AllCharactersTag],
		}),

		// 🔹 Aggiorna un pending character
		updatePendingCharacter: build.mutation<Character<any>, { id: string; data: Partial<Character<any>> }>({
			query: ({ id, data }) => ({
				url: `pending/${id}`,
				method: "PATCH",
				body: JSON.stringify(data),
				headers: {
					"Content-type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}),
			invalidatesTags: (result, error, { id }) => [{ type: CharactersTagType, id }],
		}),

		// 🔹 Elimina un pending character
		deletePendingCharacter: build.mutation<void, string>({
			query: (id) => ({
				url: `pending/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [AllCharactersTag],
		}),
	}),
});

export const {
	useAddErrataMutation,
	useGetAllActiveCharactersQuery,
	useGetAllActiveCharactersWithPlayerQuery,
	useGetCharacterByIdQuery,
	useGetAllCharactersForSelfQuery,
	useGetCharacterTokenQuery,
	useGetCurrentActiveCharactersQuery,
	useUpdateCharacterTokenMutation,
	useUpdateInventoryMutation,
	// 🔹 Nuove API per Pending Characters
	useGetPendingCharactersQuery,
	useCreatePendingCharacterMutation,
	useGetPendingCharacterByIdQuery,
	useUpdatePendingCharacterMutation,
	useDeletePendingCharacterMutation,
} = characterApi;
