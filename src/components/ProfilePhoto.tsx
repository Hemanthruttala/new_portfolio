import { User } from "lucide-react";
import { siteConfig } from "../config/site";
import { motion } from "framer-motion";

export default function ProfilePhoto() {
  if (siteConfig.profilePhotoAvailable) {
    return (
      <img
        src={siteConfig.profilePhoto}
        alt={`${siteConfig.name} — professional photo`}
        className="w-full h-full object-cover rounded-full shadow-inner"
        loading="eager"
      />
    );
  }

  return (
    <div
      className="w-full h-full rounded-full flex flex-col items-center justify-center gap-2 border-2 border-dashed shadow-md p-3 text-center"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--accent-blue)",
      }}
      aria-label="Profile photo placeholder — add your photo to display it here"
    >
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
        style={{
          background: "var(--pill-bg)",
        }}
      >
        <User size={24} className="text-[var(--accent-blue)]" />
      </motion.div>
      <p className="text-[11px] font-bold text-[var(--text-primary)] leading-tight">
        Add Photo
      </p>
      <p className="text-[9px] text-[var(--text-muted)] max-w-[90px] leading-tight">
        profile-photo.jpg
      </p>
    </div>
  );
}
