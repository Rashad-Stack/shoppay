import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

export default function cart() {
  return (
    <>
      <Header country={country} />
      <Footer country={country} />
    </>
  );
}

const country = {
  name: "Bangladesh",
  flag: "https://cdn.ipregistry.co/flags/wikimedia/bd.svg",
};
