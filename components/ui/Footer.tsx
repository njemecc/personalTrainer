import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black via-gray-900 to-black mt-20 border-t border-gold/20">
      <div className="px-4 pt-16 pb-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid row-gap-10 mb-8 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2 mb-8 lg:mb-0">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">
                Djura <span className="text-gold">Blažu</span>
              </h3>
              <p className="text-gray-400 text-sm mb-4">Personalni Trener</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Posvećen sam tome da vam pomognem da postignete svoje ciljeve kroz
              individualni pristup i profesionalno vođenje treninga.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.facebook.com/blazu.djura"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Image
                  src="/assets/icons/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                  className="hover:scale-110 transition-transform"
                />
              </a>
              <a
                href="https://www.instagram.com/d_djusi.trener/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Image
                  src="/assets/icons/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                  className="hover:scale-110 transition-transform"
                />
              </a>
              <a
                href="https://www.facebook.com/blazu.djura"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <Image
                  src="/assets/icons/whatsapp.svg"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="hover:scale-110 transition-transform"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left lg:col-span-2">
            <p className="font-semibold tracking-wide text-white mb-4">
              Brzi Linkovi
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm"
                >
                  Početna
                </Link>
              </li>
              <li>
                <Link
                  href="/survey"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm"
                >
                  Anketa
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm"
                >
                  Planovi i Cene
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm"
                >
                  O Meni
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:max-w-md lg:col-span-2">
            <p className="text-base font-semibold tracking-wide text-white mb-4">
              Pretplati se na newsletter
            </p>
            <form className="flex flex-col mt-4 md:flex-row gap-2">
              <input
                placeholder="Tvoj email"
                required
                type="email"
                className="flex-grow w-full h-12 px-4 transition duration-200 bg-white/10 border border-gray-600 rounded-lg shadow-sm text-white placeholder-gray-400 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold/90 text-white inline-flex items-center justify-center h-12 px-6 font-semibold tracking-wide transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 focus:shadow-outline focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Pretplati se
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-400">
              Na mail šaljem jednom nedeljno korisne besplatne savete.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col justify-between pt-8 pb-6 border-t border-gray-800 sm:flex-row items-center">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            © Copyright 2025 Djura Blažu. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="https://www.facebook.com/blazu.djura"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gold transition-colors duration-300"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/d_djusi.trener/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gold transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6 w-6">
                <circle cx="15" cy="15" r="4" />
                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/blazu.djura"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gold transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <Image
                src="/assets/icons/whatsapp.svg"
                alt="WhatsApp"
                width={20}
                height={20}
                className="hover:scale-110 transition-transform"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
