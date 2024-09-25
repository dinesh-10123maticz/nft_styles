/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Address from "./Address";
import { useState } from "react";
import { getCmsContent, getContactus } from "@/actions/axios/cmsAxios";
import { toast } from "react-toastify";
import { isEmpty } from "@/app/common/common";
export default function Contact() {
  const initialvalue = {
    name: "",
    email: "",
    message: ""
  }
  const [Contactus, setContactus] = useState([]);

  const [formdata, setFormdata] = useState(initialvalue)
  console.log("formdatas", formdata)
  const [status, setStatus] = useState(false)
  console.log("statusss", status)
  const [ValidateError, SetValidateError] = useState({})
  console.log("ValidateError", ValidateError)

  useEffect(() => {
    GetContactus()
  }, [])
  const GetContactus = async () => {
    var resp = await getCmsContent("contactus");
    console.log("contactus", resp)
    if (resp?.status) setContactus(resp.data);
  };
  const handleOnchange = async (e) => {
    SetValidateError({})
    try {
      console.log("value", e.target.value)
      const { id, value } = e.target
      setFormdata({ ...formdata, ...{ [id]: value } })
      console.log("errordatqa", ({ ...formdata, ...{ [id]: value } }))

    } catch (error) {
      console.log("error_contactus", error)

    }
  }

  const validation = () => {

    var Errors = {}
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([A-Za-zA-Z\-0-9]+\.)+[A-Za-zA-Z]{2,}))$/;

    if (!(formdata?.name)) {
      Errors.name = "name cannot be empty"
      console.log('valueeeeedddddd', Errors.name)
    }
    if (!(formdata?.email)) {
      Errors.email = "email cannot be empty"

    }
    if (!emailRegex.test(formdata?.email)) {
      Errors.email = "Enter valid email"
   
    }
    if (!(formdata?.message)) {
      Errors.message = "message cannot be empty"
  
    }
    if (status != true) {
      Errors.agree = "Please Agree Terms of Service"
   
    }
    console.log('valueeeeedddddd', Errors)
    SetValidateError(Errors)
    return Errors
  }

  const handleOnsubmit = async () => {


    try {
      var errors = {};

      let value = validation();
      console.log("value", value)
      if (!isEmpty(value)) {
        SetValidateError(value);
        toast.error("fix all validation");
      }
      else {
        if (Object.keys(errors).length == 0) {

          let Data = {
            name: formdata?.name,
            email: formdata?.email,
            message: formdata?.message,
            agree: status
          }
          console.log("formsdfata", Data)
          let resp = await getContactus(Data)
          console.log("response", resp)
          if (resp?.status == true) {
            toast.success(resp.message)
            setFormdata(initialvalue)
            setStatus(false)

          }
          else {
            toast.error(resp.message)

          }

        }

      }

    } catch (error) {
      console.log("error", error)
    }
  }

  const handleClickbox = async (e) => {
    SetValidateError({})

    console.log("sdfgfdg", e.target.checked)
    if (e.target.checked) {
      setStatus(true)
    }
    else {
      setStatus(false)

    }
  }

  return (
    <section className="relative py-24 dark:bg-jacarta-800">
      <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
        <Image
          width={1920}
          height={789}
          src="/img/gradient_light.jpg"
          alt="gradient"
          className="h-full w-full"
        />
      </picture>
      <div className="container">
        <div className="lg:flex">
          <div className="mb-12 lg:mb-0 lg:w-2/3 lg:pr-12">
            <h2 className="mb-4 font-display text-xl text-jacarta-700 dark:text-white">
              Contact Us
            </h2>
            <div className="mb-16 text-lg leading-normal dark:text-jacarta-300">
              Have a question? Need help? Don't hesitate, drop us a line
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex space-x-7">
                <div className="mb-6 w-1/2">
                  <label
                    htmlFor="name"
                    className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                  >
                    Name<span className="text-red">*</span>
                  </label>
                  <input
                    name="name"
                    className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                    id="name"
                    type="text"
                    value={formdata?.name}
                    onChange={(e) => { handleOnchange(e) }}

                  />
                  {ValidateError && ValidateError.name && <span className="error_msg">{ValidateError.name}</span>}

                </div>

                <div className="mb-6 w-1/2">
                  <label
                    htmlFor="email"
                    className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                  >
                    Email<span className="text-red">*</span>
                  </label>
                  <input
                    name="email"
                    className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"
                    id="email"
                    type="text"
                    value={formdata?.email}

                    onChange={(e) => { handleOnchange(e) }}

                  />
                  {ValidateError && ValidateError.email && <span className="error_msg">{ValidateError.email}</span>}

                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="mb-1 block font-display text-sm text-jacarta-700 dark:text-white"
                >
                  Message<span className="text-red">*</span>
                </label>
                <textarea
                  id="message"
                  className="contact-form-input w-full rounded-lg border-jacarta-100 py-3 hover:ring-2 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:placeholder:text-jacarta-300"

                  name="message"
                  value={formdata?.message}
                  onChange={(e) => { handleOnchange(e) }}
                  rows="5"
                ></textarea>
                {ValidateError && ValidateError.message && <span className="error_msg">{ValidateError.message}</span>}

              </div>

              <div className="mb-6 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="contact-form-consent-input"
                  name="agree-to-terms"
                  checked={status}
                  className="h-5 w-5 self-start rounded border-jacarta-200 text-accent checked:bg-accent focus:ring-accent/20 focus:ring-offset-0 dark:border-jacarta-500 dark:bg-jacarta-600"
                  onClick={(e) => handleClickbox(e)}
                />
                <label
                  htmlFor="contact-form-consent-input"
                  className="text-sm dark:text-jacarta-200"
                >
                  I agree to the{" "}
                  <Link href="/tos" className="text-accent">
                    Terms of Service
                  </Link>
                </label>
               

              </div>
              {ValidateError && ValidateError.agree && <span className="error_msg">{ValidateError.agree}</span>}<br/><br/>
              <button
                type="submit"
                className="rounded-full bg-accent py-3 px-8 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark"
                id="contact-form-submit"
                onClick={() => { handleOnsubmit() }}
              >
                Submit
              </button>

              <div
                id="contact-form-notice"
                className="relative mt-4 hidden rounded-lg border border-transparent p-4"
              ></div>
            </form>
          </div>

          <div className="lg:w-1/3 lg:pl-5">
            <h2 className="mb-4 font-display text-xl text-jacarta-700 dark:text-white">
              {Contactus?.description}
            </h2>
            <div className="mb-6 text-lg leading-normal dark:text-jacarta-300">
              {/* Don't hesitaste, drop us a line Collaboratively administrate
              channels whereas virtual. Objectively seize scalable metrics
              whereas proactive e-services. */}
              <div dangerouslySetInnerHTML={{ __html: Contactus?.answer }}></div>

            </div>

            <Address data={Contactus} />
          </div>
        </div>
      </div>
    </section>
  );
}
