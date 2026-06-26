import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SanctuarySidebar, MobileBottomNav } from "@/components/SanctuarySidebar";

export const Route = createFileRoute("/sanctuary")({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/sanctuary" || location.pathname === "/sanctuary/") {
      throw redirect({ to: "/sanctuary/chat" });
    }
  },
  head: () => ({
    meta: [
      { title: "Sanctuary — EmpathAI" },
      { name: "description", content: "Your private wellness sanctuary: AI chat, mood mirror, healing toolkit, and crisis support." },
    ],
  }),
  component: SanctuaryLayout,
});

function SanctuaryLayout() {
  return (
    <div className="min-h-screen flex w-full">
      <SanctuarySidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Outlet />
      </div>
      <MobileBottomNav />
    </div>
  );
}
