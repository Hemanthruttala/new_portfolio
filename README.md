# Hemanth Portfolio

A premium, colorful, interactive portfolio website for **Ruttala Hemanth Sri Satya Sai** — B.Tech CSE student specializing in Blockchain at VIT-AP University.

Built with **React + TypeScript + Vite + Tailwind CSS + Framer Motion**.

---

## ⚡ Quick Start

### Requirements
- Node.js v18 or later (tested on v24)
- npm v8 or later

### Install & Run

```bash
# 1. Navigate into the project folder
cd hemanth-portfolio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# Open http://localhost:5173 in your browser

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

---

## 📁 Project Structure

```
hemanth-portfolio/
├── public/
│   ├── images/
│   │   ├── profile-photo.jpg        ← add your photo here
│   │   ├── projects/                ← add project screenshots here
│   │   └── certificates/            ← add certificate images here
│   ├── resume.pdf                   ← add your resume here
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Hero3DScene.tsx
│   │   ├── ProfilePhoto.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── SkillCard.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── Certifications.tsx
│   │   ├── CertificateCard.tsx
│   │   ├── Contact.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── BackToTop.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── SocialIcons.tsx
│   ├── config/
│   │   └── site.ts                  ← central config (name, email, links, etc.)
│   ├── data/
│   │   ├── projects.ts              ← add projects here
│   │   ├── certifications.ts        ← add certificates here
│   │   └── skills.ts
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   └── useReducedMotionPreference.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
```

---

## 🖼️ How to Add Your Profile Photo

1. Save your photo as:
   ```
   public/images/profile-photo.jpg
   ```
   (Supported formats: `.jpg`, `.png`, `.webp`)

2. Open `src/config/site.ts` and change:
   ```ts
   profilePhotoAvailable: false,
   ```
   to:
   ```ts
   profilePhotoAvailable: true,
   ```

3. If you use a different filename or extension, also update:
   ```ts
   profilePhoto: "/images/profile-photo.jpg",
   ```

4. Save — the hero section will automatically display your photo.

---

## 📄 How to Add Your Resume

1. Save your resume as:
   ```
   public/resume.pdf
   ```

2. Open `src/config/site.ts` and change:
   ```ts
   resumeAvailable: false,
   ```
   to:
   ```ts
   resumeAvailable: true,
   ```

3. Both the navbar **Resume** button and the hero **Download Resume** button will now work.

4. **To update your resume later:** Simply replace `public/resume.pdf` with your new file using the same filename and redeploy. No code changes needed.

---

## 🗂️ How to Add a New Project

Open `src/data/projects.ts` and add a new object to the `projects` array:

```ts
{
  id: "defi-dashboard",                        // unique ID (no spaces)
  title: "DeFi Dashboard",
  description: "A real-time dashboard showing liquidity, token prices, and wallet balances on Ethereum.",
  image: "/images/projects/defi-dashboard.png", // optional — save file to public/images/projects/
  technologies: ["React", "Ethers.js", "Solidity", "Tailwind CSS"],
  githubUrl: "https://github.com/Hemanthruttala/defi-dashboard",
  liveUrl: "https://defi-dashboard.vercel.app",  // optional
  status: "complete",                            // "placeholder" | "wip" | "complete"
  featured: true,
}
```

**Steps:**
1. (Optional) Save your project screenshot to `public/images/projects/defi-dashboard.png`
2. Add the object above to the `projects` array in `src/data/projects.ts`
3. Set `image` to the correct path (or omit it — a designed placeholder will appear)
4. Save the file — the new project card appears automatically

To **replace a placeholder**, simply delete the placeholder object and add your real one.

> ℹ️ This is a developer-style update — you edit the source file and redeploy. There is no upload form in the live website.

---

## 🏆 How to Add a New Certificate

Open `src/data/certifications.ts` and add a new object:

```ts
{
  id: "nptel-python",                                        // unique ID
  name: "Programming in Python",
  provider: "NPTEL",
  date: "March 2024",
  credentialUrl: "https://nptel.ac.in/verify/...",          // optional
  image: "/images/certificates/nptel-python.jpg",           // optional
  description: "12-week certification on Python programming fundamentals.",
}
```

**Steps:**
1. (Optional) Save your certificate image to `public/images/certificates/nptel-python.jpg`
2. Add the object to the `certifications` array
3. Add `credentialUrl` if you have a verifiable link — the "View Certificate" button will activate
4. Save the file — the new card appears automatically

---

## ✏️ How to Edit Personal Information

All personal data lives in one file: **`src/config/site.ts`**

Change the value there and it updates everywhere on the site:

| Setting | What it controls |
|---|---|
| `name` | Full name displayed throughout |
| `headline` | Professional subtitle |
| `personalEmail` | Email links |
| `universityEmail` | University email links |
| `phone` / `phoneTel` | Phone contact link |
| `linkedinUrl` | LinkedIn button (navbar, hero, contact, footer) |
| `githubUrl` | GitHub button (everywhere) |
| `profilePhoto` | Path to your profile photo |
| `profilePhotoAvailable` | Toggle photo on/off |
| `resumeUrl` | Path to resume PDF |
| `resumeAvailable` | Toggle resume download on/off |

---

## 🗑️ How to Remove Placeholders

### Projects
In `src/data/projects.ts`, delete the objects with `id: "placeholder-1"`, `"placeholder-2"`, `"placeholder-3"` and replace them with your real project objects.

If the array is completely empty, the section shows a clean empty state automatically.

### Certifications
In `src/data/certifications.ts`, delete the three placeholder objects and add your real certificates.

---

## 🚀 How to Deploy

### Vercel (Recommended)

1. Push your project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Vite — click **Deploy**
4. Your site is live!

**To update after deployment:**
- If connected to Git: push your changes → Vercel rebuilds automatically
- Add a project: edit `src/data/projects.ts`, commit, push
- Replace resume: replace `public/resume.pdf`, commit, push
- Add a certificate image: add to `public/images/certificates/`, update the data file, commit, push

> ⚠️ Copying a file into your local project folder does **not** update the live website. You must commit and push (or redeploy) for changes to appear online.

### Netlify

1. Run `npm run build`
2. Drag the `dist/` folder into [netlify.com/drop](https://app.netlify.com/drop)

Or connect your GitHub repo for automatic deployments.

---

## 🎨 Tech Stack

| Tool | Purpose |
|---|---|
| React + TypeScript | UI framework with full type safety |
| Vite | Fast build tool and dev server |
| Tailwind CSS v4 | Utility-first styling |
| Framer Motion | Scroll animations, transitions, role text |
| Canvas API | Hero 3D scene (orbiting blockchain nodes) |
| React Hook Form + Zod | Contact form with validation |
| Lucide React | Icons |

---

## 🔑 Key Features

- ✅ Dark / Light theme toggle with localStorage persistence — no flash on reload
- ✅ Smooth scroll navigation with active-section tracking
- ✅ Animated hero with rotating role titles and canvas 3D blockchain scene
- ✅ Responsive mobile menu (closes on Escape, on link click, and when a link is selected)
- ✅ Data-driven projects (edit one file → cards update automatically)
- ✅ Data-driven certifications (same pattern)
- ✅ Validated contact form that opens a prefilled email client
- ✅ Centralized config — one file to update name, email, social URLs, photo, resume
- ✅ Profile photo placeholder until real photo is added
- ✅ Resume buttons disabled until resume is uploaded
- ✅ Keyboard accessible with visible focus indicators
- ✅ `prefers-reduced-motion` respected throughout
- ✅ No broken image icons — all fallbacks are designed
- ✅ Zero fabricated content, statistics, or credentials

---

## 📞 Contact

**Ruttala Hemanth Sri Satya Sai**  
B.Tech CSE (Blockchain) · VIT-AP University  
hemanthruttala1@gmail.com
