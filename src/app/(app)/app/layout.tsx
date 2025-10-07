import Sidebar from "@/components/main-layout/sidebar";
import Topbar from "@/components/main-layout/topbar";
import { AuthProvider, AppUser } from "@/components/context/auth-context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user: AppUser = {
    id: "random - id",
    email: "tusharjan6@gmail.com",
    name: "Tushar",
  };
  return (
    <AuthProvider user={user}>
      <div className="min-h-dvh bg-muted/30">
        {" "}
        <Sidebar /> <Topbar />{" "}
        <main className="pt-14 pl-60">
          {" "}
          <div className="p-4">{children}</div>{" "}
        </main>{" "}
      </div>{" "}
    </AuthProvider>
  );
}
