import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthState} from "../store/auth/auth-slice";
import {InstanceInfo} from "../models/foundry/InstanceInfo";
import {QueryReturnValue} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {FetchBaseQueryError} from "@reduxjs/toolkit/dist/query/react";

export const foundryApi = createApi({
    reducerPath: "foundryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_KAIRON_API_URL}/foundry`,
    }),
    endpoints: (builder) => ({
        startInstance: builder.query<string, string>({
            query: instanceUrl => ({
                url: `/inactive/${instanceUrl}`,
                responseHandler: 'text'
            }),
        }),
        stopInstance: builder.mutation<string, string>({
             queryFn: async (instanceId, api, _, baseMutation) => {
                const {
                    auth: { jwt },
                } = api.getState() as { auth: AuthState }

                return baseMutation({
                    url: `/${instanceId}`,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        'Access-Control-Allow-Origin': '*',
                    },
                    responseHandler: 'text',
                }) as QueryReturnValue<string, FetchBaseQueryError>
            }
        }),
        streamInstancesInfo: builder.query<{[key: string]: InstanceInfo}, void>({
            queryFn: () => ({ data: {} }),
            async onCacheEntryAdded(
                _,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }
            ) {
                await cacheDataLoaded
                const {
                    auth: { jwt },
                } = getState() as unknown as { auth: AuthState }
                const eventSource = new EventSource(`${process.env.REACT_APP_KAIRON_API_URL}/foundry/info?jwt=${jwt}`)

                eventSource.addEventListener("foundry-info", (event: MessageEvent) => {
                    const newData: {[key: string]: InstanceInfo} = JSON.parse(event.data);
                    updateCachedData((_) => {
                        return newData
                    })
                })

                eventSource.onerror = (error) => {
                    console.error('SSE error:', error);
                    eventSource.close()
                };

                await cacheEntryRemoved;
                eventSource.close()
            },
        }),
    }),
});

export const {
    useStartInstanceQuery,
    useStopInstanceMutation,
    useStreamInstancesInfoQuery
} = foundryApi;
