import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ibrahim Ezzeldin for collaborations, inquiries, or just to say hello.",
};

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  );
}
