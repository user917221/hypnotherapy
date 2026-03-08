import AdminDashboard from "./AdminDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel | Péguy Casteloot",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminPage() {
    return <AdminDashboard />;
}
