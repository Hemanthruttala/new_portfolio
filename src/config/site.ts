/**
 * CENTRAL SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Edit values here to update your personal information across the entire site.
 *
 * GETTING STARTED:
 *  1. Replace profilePhoto with your actual image path once you add it to
 *     public/images/profile-photo.jpg
 *  2. Set resumeAvailable to true and ensure public/resume.pdf exists.
 *  3. Update social URLs if they ever change.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const siteConfig = {
  // ── Personal ──────────────────────────────────────────────────────────────
  name: "Ruttala Hemanth Sri Satya Sai",
  /** Short display name used in logo / footer */
  shortName: "Hemanth",
  /** Initials used in the HS logo */
  initials: "HS",
  headline: "B.Tech CSE Student | Blockchain & Web3 Enthusiast | Frontend Developer",
  tagline: "Building thoughtful technology, one block at a time.",

  // ── Education ──────────────────────────────────────────────────────────────
  university: "VIT-AP University",
  universityLocation: "Amaravati, Andhra Pradesh",
  degree: "B.Tech in Computer Science Engineering",
  specialization: "Blockchain",
  graduationYear: 2028,

  // ── Location ──────────────────────────────────────────────────────────────
  location: "Tadepalligudem, Andhra Pradesh, India",

  // ── Contact ───────────────────────────────────────────────────────────────
  phone: "+91 8328525674",
  phoneTel: "tel:+918328525674",
  personalEmail: "hemanthruttala1@gmail.com",
  universityEmail: "satyasai.24bcc7062@vitapstudent.ac.in",

  // ── Social links ──────────────────────────────────────────────────────────
  linkedinUrl:
    "https://www.linkedin.com/in/hemanth-ruttala-51a14a333?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  githubUrl: "https://github.com/Hemanthruttala",

  // ── Profile photo ─────────────────────────────────────────────────────────
  /**
   * Path to your profile photo.
   * Steps to add:
   *  1. Save your photo as  public/images/profile-photo.jpg
   *  2. Set profilePhotoAvailable to true
   *  3. Done — the hero section will display it automatically.
   */
  profilePhoto: "/images/profile-photo.jpg",
  profilePhotoAvailable: false,

  // ── Resume ────────────────────────────────────────────────────────────────
  /**
   * Path to your resume PDF.
   * Steps to add:
   *  1. Save your resume as  public/resume.pdf
   *  2. Set resumeAvailable to true
   *  3. Both the navbar and hero Resume buttons will activate automatically.
   *  4. To update the resume later, simply replace public/resume.pdf with
   *     your new file and redeploy — no code changes needed.
   */
  resumeUrl: "/resume.pdf",
  resumeAvailable: false,

  // ── Intro text ────────────────────────────────────────────────────────────
  introText:
    "I am a Computer Science student specializing in Blockchain at VIT-AP University. I enjoy building blockchain-based applications, decentralized applications (DApps), and intuitive frontend experiences. With skills in Python, Java, data structures and algorithms, and communication, I am actively seeking opportunities to learn, contribute, and grow as a developer.",

  // ── SEO ───────────────────────────────────────────────────────────────────
  siteTitle:
    "Ruttala Hemanth Sri Satya Sai | Blockchain & Frontend Developer",
  siteDescription:
    "Explore the portfolio of Ruttala Hemanth Sri Satya Sai, a VIT-AP Computer Science student specializing in Blockchain, Web3, DApp development, and frontend development.",
  siteUrl: "https://hemanth-portfolio.vercel.app", // update after deployment
};

export type SiteConfig = typeof siteConfig;
