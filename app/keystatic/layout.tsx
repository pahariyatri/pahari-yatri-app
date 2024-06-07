import { showAdminUI } from "@/keystatic.config";
import KeystaticApp from "./keystatic";
import { notFound } from "next/navigation";

export default function Layout() {
  if (showAdminUI === false) {
    notFound()
  }
  return (
    <KeystaticApp />
  );
}