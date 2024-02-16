import React, { ReactNode, useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { NextPage } from "next";
import axios from "axios";

interface Props {
  children: ReactNode;
}

const Index: NextPage<Props> = () => {
  return (
    <AdminLayout
      title="Dashboard"
      description="Discover the latest insights and updates by adding a new post on Bablu Mia's blog website. Stay tuned for informative articles, tutorials, and valuable content on various topics, including React development and more."
    >
      Dashboard
    </AdminLayout>
  );
};

export default Index;
