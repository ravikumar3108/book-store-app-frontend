import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from '../../../utilis/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('booktoken')
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`)
        }
        return Headers;
    }
})

const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/getallbooks",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (results, err, id) => [{ type: "Books", id }]
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/createbook`,
                method: 'POST',
                body: newBook
            }),
            invalidatesTags: ['Books']
        }),
        updateBook: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Books']
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete/${id}`,
                method: 'POST',

            }),
            invalidatesTags: ['Books']
        })

    })

})


export const { useFetchAllBooksQuery, useFetchBookByIdQuery, useAddBookMutation, useDeleteBookMutation, useUpdateBookMutation } = booksApi
export default booksApi;