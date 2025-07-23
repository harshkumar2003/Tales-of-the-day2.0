import React from "react";
import { useUser } from "../context/UserContext"; // adjust import if needed
import { motion } from "motion/react";

function UserWelcome() {
  const { user, fullName } = useUser();

  const username =
    fullName || (user?.email ? user.email.split("@")[0].replace(/[^a-zA-Z]/g, " ") : "user");

  return (
    <div className="text-black dark:text-white flex items-center gap-2 justify-center pt-8">
      <motion.div
        initial={{ scale: 1, rotate: 0 }}
        animate={{
          scale: [1, 1.4, 1.4, 1],
          rotate: [0, 25, -15, 10, -5, 0],
        }}
        transition={{
          duration: 1.6,
          ease: "easeInOut",
        }}
      >
        <span className="text-4xl">👋</span>
      </motion.div>

      <span className="text-lg">Welcome,</span>
      <span className="text-2xl font-semibold">{username}</span>
    </div>
  );
}

export default UserWelcome;
