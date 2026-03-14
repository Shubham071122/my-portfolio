import { Metadata } from "next";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Shubham Kumar to discuss projects, collaborations, or just to say hi.",
};

export default function ContactPage() {
    return <ContactForm />;
}
