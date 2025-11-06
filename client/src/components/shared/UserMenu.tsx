'use client';

import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    imageUrl: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50">
        <Image
          className="h-8 w-8 rounded-full bg-gray-50"
          src={user.imageUrl}
          alt=""
          width={32}
          height={32}
        />
        <span className="sr-only">Your profile</span>
        <span aria-hidden="true">{user.name}</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="/profile"
                className={`${
                  active ? 'bg-gray-50' : ''
                } block px-3 py-1 text-sm leading-6 text-gray-900`}
              >
                Your profile
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="/settings"
                className={`${
                  active ? 'bg-gray-50' : ''
                } block px-3 py-1 text-sm leading-6 text-gray-900`}
              >
                Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => {/* Handle sign out */}}
                className={`${
                  active ? 'bg-gray-50' : ''
                } block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900`}
              >
                Sign out
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
