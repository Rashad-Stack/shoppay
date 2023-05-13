import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import styles from "@/styles/home.module.scss";
import Main from "@/components/home/main";

export default function Home({ country }) {
  return (
    <>
      <Header country={country} />
      <main className={styles.home}>
        <section className={styles.container}>
          <Main />
        </section>
      </main>
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
