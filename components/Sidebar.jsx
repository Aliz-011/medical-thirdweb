import Link from 'next/link';
import { MdSpaceDashboard, MdLogin } from 'react-icons/md';

export default function Sidebar({ isOpen }) {
  return (
    <aside
      id="logo-sidebar"
      className={`fixed ${
        isOpen && 'translate-x-0'
      } top-0 left-0 z-40 w-64 h-screen pt-24 transition-transform bg-gray-900 -translate-x-full border-r border-gray-700 sm:translate-x-0`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-900 ">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              href="/"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-500"
            >
              <MdSpaceDashboard className="w-6 h-6 text-gray-100 transition duration-75 group-hover:text-indigo-900 " />
              <span className="ml-3 text-gray-100">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              href="/patient"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-500"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-100 transition duration-75 group-hover:text-indigo-900 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 text-gray-100 whitespace-nowrap">
                Patient
              </span>
            </Link>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-500"
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-100 transition duration-75 group-hover:text-indigo-900 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="flex-1 ml-3 text-gray-100 whitespace-nowrap">
                Products
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-500"
            >
              <MdLogin className="flex-shrink-0 w-6 h-6 text-gray-100 transition duration-75 group-hover:text-indigo-900 " />
              <span className="flex-1 ml-3 text-gray-100 whitespace-nowrap">
                Sign In
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
