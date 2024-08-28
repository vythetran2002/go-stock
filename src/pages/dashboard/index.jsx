import React from "react";
import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import Head from "next/head";

function index() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashboardLayout>
        <div className="w-full h-full flex flex-col">
          <div className="flex gap-2 "></div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default index;
