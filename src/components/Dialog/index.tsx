import React, { useRef, useState } from "react";
import { X } from "react-feather";
import axios, { AxiosError } from "axios";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { PuffLoader } from "react-spinners";

interface IDialog {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tag: string;
}

function Dialog({ setOpen, tag }: IDialog) {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const [status, setStatus] = useState({
    status: "",
    loading: false,
  });
  const formikRef = useRef<FormikProps<typeof initialValues>>(null);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const requestBoy = {
    email_address: "",
    email_type: "html",
    status: "subscribed",
    merge_fields: { FNAME: "", LNAME: "" },
    tags: [""],
  };

  const onSubmit = async (values: { [x: string]: unknown }) => {
    try {
      setStatus((status) => ({ ...status, loading: true }));
      await axios.post(
        `api/mailchimp`,
        {
          ...requestBoy,
          email_address: values["email"],
          merge_fields: {
            FNAME: values["firstName"],
            LNAME: values["lastName"],
          },
          tags: [tag],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus({ status: "success", loading: false });
    } catch (e: unknown) {
      setStatus({ status: "error", loading: false });
      console.error("Error:", (e as AxiosError).response?.data);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    if (formikRef.current) formikRef.current.resetForm();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleDialogClose();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-lg fade-in"
      onClick={handleOverlayClick}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        innerRef={formikRef}
      >
        <Form className="flex flex-col gap-5 w-full max-w-md p-8 bg-white rounded-lg shadow-md ">
          <X
            onClick={handleDialogClose}
            className="absolute top-2 right-2 cursor-pointer"
          />
          <div className="text-left">
            <Field
              name="firstName"
              placeholder="First Name"
              className="w-full p-2 rounded border border-gray-300"
            />
            <ErrorMessage
              name="firstName"
              component="span"
              className="text-red-500"
            />
          </div>

          <div className="text-left">
            <Field
              name="lastName"
              placeholder="Last Name"
              className="w-full p-2 rounded border border-gray-300"
            />
            <ErrorMessage
              name="lastName"
              component="span"
              className="text-red-500"
            />
          </div>

          <div className="text-left">
            <Field
              name="email"
              placeholder="E-Mail"
              className="w-full p-2 rounded border border-gray-300"
            />
            <ErrorMessage
              name="email"
              component="span"
              className="text-red-500"
            />
          </div>

          {status.status === "success" ? (
            "You've been added to the RSVP list"
          ) : (
            <button
              type="submit"
              className="w-full text-white py-2 px-4 rounded flex justify-center"
              disabled={status.loading}
              style={{
                background: status.status === "error" ? "red" : "black",
              }}
            >
              {status.loading ? (
                <PuffLoader size={24} color="white" />
              ) : status.status === "error" ? (
                "Try Again"
              ) : (
                "Submit"
              )}
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
}

export default Dialog;
