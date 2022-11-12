import dynamic from "next/dynamic";
import { Suspense } from "react";

import { Header } from "foundation/components/navs/Header";

const DynamicFooter = dynamic(() => import("foundation/components/navs/Footer"), {
  suspense: true,
});

export default function CommonLayout({ children }) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Suspense fallback={""}>
        <DynamicFooter />
      </Suspense>
    </div>
  );
}
