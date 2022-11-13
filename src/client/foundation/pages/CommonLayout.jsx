import { Header } from "foundation/components/navs/Header";
import { Footer } from "foundation/components/navs/Footer";


export default function CommonLayout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
