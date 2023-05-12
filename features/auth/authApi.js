import { signIn } from "next-auth/react";
import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      register: builder.mutation({
        query(data) {
          return {
            url: "/auth/signup",
            method: "POST",
            body: data,
          };
        },

        async onQueryStarted(data, { queryFulfilled, dispatch }) {
          const { data: result } = await queryFulfilled;

          if (result?.status === "success") {
            const { email, password } = data || {};
            if (result) {
              let options = {
                redirect: false,
                email: email,
                password: password,
              };
              await signIn("credentials", options);
            }
          }
        },
      }),
      forgotPassword: builder.mutation({
        query(email) {
          return {
            url: "/auth/forgot",
            method: "POST",
            body: { email },
          };
        },
      }),
    };
  },
});

export const { useRegisterMutation, useForgotPasswordMutation } = authApi;
