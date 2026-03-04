import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber } = {}) => ({
                url: PRODUCTS_URL,
                params: {
                    keyword,
                    pageNumber,
                },
            }),
            providesTags: (result) =>
                result?.products
                    ? [
                        ...result.products.map((p) => ({ type: "Product", id: p._id })),
                        { type: "Products", id: "LIST" },
                    ]
                    : [{ type: "Products", id: "LIST" }],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            providesTags: (result, error, id) => [{ type: "Product", id }],
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: "POST",
            }),
            invalidatesTags: [{ type: "Products", id: "LIST" }],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, data) => [
                { type: "Product", id: data.productId },
                { type: "Products", id: "LIST" },
            ],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                // send multipart/form-data to the image upload route
                url: `${UPLOAD_URL}`,
                method: "POST",
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Product", id },
                { type: "Products", id: "LIST" },
            ],
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, data) => [
                { type: "Product", id: data.productId },
            ],
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
} = productsApiSlice;