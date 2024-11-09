'use client'
import { useAnimationControls, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import NavigationLink from "./NavigationLink";
import { WalletIcon } from "@heroicons/react/24/outline";
import { Hammer } from 'lucide-react';
import { Coins } from 'lucide-react';

const containerVariants = {
    close: {
        width: "5rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
    open: {
        width: "16rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
        },
    },
};

const arrowVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
};

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerControls = useAnimationControls();
    const arrowControls = useAnimationControls();

    useEffect(() => {
        if (isOpen) {
            containerControls.start("open");
            arrowControls.start("open");
        } else {
            containerControls.start("close");
            arrowControls.start("closed");
        }
    }, [isOpen]);

    const handleOpenClose = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.nav
            variants={containerVariants}
            animate={containerControls}
            initial="close"
            className="bg-gray-900 flex flex-col z-10 gap-20 p-5 absolute top-0 left-0 h-screen shadow shadow-neutral-600"
        >
            <div className="flex flex-row w-full justify-between items-center">
                {/* Conditional Gradient Circle */}
                {isOpen && (
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />
                )}

                {/* Rotating Arrow Button */}
                <motion.button
                    variants={arrowVariants}
                    animate={arrowControls}
                    initial="closed"
                    className="p-1 rounded-full flex "
                    onClick={handleOpenClose}
                >
                    <FiArrowRight className="w-20"/>
                </motion.button>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-3">
                <NavigationLink link="/wallet" name={isOpen ? "Dashboard" : ""}>
                    <WalletIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                </NavigationLink>
                <NavigationLink link="/collect" name={isOpen?"Token" :""}>
                     <Hammer className="stroke-inherit stroke-[0.75] min-w-8 w-8"/>
                </NavigationLink>
                <NavigationLink link="/swap" name={isOpen?"Pool":""}>
                    <Coins className="stroke-inherit stroke-[0.75] min-w-8 w-8"/>
                </NavigationLink>

            </div>
        </motion.nav>
    );
};

export default NavBar;
