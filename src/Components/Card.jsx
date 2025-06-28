import React from "react";

const Card = ({icon : Icon , title , description, iconClass ,icondiv })=>{

    return(
        <div className="transform hover:scale-105 transtion duration-300 ease-in-out dark:bg-white/5 bg-white/10 dark:text-white backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg transition-all p-4 rounded-lg">
            <div className={`${icondiv} mt-1 max-w-min p-2 dark:bg-white/5 bg-white/10  backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg transition-all rounded-lg`}><Icon className={`${iconClass}`}/></div>
            <h2 className="text-2xl mt-6">{title}</h2>
            <p className=" leading-relaxed text-sm mt-8 mb-2">{description}</p>
        </div>
    )
}

export default Card;