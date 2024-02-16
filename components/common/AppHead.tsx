import Head from "next/head";
import { FC } from "react";

interface Props {
  title?: string;
  description?: string;
}

export const APP_NAME = "Bablu Mia's Blog";

const AppHead: FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default AppHead;
