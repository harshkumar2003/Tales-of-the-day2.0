import React from "react";

import { Hand } from "lucide-react";
import { motion } from "motion/react";
function UserWelcome({ user  }) {
    const username = user.email.split('@')[0].replace(/[^a-zA-Z]/g," ")
  return (
    <div className="text-black dark:text-white flex items-center gap-2  justify-center pt-8">
   
      <motion.div
        initial={{ scale: 1, rotate: 0 }}
        animate={{
          scale: [1, 1.4, 1.4, 1], // Scale up, stay, then return
          rotate: [0, 25, -15, 10, -5, 0], // Wave motion
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
