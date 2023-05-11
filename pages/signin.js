import Footer from "@/components/footer";
import Header from "@/components/header";
import React, { useEffect, useState } from "react";
import styles from "@/styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "@/components/Inputs/logininput";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import { getProviders, signIn } from "next-auth/react";
import { useLoginMutation } from "@/features/auth/authApi";
import DotLoader from "@/components/loaders/dotLoader";
import { useRouter } from "next/navigation";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
};

const loginValidation = Yup.object({
  login_email: Yup.string()
    .required("Email address is required.")
    .email("Please enter a valid email address."),
  login_password: Yup.string().required("Please enter a password."),
});

const registerValidation = Yup.object({
  name: Yup.string()
    .required("Please tell us your name!")
    .min(2, "First name must be between 2 and 16 characters.")
    .max(16, "First name must be between 2 and 16 characters.")
    .matches(/^[aA-zZ]/, "Number and special characters are not allowed."),
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password."
    )
    .email("Enter a valid email address."),
  password: Yup.string()
    .required(
      "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
    )
    .min(6, "Password must be atleast 6 characters.")
    .max(36, "Password can't be more than 36 characters"),
  conf_password: Yup.string()
    .required("Confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});

export default function Signin({ providers }) {
  const [login, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  const [user, setUser] = useState(initialValues);
  const { login_email, login_password, name, email, password, conf_password } =
    user;

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [isSuccess, router]);

  return (
    <>
      {isLoading && <DotLoader loading={isLoading} />}
      <Header />
      <div className={styles.login}>
        <div className={styles.login_container}>
          <div className={styles.login_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&apos;d be happy to join us! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login_form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{ login_email, login_password }}
              validationSchema={loginValidation}>
              {(form) => (
                <>
                  <Form>
                    <LoginInput
                      type="text"
                      name="login_email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="login_password"
                      icon="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </Form>
                  <CircledIconBtn type="submit" text="Sign in" />
                  <div className={styles.forget}>
                    <Link href="/forget">Forget Password ?</Link>
                  </div>
                </>
              )}
            </Formik>
            <div className={styles.login_socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login_socials_wrap}>
                {providers.map((provider) => (
                  <div key={provider.id}>
                    <button
                      className={styles.socials_btn}
                      onClick={() => signIn(provider.id)}>
                      <img
                        src={`/icons/${provider.name}.png`}
                        alt={provider.name}
                      />
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.login_container}>
          <div className={styles.login_form}>
            <h1>Sign up</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{ name, email, password, conf_password }}
              validationSchema={registerValidation}
              onSubmit={() => {
                login({
                  name,
                  email,
                  password,
                  confirmPassword: conf_password,
                });
              }}>
              {(form) => (
                <>
                  <Form>
                    <LoginInput
                      type="text"
                      name="name"
                      icon="user"
                      placeholder="Full Name"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="email"
                      name="email"
                      icon="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      icon="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <LoginInput
                      type="password"
                      name="conf_password"
                      icon="password"
                      placeholder="Re-Type Password"
                      onChange={handleChange}
                    />
                    <CircledIconBtn type="submit" text="Sign up" />
                  </Form>
                </>
              )}
            </Formik>
            {isSuccess && (
              <span className={styles.success}>{data?.message}</span>
            )}
            {isError && (
              <span className={styles.error}>{error?.data?.message}</span>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = Object.values(await getProviders());
  return { props: { providers } };
}
