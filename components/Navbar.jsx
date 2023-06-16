import Link from 'next/link';
import { SiSolidity } from 'react-icons/si';
import { FaEthereum } from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import { VscClose } from 'react-icons/vsc';
import { ConnectWallet, useAddress, useAuth } from '@thirdweb-dev/react';
import initializeFirebaseClient from '../lib/initFirebase';
import axios from 'axios';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { signInWithCustomToken } from 'firebase/auth';
import { useContext, useState } from 'react';
import { AuthContext, actionType } from '../context/AuthContext';

export default function Navbar({ isOpen, setIsOpen }) {
  const address = useAddress();
  const thirdwebAuth = useAuth();
  const { auth, db } = initializeFirebaseClient();
  const { state, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState('');

  const signIn = async () => {
    const payload = await thirdwebAuth?.login();
    const res = await axios.post('/api/auth/login', {
      payload,
    });

    const { token } = await res.data;
    console.log(JSON.parse(localStorage.getItem('users')));

    signInWithCustomToken(auth, token).then((userCredential) => {
      const users = userCredential.user;
      const usersRef = doc(db, 'users', users.uid);

      getDoc(usersRef)
        .then((doc) => {
          if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(doc.id));
          }

          dispatch({
            type: actionType.SET_USER,
            user: doc.id,
          });
          setUser(doc.id);
          if (!doc.exists()) {
            setDoc(usersRef, { createdAt: serverTimestamp() }, { merge: true });
          }
        })
        .catch((err) => console.error(err.message));
    });
  };

  const logout = async () => {
    //
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-900 border-b border-gray-700">
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
              <SiSolidity className="h-8 w-6 mr-2 text-gray-500" />
              <p className="self-center font-semibold text-gray-100 sm:text-2xl whitespace-nowrap">
                ERC<span className="text-orange-500">20</span>
              </p>
            </Link>
          </div>

          <div className="flex items-center relative">
            <div className="flex items-center ml-3">
              <div>
                {address ? (
                  <button
                    onClick={signIn}
                    className="text-gray-900 bg-gray-100 py-1.5 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-md text-sm px-5 text-center w-full md:w-auto inline-flex items-center mb-2"
                  >
                    <FaEthereum className="w-4 h-4 mr-2 -ml-1 text-[#626890]" />
                    Sign in with ETH
                  </button>
                ) : (
                  <ConnectWallet
                    theme="dark"
                    className="!bg-indigo-600 !text-white !py-1.5 !rounded-md !px-5 !text-sm"
                    btnTitle="CONNECT WALLET"
                  />
                )}
              </div>

              <div
                className={`z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`}
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900" role="none">
                    Neil Sims
                  </p>
                  <p
                    className="text-sm font-medium text-gray-900 truncate"
                    role="none"
                  >
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
