import Header from "@/components/header";
import Footer from "@/components/footer";
import axios from "axios";
import styles from "@/styles/home.module.scss";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import Categories from "@/components/home/categories";
import { useMediaQuery } from "react-responsive";
import {
  gamingSwiper,
  homeImprovSwiper,
  women_accessories,
  women_dresses,
  women_shoes,
  women_swiper,
} from "@/data/home";
import ProductsSwiper from "@/components/poductsSwiper";
import db from "@/utils/db";
import Product from "@/models/ProductModel";
import ProductCard from "@/components/productCard";

export default function Home({ country, products }) {
  const isMedium = useMediaQuery({ query: "max-width:850" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  console.log(products);
  return (
    <>
      <Header country={country} />
      <main className={styles.home}>
        <section className={styles.container}>
          <Main />
          <FlashDeals />
          <div className={styles.home_category}>
            <Categories
              header="Dresses"
              products={women_dresses}
              bgColor="#5a31f4"
            />
            {!isMedium && (
              <Categories
                header="Shoes"
                products={women_shoes}
                bgColor="#f15f6f"
              />
            )}

            {isMobile && (
              <Categories
                header="Shoes"
                products={women_shoes}
                bgColor="#f15f6f"
              />
            )}

            <Categories
              header="Accessories"
              products={women_accessories}
              bgColor="#6cc070"
            />
          </div>
          <ProductsSwiper products={women_swiper} />
          <ProductsSwiper
            products={gamingSwiper}
            header="For Gamers"
            bgColor="#5a31f4"
          />
          <ProductsSwiper
            products={homeImprovSwiper}
            header="House improvements"
            bgColor="#6cc070"
          />
          <div className={styles.products}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps() {
  db.connectDb();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  // let data = await axios
  //   .get("https://api.ipregistry.co/?key=o106tfnsaxs1tytd")
  //   .then((res) => res.data.location.country)
  //   .catch((err) => console.log(err));

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      country: {
        name: "Bangladesh",
        flag: "https://cdn.ipregistry.co/flags/wikimedia/bd.svg",
      },
      // country: { name: data.name, flag: data.flag.wikimedia },
    },
  };
}
