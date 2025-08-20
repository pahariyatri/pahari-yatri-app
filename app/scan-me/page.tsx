import SectionContainer from "@/components/common/SectionContainer";
import ResponsiveImage from "@/components/common/ResponsiveImage";

export default function About() {
  return (
    <SectionContainer>
      <div className="flex flex-col items-center justify-center">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
            Quick Contact
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Get in touch with us quickly and easily.
          </p>
        </div>

        {/* Main Contact Section */}
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8 max-w-4xl">
          {/* Contact Details */}
          <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Our Address</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Pahari Yatri Pvt. Ltd.<br />
              123 Mountain View Road,<br />
              Himachal Pradesh, India<br />
              Zip Code: 171001<br />
              Phone: <a href="tel:+916280888188" className="text-blue-500 hover:underline">+91-6280888188</a><br />
              Email: <a href="mailto:info@pahariyatri.com" className="text-blue-500 hover:underline">info@pahariyatri.com</a>
            </p>
          </div>

          {/* Quick Contact Options */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/6280888188"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-500 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
            >
              <ResponsiveImage
                src="/static/icons/whatsapp logo_icon.svg"
                alt="WhatsApp"
                className="w-6 h-6 mr-2"
                aspectRatio="1:1"
              />
              Contact Us on WhatsApp
            </a>

            {/* Email Contact */}
            <a
              href="mailto:info@pahariyatri.com"
              className="flex items-center bg-blue-500 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600"
            >
              <Image
                src="/static/icons/email.svg"
                alt="Email"
                width={24}
                height={24}
                className="mr-2"
              />
              Send Us an Email
            </a>

            {/* Book a Trip or Generate a Query */}
            <a
              href="https://forms.gle/your-google-form-url"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-yellow-500 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600"
            >
              <Image
                src="/icons/booking.svg"
                alt="Book"
                width={24}
                height={24}
                className="mr-2"
              />
              Book Your Trip or Generate a Query
            </a>

            {/* Social Media Links */}
            <div className="flex space-x-4 justify-center">
              <a
                href="https://facebook.com/pahariyatri"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
              >
                <Image
                  src="/static/icons/facebook logo_icon.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://instagram.com/pahariyatri"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600"
              >
                <Image
                  src="/static/icons/instagram logo_icon.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://twitter.com/pahariyatri"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500"
              >
                <Image
                  src="/static/icons/linkedin logo_icon.svg"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
