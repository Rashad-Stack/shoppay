import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://lws.herokuapp.com/api/v1" }),

  endpoints() {
    return {};
  },
});

export default apiSlice;
