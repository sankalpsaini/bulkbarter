import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  ClockIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import Listing from "../components/listing";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase_setup/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { TextField, FormControl, Button } from "@mui/material";

const auth = getAuth();

async function GetUserInfo() {
  try {
    const user = auth.currentUser;
    console.log(user);

    if (user) {
      const userEmail = user.email;

      // Create a reference to the "Users" collection
      const usersCollection = collection(db, "Users");

      // Create a query to find documents where the "Email" field matches the user's email
      const q = query(usersCollection, where("Email", "==", userEmail));

      // Execute the query to get a list of matching documents
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);

      if (!querySnapshot.empty) {
        // There should be only one document with a matching email
        const userData = querySnapshot.docs[0].data();
        return userData;
      } else {
        console.log("No user found with this email.");
        return null;
      }
    } else {
      console.log("No user is currently signed in.");
      return null;
    }
  } catch (error) {
    console.error("Error getting user info: ", error);
    throw error;
  }
}

const navigation = [
  { name: "Shop", href: "/dashboard", icon: ShoppingBagIcon, current: false },
  { name: "Friends", href: "#", icon: UsersIcon, current: false },
  { name: "Trips", href: "#", icon: ShoppingCartIcon, current: true },
  { name: "History", href: "#", icon: ClockIcon, current: false },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Your postings", href: "#" },
  { name: "Sign out", href: "/" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Trips() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [postDescription, setPostDescription] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [mou, setMou] = React.useState(null);
  const [nou, setNou] = React.useState(null);
  const [store, setStore] = React.useState(null);
  const [price, setPrice] = React.useState(null);

  let [isOpen, setIsOpen] = useState(false);

  async function AddPost() {
    try {
      const postDocRef = await addDoc(collection(db, "Posts"), {
        Description: postDescription,
        EndTime: endTime,
        MoU: mou,
        NoU: nou,
        Party: "",
        Price: price,
        Picture: selectedImage,
        Store: store,
        User: "data.get('userName')",
        Comid: "", // Initialize Comid with an empty string
      });

      console.log("Post Document written with ID: ", postDocRef.id);

      // Create a new comment document
      const commentDocRef = await addDoc(collection(db, "Comments"), {
        Users: {}, // Initialize Users with an empty map
      });

      console.log("Comment Document written with ID: ", commentDocRef.id);

      // Update the Comid field in the post document with the ID of the comment document
      await setDoc(
        collection(db, "Posts", postDocRef.id),
        {
          Comid: commentDocRef.id,
        },
        { merge: true }
      );

      console.log(
        "Comid field in Post Document updated with Comment Document ID."
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [userData, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = auth.currentUser;
        if (user) {
          const userEmail = user.email;

          // Fetch user data
          const usersCollection = collection(db, "Users");
          const userQuery = query(
            usersCollection,
            where("Email", "==", userEmail)
          );
          const userQuerySnapshot = await getDocs(userQuery);

          if (!userQuerySnapshot.empty) {
            const userData = userQuerySnapshot.docs[0].data();
            setUserInfo(userData); // Set the user data in the component state
          } else {
            console.log("No user found with this email.");
          }

          // Fetch posts
          const postsCollection = collection(db, "Posts");
          const postsQuerySnapshot = await getDocs(postsCollection);

          if (!postsQuerySnapshot.empty) {
            const postList = [];
            postsQuerySnapshot.forEach((doc) => {
              const postData = doc.data();
              postList.push(postData);
            });
            setPosts(postList); // Set the post data in the component state
          } else {
            console.log("No posts found.");
          }
        } else {
          console.log("No user is currently signed in.");
        }
      } catch (error) {
        console.error("Error getting user info: ", error);
      }
    }

    fetchData();
  }, []);

  // Check if userData is null before accessing its properties
  const firstName = userData ? userData["FirstName"] : "";
  const lastName = userData ? userData["LastName"] : "";

  const postsdb = posts.map((post) => (
    <Listing
      Description={post.Description}
      User={post.User}
      Picture={post.Picture}
      Store={post.Store}
      EndTime={post.EndTime}
      price={post.Price}
      MoU={post.MoU}
      NoU={post.NoU}

      // Description="Pickle Jars (4L)"
      // User="Zaddimus Prime"
      // Picture="https://images.costcobusinessdelivery.com/ImageDelivery/imageService?profileId=12027981&itemId=4352&recipeName=680"
      // Store="CostCo South Edmonton"
      // EndTime="Sep 17 10:15 a.m."
      // price="2.50"
      // MoU="4"
      // NoU="100"
    ></Listing>
  ));

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#273458] px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/landingbulkbarterlogonotext.png"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-indigo-700 text-white"
                                      : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-white"
                                        : "text-indigo-200 group-hover:text-white",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#273458] px-6 pb-6">
            <div className="flex h-16 shrink-0 items-center pt-4">
              <img
                className="h-16 w-auto"
                src="/landingbulkbarterlogonotext.png"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-700 text-white"
                              : "text-indigo-200 hover:text-white hover:bg-indigo-700",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-white"
                                : "text-indigo-200 group-hover:text-white",
                              "h-6 w-6 shrink-0"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://i.pinimg.com/474x/5d/cf/02/5dcf02265a260bb0902c1ec504d1743b.jpg"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {firstName + " " + lastName}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
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
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="bottom-10 right-10 fixed">
                <Fab color="primary" aria-label="add" onClick={openModal}>
                  <AddIcon />
                </Fab>

                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                              as="h3"
                              className="text-3xl font-medium leading-6 text-gray-900 pb-4"
                            >
                              Create listing
                            </Dialog.Title>
                            <div className="mt-2">
                              <FormControl className="text-sm">
                                <TextField
                                  type="text"
                                  color="primary"
                                  label="Description"
                                  sx={{ m: 1 }}
                                  onChange={(e) =>
                                    setPostDescription(e.target.value)
                                  }
                                />
                                <TextField
                                  type="text"
                                  color="primary"
                                  label="Amount you have"
                                  sx={{ m: 1 }}
                                  onChange={(e) => setNou(e.target.value)}
                                />
                                <TextField
                                  type="text"
                                  color="primary"
                                  label="Minimum to buy"
                                  sx={{ m: 1 }}
                                  onChange={(e) => setMou(e.target.value)}
                                />
                                <TextField
                                  type="text"
                                  color="primary"
                                  label="Store"
                                  sx={{ m: 1 }}
                                  onChange={(e) => setStore(e.target.value)}
                                />
                                <TextField
                                  type="text"
                                  color="primary"
                                  label="End Time"
                                  sx={{ m: 1 }}
                                  onChange={(e) => setEndTime(e.target.value)}
                                />
                                <TextField
                                  type="text"
                                  color="primary"
                                  label="Price"
                                  sx={{ m: 1 }}
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                                <div>
                                  {selectedImage && (
                                    <div>
                                      <img
                                        alt="not found"
                                        width={"100px"}
                                        src={URL.createObjectURL(selectedImage)}
                                      />
                                      <br />
                                      <button
                                        onClick={() => setSelectedImage(null)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <Button variant="contained" component="label">
                                  Upload Image
                                  <input
                                    hidden
                                    accept="image/*"
                                    multiple
                                    type="file"
                                    name="myImage"
                                    aria-label="myImage"
                                    onChange={(event) => {
                                      setSelectedImage(event.target.files[0]);
                                    }}
                                  />
                                </Button>
                              </FormControl>
                              {/* <p className="text-sm text-gray-500">
                                Your payment has been successfully submitted. We’ve sent
                                you an email with all of the details of your order.
                              </p> */}
                            </div>

                            <div className="mt-4">
                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => {
                                  AddPost();
                                  closeModal();
                                }}
                              >
                                Post!
                              </button>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>

              <div className="px-4 sm:px-6 lg:px-8">
                <div className="text-2xl font-bold py-4">Upcoming Trips</div>
                <div className="text-md font-bold">Pickles</div>
                <div>Amount: 12</div>
                <div className="text-red-500">UNCONFIRMED</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
