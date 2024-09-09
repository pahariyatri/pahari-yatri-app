import SectionContainer from "@/components/common/SectionContainer";

export default function About() {
  return (
    <SectionContainer>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-12">
          <h2 className="text-3xl mb-6 font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">Quick Contact</h2>
          <p className="text-lg ">Get in touch with us quickly and easily.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
          {/* Contact Details Column */}
          <div className="w-full md:w-1/2 flex flex-col p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Our Address</h3>
            <p className="text-lg ">
              Pahari Yatri Pvt. Ltd.<br />
              123 Mountain View Road,<br />
              Shimla, Himachal Pradesh, India<br />
              Zip Code: 171001<br />
              Phone: +91-6280888188<br />
              Email: info@pahariyatri.com
            </p>
          </div>

          {/* Social Media and Quick Contact Links Column */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/6280888188"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-500 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
            >
              <img
                src="/icons/whatsapp.svg"
                alt="WhatsApp"
                className="w-6 h-6 mr-2"
              />
              Contact Us on WhatsApp
            </a>

            {/* Email Contact */}
            <a
              href="mailto:info@pahariyatri.com"
              className="flex items-center bg-blue-500 text-white text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600"
            >
              <img
                src="/icons/email.svg"
                alt="Email"
                className="w-6 h-6 mr-2"
              />
              Send Us an Email
            </a>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/pahariyatri"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
              >
                <img
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://instagram.com/pahariyatri"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600"
              >
                <img
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://twitter.com/pahariyatri"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500"
              >
                <img
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://twitter.com/pahariyatri"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-500"
              >
                <img
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>


  );
}
