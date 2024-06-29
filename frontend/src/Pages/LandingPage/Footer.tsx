import { FaXTwitter,
        FaInstagram
      } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

export default function Footer() {
  return (
    <footer className="bg-background">
    <div className="bg-red-500 rounded-lg py-6">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <div className="mb-3 text-center md:mb-0 md:text-left">
            <span className="font-bold uppercase tracking-widest text-gray-100">Newsletter</span>
            <p className="text-red-200">Subscribe to our newsletter</p>
          </div>
          <form className="flex w-full gap-2 md:max-w-md">
            <input placeholder="Email" className="w-full flex-1 rounded border border-white bg-red-400 px-3 py-2 text-white placeholder-red-100 outline-none ring-red-300 transition duration-100 focus:ring" />

            <button type="button" className="inline-block rounded bg-white px-8 py-2 text-center text-sm font-semibold text-red-500 outline-none ring-red-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-red-600 md:text-base">Send</button>
          </form>
        </div>
      </div>
    </div>

    <div className="pt-12 lg:pt-16">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
          <div className="col-span-full lg:col-span-2">
            <div className="mb-4 lg:-mt-2">
              <a aria-label="logo" href="#" className="inline-flex items-center gap-2 text-xl font-bold text-black dark:text-white md:text-2xl" >
              Petopia🐶
              </a>
            </div>

            <p className="mb-6 text-gray-500 sm:pr-8">Filler text is dummy text which has no meaning however looks very similar to real text</p>

            <div className="flex gap-4">
              <a aria-label="Instagram" href="https://www.instagram.com/hiteshchoudharyofficial" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600" rel="noopener">
              <FaInstagram size={20} />
              </a>

              <a aria-label="Twitter" href="https://x.com/Hiteshdotcom" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600" rel="noopener">
              <FaXTwitter size={20} />
              </a>

              <a aria-label="LinkedIn" href="https://in.linkedin.com/in/hiteshchoudhary" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600" rel="noopener">
              <FaLinkedin size={20} />
              </a>

              <a aria-label="GitHub" href="https://github.com/hiteshchoudhary" target="_blank" className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600" rel="noopener">
              <IoLogoGithub size={21} />
              </a>
            </div>
          </div>

          <div>
            <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Products</div>

            <nav className="flex flex-col gap-4">
              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Overview</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Solutions</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Pricing</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Customers</a>
              </div>
            </nav>
          </div>

          <div>
            <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Company</div>

            <nav className="flex flex-col gap-4">
              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">About</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Investor Relations</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Jobs</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Press</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Blog</a>
              </div>
            </nav>
          </div>

          <div>
            <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Support</div>

            <nav className="flex flex-col gap-4">
              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Contact</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Documentation</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Chat</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">FAQ</a>
              </div>
            </nav>
          </div>

          <div>
            <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Legal</div>

            <nav className="flex flex-col gap-4">
              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Terms of Service</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Privacy Policy</a>
              </div>

              <div>
                <a href="#" className="text-gray-500 transition duration-100 hover:text-red-500 active:text-red-600">Cookie settings</a>
              </div>
            </nav>
          </div>
        </div>

        <div className="border-t py-8 text-center text-sm text-gray-400">© 2024 - Present Petopia Team. All rights reserved.</div>
      </div>
    </div>
  </footer>
  )
}
