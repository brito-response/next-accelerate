export const privateNextLayoutTemplate = () => `
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LayoutCaptureError } from "@/components/Layouts/LayoutCaptureError";
import { ManagerLayout } from "@/components/Layouts/ManagerLayout";
import { MenuAside } from "@/components/MenuAside";
import { MenuProvider } from "@/contexts/manager-context";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
      <div data-testid="root-layout-private">
        <MenuProvider>
          <ManagerLayout>
            <Header />
            <ToastContainer position="top-center" />
            <MenuAside />
            <LayoutCaptureError>
              {children}
            </LayoutCaptureError>
            <Footer />
          </ManagerLayout>
        </MenuProvider>
      </div>
  );
}
`;