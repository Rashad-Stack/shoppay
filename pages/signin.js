import Footer from "@/components/footer";
import Header from "@/components/header";
import React, { useCallback, useEffect, useState } from "react";
import styles from "@/styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "@/components/Inputs/logininput";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import { useRegisterMutation } from "@/features/auth/authApi";
import DotLoader from "@/components/loaders/dotLoader";
import { redirect, useRouter } from "next/navigation";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  login_error: "",
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

export default function Signin({ providers, csrfToken, callbackUrl }) {
  const [register, { data, isLoading, isError, error, isSuccess }] =
    useRegisterMutation();

  const [user, setUser] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    login_error,
  } = user;

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };

    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", login_error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      router.push(callbackUrl || "/");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(callbackUrl || "/");
    }
  }, [callbackUrl, isSuccess, router]);

  return (
    <>
      {(loading || isLoading) && <DotLoader loading={isLoading} />}
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
              validationSchema={loginValidation}
              onSubmit={handleLogin}>
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    hidden
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
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
                  <CircledIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    <div>
                      <span className={styles.error}>{login_error}</span>
                    </div>
                  )}
                  <div className={styles.forget}>
                    <Link href="/forget">Forget Password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login_socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login_socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name === "Credentials") return;
                  return (
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
                  );
                })}
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
              onSubmit={() =>
                register({
                  name,
                  email,
                  password,
                  confirmPassword: conf_password,
                })
              }>
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
  const { req, query } = context;
  const { callbackUrl } = query;

  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }
  const csrfToken = await getCsrfToken(context);
  const providers = Object.values(await getProviders());
  return { props: { providers, csrfToken, callbackUrl } };
}
