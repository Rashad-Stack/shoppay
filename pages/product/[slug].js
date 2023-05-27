import React, { useState } from "react";
import styles from "@/styles/product.module.scss";
import Product from "@/models/ProductModel";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Category from "@/models/CategoryModel";
import SubCategory from "@/models/SubCategoryModel";
import MainSwiper from "@/components/productPage/mainSwiper";
import Infos from "@/components/productPage/infos";
import db from "@/utils/db";

export default function ProductDetails({ product }) {
  const [activeImg, setActiveImg] = useState("");
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Header country="" />
      <div className={styles.product}>
        <div className={styles.product_container}>
          <div className={styles.path}>
            Home / {product.category.name}{" "}
            {product.subCategories.map((sub, i) => (
              <span key={i}> / {sub.name}</span>
            ))}
          </div>
          <div className={styles.product_main}>
            <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos product={product} activeImg={activeImg} />
          </div>
        </div>
      </div>
      <Footer country="" />
    </>
  );
}

export async function getServerSideProps(context) {
  db.connectDb();
  const { query } = context;
  const { slug, style, size = 0 } = query;

  const product = await Product.findOne({
    slug,
  })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategory._id", model: SubCategory })
    .lean();
  const subProduct = product.subProducts[style];
  const prices = subProduct.sizes.map((p) => p.price).sort((a, b) => a - b);

  const newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => p.color),
    priceRange: subProduct.discount
      ? `From $${(prices[0] - prices[0] / subProduct.discount).toFixed(
          2
        )} to $${(
          prices[prices.length - 1] -
          prices[prices.length - 1] / subProduct.discount
        ).toFixed(2)}`
      : `From $${prices[0]} to $${prices[prices.length - 1]}`,
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            subProduct.sizes[size].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
  };

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
