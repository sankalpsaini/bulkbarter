import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField, FormControl, Alert } from "@mui/material";

export default function Listing(props) {

  let [isOpen, setIsOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setShowAlert(true);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleCloseAlert() {
    setShowAlert(false);
  }

  return (
    <>
    <Card sx={{ border: 1, height: 530, width: 310 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="listing">
            {props.User ? props.User[0] : "?"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.Description}
        subheader={props.EndTime + " •  $" + props.price}
      />
      <div className="h-[300px]">
        <CardMedia
          component="img"
          height="20"
          image={props.Picture ? props.Picture : "/default.jpeg"}
          alt={props.Description}
        />
      </div>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <div>Total units available: {props.NoU}</div>
          Minimum units to purchase: {props.MoU}
        </Typography>
        <button className="bg-blue-400 mt-4 p-2 rounded-md text-white hover:bg-blue-600" onClick={openModal}>
          I'm Interested
        </button>
      </CardContent>
    </Card>
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
                        label="Purchase Amount"
                        sx={{ m: 1 }}
                      />
                    </FormControl>
                    <p className="text-sm text-gray-500">
                      Once you press confirm, we will send a notification to the listing owner so you can arrange a pickup time!
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Confirm Order!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {showAlert && (
        <div className="bottom-10 fixed">
          <Alert severity="info" onClose={handleCloseAlert}>
            Order Confirmed!
          </Alert>
        </div>
      )}
      </>
  );
}
