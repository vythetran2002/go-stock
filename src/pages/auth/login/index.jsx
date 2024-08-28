import React from "react";
import Head from "next/head";
import { LoginForm } from "@/components/auth/Login/LoginForm";
import AuthLayout from "@/components/layout/auth/AuthLayout";

function login() {
  return (
    <>
      <Head>
        <title>Login </title>
      </Head>
      <AuthLayout title="Login" isLogin={true}>
        <LoginForm />
      </AuthLayout>
    </>
  );
}

export default login;
