import { NextPage } from "next";
import { signIn } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  GitHubLogoIcon,
  StitchesLogoIcon,
  TwitterLogoIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

import logger from "@/utils/logger";

import Button from "@/components/Button";

import { getSampleMethodAPI } from "@/services/sample";

import type { UserForm } from "./types";

const LoginPage: NextPage = () => {
  const [userInfo, setUserInfo] = useState<UserForm>({
    accountNum: "",
    email: "",
    password: "",
  });

  const [bookmarksChecked, setBookmarksChecked] = useState(true);
  const [urlsChecked, setUrlsChecked] = useState(false);
  const [person, setPerson] = useState("pedro");

  const handleLoad = useCallback(async () => {
    const { success, message } = await getSampleMethodAPI();

    if (success) logger(message);
  }, []);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    // validate your userinfo
    event.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    logger(res);
  };

  const handleChange =
    (key: keyof UserForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserInfo((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  return (
    <div className="radix-background flex h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="mt-12 w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="account-number" className="sr-only">
                Account number
              </label>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="IconButton" aria-label="Customise options">
                    Options
                    <svg
                      className="icon-chevron"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.18179 6.18181C4.35753 6.00608 4.64245 6.00608 4.81819 6.18181L7.49999 8.86362L10.1818 6.18181C10.3575 6.00608 10.6424 6.00608 10.8182 6.18181C10.9939 6.35755 10.9939 6.64247 10.8182 6.81821L7.81819 9.81821C7.73379 9.9026 7.61934 9.95001 7.49999 9.95001C7.38064 9.95001 7.26618 9.9026 7.18179 9.81821L4.18179 6.81821C4.00605 6.64247 4.00605 6.35755 4.18179 6.18181Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="DropdownMenuContent"
                    sideOffset={5}
                  >
                    <DropdownMenu.Item className="DropdownMenuItem">
                      New Tab
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      New Window
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="DropdownMenuSeparator" />

                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger className="DropdownMenuSubTrigger">
                        Favorites
                        <div className="RightSlot">
                          <ChevronRightIcon />
                        </div>
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.Portal>
                        <DropdownMenu.SubContent className="DropdownMenuSubContent">
                          <DropdownMenu.Item className="DropdownMenuItem SubItem">
                            <GitHubLogoIcon /> Github
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="DropdownMenuItem SubItem">
                            <StitchesLogoIcon /> Stitches
                          </DropdownMenu.Item>
                          <DropdownMenu.Item className="DropdownMenuItem SubItem">
                            <TwitterLogoIcon /> Twitter
                          </DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Portal>
                    </DropdownMenu.Sub>

                    <DropdownMenu.Item className="DropdownMenuItem">
                      Downloads
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="DropdownMenuSeparator" />

                    <DropdownMenu.CheckboxItem
                      className="DropdownMenuCheckboxItem"
                      checked={bookmarksChecked}
                      onCheckedChange={setBookmarksChecked}
                    >
                      <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                        <CheckIcon />
                      </DropdownMenu.ItemIndicator>
                      Show Toolbar
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.CheckboxItem
                      className="DropdownMenuCheckboxItem"
                      checked={urlsChecked}
                      onCheckedChange={setUrlsChecked}
                    >
                      <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
                        <CheckIcon />
                      </DropdownMenu.ItemIndicator>
                      Show Full URLs
                    </DropdownMenu.CheckboxItem>

                    <DropdownMenu.Arrow className="DropdownMenuArrow" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>

            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={userInfo.email}
                autoComplete="email"
                required
                onChange={handleChange("email")}
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={userInfo.password}
                onChange={handleChange("password")}
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full justify-center">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
