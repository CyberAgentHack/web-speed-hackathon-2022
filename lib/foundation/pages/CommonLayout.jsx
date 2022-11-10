import "@/foundation/side-effects";
import "@/foundation/styles/GlobalStyle";
import { Header } from "@/foundation/components/navs/Header";
import { Footer } from "@/foundation/components/navs/Footer";

export default function CommonLayout({ children }) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
