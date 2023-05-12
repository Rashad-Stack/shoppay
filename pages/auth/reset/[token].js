import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/forgot.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import LoginInput from "@/components/Inputs/logininput";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CircledIconBtn from "@/components/buttons/circledIconBtn";
import DotLoader from "@/components/loaders/dotLoader";
import { useResetPasswordMutation } from "@/features/auth/authApi";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const emailValidation = Yup.object({
  password: Yup.string()
    .required(
      "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
    )
    .min(6, "Password must be atleast 6 characters.")
    .max(36, "Password can't be more than 36 characters"),
  confirmPassword: Yup.string()
    .required("Confirm your password.")
    .oneOf([Yup.ref("password")], "Passwords must match."),
});

export default function Reset({ token }) {
  const [resetPassword, { data, isLoading, isError, error, isSuccess }] =
    useResetPasswordMutation();
  const [state, setState] = useState(initialValues);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const sendEmailHandler = () => {
    resetPassword({ ...state, token });
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/", undefined, { shallow: true });
    }
  }, [isSuccess, router]);

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
            initialValues={state}
            validationSchema={emailValidation}
            onSubmit={sendEmailHandler}>
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  icon="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <LoginInput
                  type="password"
                  name="confirmPassword"
                  icon="password"
                  placeholder="Re-Type Password"
                  onChange={handleChange}
                />
                <CircledIconBtn type="submit" text="Submit" />
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
  const { query, req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;
  return {
    props: { token },
  };
}
