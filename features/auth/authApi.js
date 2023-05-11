import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      login: builder.mutation({
        query(data) {
          return {
            url: "/auth/signup",
            method: "POST",
            body: data,
          };
        },
      }),
    };
  },
});

export const { useLoginMutation } = authApi;
