import { ReactNode } from "react";
import Header from "./Header";
import SectionContainer from "./SectionContainer";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className={`flex h-screen flex-col justify-between  `}>
        <Header />
        <main className="mb-auto mt-5">{children}</main>
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
