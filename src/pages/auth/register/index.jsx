import React from "react";
import Head from "next/head";
import { RegisterForm } from "@/components/auth/Register/RegisterForm";
import AuthLayout from "@/components/layout/auth/AuthLayout";

function login() {
  return (
    <>
      <Head>
        <title>Register </title>
      </Head>
      <AuthLayout title="Register" isLogin={false}>
        <RegisterForm />
      </AuthLayout>
    </>
  );
}

export default login;
