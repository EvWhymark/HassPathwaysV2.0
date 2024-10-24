import Link from 'next/link'
import React from "react";
import NavigationBar from "@/app/components/navigation/NavigationBar";
import Footer from './components/navigation/Footer';

export default function NotFound() {
    return (

        <div className="flex flex-col min-h-screen bg-utility-gray-100">
            <NavigationBar className="w-full"></NavigationBar>
            <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-utility-gray-800 text-display-2xl">404</h1>
                <h2 className="text-2xl font-semibold text-utility-gray-700 mb-2 text-display-xl">Page Not Found</h2>
                <p className="text-utility-gray-900 mb-6 text-display-xs">The page you are looking for has moved, or doesn't exist.</p>
                <Link href="/">
            <span className="bg-utility-brand-600 hover:bg-utility-brand-700 text-text-white font-bold py-3 px-12 rounded-lg text-xl">
                Go Home
            </span>
                </Link>
            </div>
            <Footer />
        </div>
    );
}