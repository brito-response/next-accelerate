export const publicLayoutTemplate = () => `
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MainLayout } from "@/components/Layouts/MainLayout";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
      <div data-testid="root-layout-public">
       <MainLayout>
          <Header />
          <ToastContainer position="top-center" />
          {children}
          <Footer />
        </MainLayout>
      </div>
  );
}

`;