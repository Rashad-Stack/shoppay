import React, { useState } from "react";
import styles from "@/styles/forgot.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import LoginInput from "@/components/Inputs/logininput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import { useForgotPasswordMutation } from "@/features/auth/authApi";
import DotLoader from "@/components/loaders/dotLoader";
import { getSession } from "next-auth/react";

const initialValues = {
  email: "",
};

const emailValidation = Yup.object({
  email: Yup.string()
    .required(
      "You'll need this when you log in and if you ever need to reset your password."
    )
    .email("Enter a valid email address."),
});

export default function Forgot() {
  const [forgotPassword, { data, isLoading, isError, error, isSuccess }] =
    useForgotPasswordMutation();
  const [state, setState] = useState(initialValues);

  const { email } = state || {};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const sendEmailHandler = () => {
    forgotPassword(email);
  };

  return (
    <>
      {isLoading && <DotLoader loading={isLoading} />}

      <Header />
      <div className={styles.forgot}>
        <div className={styles.forgot_header}>
          <div className={styles.back_svg}>
            <BiLeftArrowAlt />
          </div>
          <span>
            Forgot your password ? <Link href="/">Login instead</Link>
          </span>
        </div>
        <div>
          <Formik
            enableReinitialize
            initialValues={{ email }}
            validationSchema={emailValidation}
            onSubmit={sendEmailHandler}>
            {(form) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                />
                <CircledIconBtn type="submit" text="Send token" />
                {isError && (
                  <div>
                    <span className={styles.error}>{error.data.message}</span>
                  </div>
                )}
                {isSuccess && (
                  <span className={styles.success}>{data?.message}</span>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: { session },
  };
}
