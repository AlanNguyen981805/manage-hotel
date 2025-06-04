"use client";

import Link from "next/link";

const Footer = () => (
  <footer className="absolute bottom-0 left-0 right-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-accent transition-colors"
          >
            Booking
          </Link>
        </div>

        {/* <div className="flex flex-col md:flex-row gap-8 text-gray-500 text-sm">
          <Link href="/" className="hover:text-indigo-600">
            Home
          </Link>
          <Link href="/booking" className="hover:text-indigo-600">
            Book Room
          </Link>
          <Link href="#" className="hover:text-indigo-600">
            About Us
          </Link>
          <Link href="#" className="hover:text-indigo-600">
            Contact
          </Link>
        </div> */}

        <div className="flex flex-col items-center md:items-end">
          {/* <p className="text-gray-500 text-sm">{new Date().getFullYear()}</p> */}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
