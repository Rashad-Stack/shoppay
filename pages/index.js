import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country }) {
  return (
    <>
      <Header country={country} />
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  // let data = await axios
  //   .get("https://api.ipregistry.co/?key=o106tfnsaxs1tytd")
  //   .then((res) => res.data.location.country)
  //   .catch((err) => console.log(err));

  return {
    props: {
      country: {
        name: "Bangladesh",
        flag: "https://cdn.ipregistry.co/flags/wikimedia/bd.svg",
      },
      // country: { name: data.name, flag: data.flag.wikimedia },
    },
  };
}
