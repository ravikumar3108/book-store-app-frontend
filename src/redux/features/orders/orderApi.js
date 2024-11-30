import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utilis/baseURL'

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: (builder.mutation)({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder
            })
        }),
        getOrdersByEmail: (builder.query)({
            query: (email) => ({
                url: `/email/${email}`,
            }),
            providesTags: ['Orders']
        })

    })

})

export const { useCreateOrderMutation, useGetOrdersByEmailQuery } = ordersApi
export default ordersApi;