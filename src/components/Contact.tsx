import { Phone, Mail, GraduationCap, MessageSquareShare } from "lucide-react";
import { siteConfig } from "../config/site";
import ContactForm from "./ContactForm";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { RevealGroup, Reveal, RevealSingle } from "./motion/Reveal";
import { InteractiveCard, type CardAccent } from "./motion/InteractiveCard";

const contacts: Array<{
  id: string;
  label: string;
  value: string;
  href: string;
  Icon: any;
  color: string;
  bg: string;
  border: string;
  external: boolean;
  accent: CardAccent;
}> = [
  {
    id: "phone",
    label: "Phone / WhatsApp",
    value: siteConfig.phone,
    href: siteConfig.phoneTel,
    Icon: Phone,
    color: "var(--accent-green)",
    bg: "rgba(52, 211, 153, 0.12)",
    border: "rgba(52, 211, 153, 0.25)",
    external: false,
    accent: "green",
  },
  {
    id: "email-personal",
    label: "Personal Email",
    value: siteConfig.personalEmail,
    href: `mailto:${siteConfig.personalEmail}`,
    Icon: Mail,
    color: "var(--accent-blue)",
    bg: "rgba(91, 140, 255, 0.12)",
    border: "rgba(91, 140, 255, 0.25)",
    external: false,
    accent: "blue",
  },
  {
    id: "email-university",
    label: "University Email",
    value: siteConfig.universityEmail,
    href: `mailto:${siteConfig.universityEmail}`,
    Icon: GraduationCap,
    color: "var(--accent-blue)",
    bg: "rgba(91, 140, 255, 0.12)",
    border: "rgba(91, 140, 255, 0.25)",
    external: false,
    accent: "blue",
  },
];

const socialContacts: Array<{
  id: string;
  label: string;
  value: string;
  href: string;
  color: string;
  bg: string;
  border: string;
  icon: any;
  accent: CardAccent;
}> = [
  {
    id: "linkedin",
    label: "LinkedIn Profile",
    value: "Hemanth Ruttala",
    href: siteConfig.linkedinUrl,
    color: "var(--accent-blue)",
    bg: "rgba(91, 140, 255, 0.12)",
    border: "rgba(91, 140, 255, 0.25)",
    icon: LinkedinIcon,
    accent: "blue",
  },
  {
    id: "github",
    label: "GitHub Profile",
    value: "Hemanthruttala",
    href: siteConfig.githubUrl,
    color: "var(--accent-violet)",
    bg: "rgba(155, 107, 255, 0.12)",
    border: "rgba(155, 107, 255, 0.25)",
    icon: GithubIcon,
    accent: "violet",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      aria-label="Contact section"
    >
      <div className="section-container relative z-10">
        {/* Section header */}
        <RevealSingle className="text-center mb-16">
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 shadow-md"
            style={{ background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))" }}
          >
            <MessageSquareShare size={22} className="text-white" aria-hidden="true" />
          </div>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-[var(--accent-cyan)] mb-2">
            Get in Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-3">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-normal">
            I'm open to internships, campus opportunities, collaborations, and discussions about Web3, blockchain, or software development.
          </p>
        </RevealSingle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* ── Left Column: Contact Cards ── */}
          <div className="flex flex-col gap-4">
            <RevealSingle>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2 flex items-center gap-2">
                <span>Direct Channels</span>
                <span className="flex-1 h-px bg-[var(--border)]" />
              </h3>
            </RevealSingle>

            <RevealGroup className="flex flex-col gap-3.5">
              {contacts.map((contact) => (
                <Reveal key={contact.id}>
                  <InteractiveCard
                    as="a"
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noopener noreferrer" : undefined}
                    accent={contact.accent}
                    className="p-4 sm:p-5 flex items-center gap-4 group shadow-md w-full"
                    aria-label={`${contact.label}: ${contact.value}`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <span
                        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200"
                        style={{ background: contact.bg, border: `1px solid ${contact.border}` }}
                      >
                        <contact.Icon size={20} style={{ color: contact.color }} aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
                          {contact.label}
                        </p>
                        <p
                          className="text-sm sm:text-base font-bold truncate group-hover:underline transition-colors"
                          style={{ color: contact.color }}
                        >
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  </InteractiveCard>
                </Reveal>
              ))}
            </RevealGroup>

            <RevealSingle className="mt-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2 flex items-center gap-2">
                <span>Social & Profiles</span>
                <span className="flex-1 h-px bg-[var(--border)]" />
              </h3>
            </RevealSingle>

            <RevealGroup className="flex flex-col gap-3.5">
              {socialContacts.map((contact) => {
                const IconComp = contact.icon;
                return (
                  <Reveal key={contact.id}>
                    <InteractiveCard
                      as="a"
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      accent={contact.accent}
                      className="p-4 sm:p-5 flex items-center gap-4 group shadow-md w-full"
                      aria-label={`${contact.label}: ${contact.value} (opens in new tab)`}
                    >
                      <div className="flex items-center gap-4 w-full">
                        <span
                          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-200"
                          style={{ background: contact.bg, border: `1px solid ${contact.border}` }}
                        >
                          <IconComp size={20} className="text-[var(--text-primary)]" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
                            {contact.label}
                          </p>
                          <p className="text-sm sm:text-base font-bold truncate text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
                            {contact.value}
                          </p>
                        </div>
                      </div>
                    </InteractiveCard>
                  </Reveal>
                );
              })}
            </RevealGroup>
          </div>

          {/* ── Right Column: Form ── */}
          <RevealSingle delay={0.15}>
            <ContactForm />
          </RevealSingle>
        </div>
      </div>
    </section>
  );
}
