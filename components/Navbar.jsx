import Link from 'next/link';
import { FaEthereum } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { HiMenuAlt2 } from 'react-icons/hi';
import { VscClose } from 'react-icons/vsc';
import { ConnectWallet, useAddress, useAuth } from '@thirdweb-dev/react';
import { createSupabaseClient } from '../lib/createSupabase';
import axios from 'axios';
import supabaseUser from '../lib/useSupabaseUser';

export default function Navbar({ isOpen, setIsOpen }) {
  const address = useAddress();
  const thirdwebAuth = useAuth();
  const supabase = createSupabaseClient();
  const { user, refresh, session } = supabaseUser();

  const signIn = async () => {
    const payload = await thirdwebAuth?.login();
    const res = await axios.post('/api/auth/login', {
      payload,
      access_token: session?.access_token,
    });

    const { data } = await res.data;

    if (res.status === 200 || res.statusText === 'OK') {
      await supabase
        .from('account')
        .insert([{ id: data.user.user_metadata.address }], { upsert: true });
    }
    refresh();
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-4 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>

              {isOpen ? (
                <VscClose className="w-6 h-6" />
              ) : (
                <HiMenuAlt2 className="w-6 h-6" />
              )}
            </button>
            <Link href="/" className="flex ml-2 md:mr-24">
              <FaEthereum className="h-8 mr-2" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                ERC20
              </span>
            </Link>
          </div>

          <div className="flex items-center relative">
            <div className="flex items-center ml-3">
              <div className="hidden md:block">
                {!user ? (
                  <button
                    onClick={() => {
                      supabase.auth.signInWithOAuth({ provider: 'google' });
                    }}
                    className="text-gray-900 bg-gray-100 py-1.5 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-md text-sm px-5 text-center w-full md:w-auto inline-flex items-center dark:focus:ring-gray-500 mb-2"
                  >
                    <FcGoogle className="w-4 h-4 mr-2 -ml-1 text-[#626890]" />
                    Sign in with Google
                  </button>
                ) : !address ? (
                  <ConnectWallet
                    theme="dark"
                    className="!bg-indigo-600 !text-white !py-1.5 !rounded-md !px-5 "
                  />
                ) : (
                  <button
                    onClick={signIn}
                    className="text-gray-900 bg-gray-100 py-1.5 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-md text-sm px-5 text-center w-full md:w-auto inline-flex items-center dark:focus:ring-gray-500 mb-2"
                  >
                    <FaEthereum className="w-4 h-4 mr-2 -ml-1 text-[#626890]" />
                    Sign in with ETH
                  </button>
                )}
              </div>

              <div className="md:hidden">
                <span>
                  {user &&
                    user?.user_metadata?.address.substring(0, 5) +
                      '...' +
                      user?.user_metadata?.address.substring(6, 9)}
                </span>
              </div>

              <div
                className={`z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p
                    className="text-sm text-gray-900 dark:text-white"
                    role="none"
                  >
                    Neil Sims
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
