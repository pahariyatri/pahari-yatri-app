import Link from "./common/Link";
import Image from './common/Image';

export default function Footer() {
  return (
    <footer className="bg-himalayan-green-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Bottom */}
        <div className="border-t border-himalayan-green-700 pt-8 flex flex-col md:flex-row justify-between items-center text-himalayan-mist-400 text-sm">
          <p>© {new Date().getFullYear()} Pahari Yatri. All rights reserved.</p>
          <p className="mt-4 md:mt-0 text-center md:text-right">
            Crafted with reverence for the Himalayas and those who seek their wisdom.
          </p>
        </div>
      </div>
    </footer>
  );
}
