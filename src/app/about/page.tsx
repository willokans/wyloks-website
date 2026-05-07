import { type Metadata } from "next"
import AboutPageContent from "@/components/AboutPageContent"

export const metadata: Metadata = {
  title: "About Us | Wyloks Ltd",
  description: "Learn about Wyloks Ltd - Our mission, vision, and values in IT consultation and digital services.",
}

export default function Page() {
  return <AboutPageContent />
}
