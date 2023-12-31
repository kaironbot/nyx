import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthState } from "../store/auth/auth-slice";
import { Label } from "../models/label/Label";
import { LabelType } from "../models/label/LabelType";

interface LabelApiParameters {
    labelType: LabelType | undefined;
}

export const labelApi = createApi({
    reducerPath: "labelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_KAIRON_API_URL}/label`,
        mode: "cors",
        prepareHeaders: async (headers, api) => {
            const {
                auth: { jwt },
            } = api.getState() as { auth: AuthState };
            headers.set("Authorization", `Bearer ${jwt}`);
            headers.set("Access-Control-Allow-Origin", "*");
        },
    }),
    keepUnusedDataFor: 300,
    endpoints: (build) => ({
        getLabels: build.query<Label[], LabelApiParameters>({
            query: (params: LabelApiParameters) =>
                `${!!params.labelType ? `?labelType=${params.labelType}` : ""}`,
        }),
    }),
});

export const { useGetLabelsQuery } = labelApi;
