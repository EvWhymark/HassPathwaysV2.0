"use client";

import React, { useState, useEffect } from "react";
import * as Icon from "../components/utils/Icon";
import NavigationBar from "../components/navigation/NavigationBar";
import Footer from "../components/navigation/Footer";

const FAQ = () => {
  const [faqQuestions, setFaqQuestions] = useState([]);

  useEffect(() => {
    const getFAQ = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/faq");
        if (!res.ok) {
          throw new Error("Failed to fetch FAQ");
        }
        const data = await res.json();
        setFaqQuestions(data);
      } catch (error) {
        console.error("Error fetching FAQ:", error);
      }
    };
    getFAQ();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar className="flex" />
      <main className="flex-1 flex flex-col px-8 items-center w-full">
        <header className="py-8 md:py-16 flex flex-col gap-6 items-center w-full">
          <section className="flex flex-col gap-3 items-center">
            {/* <p className="text-primary-700 text-md font-semibold">FAQs</p> */}
            {/* <h1 className="text-display-sm md:text-display-lg font-semibold"> */}
            <h1 className="text-display-sm md:text-display-md md:title font-semibold">
              Frequently asked questions
            </h1>
          </section>
          <p className="text-center text-text-tertiary text-md md:text-xl font-semibold">
            Have questions? We're here to help.
          </p>
        </header>

        <section className="flex justify-center items-start gap-x-8 gap-y-16 flex-wrap mb-24 max-w-screen-xl px-8">
          {faqQuestions.map((question) => {
            const IconName = question.icon;
            let IconComponent = Icon.Plus;

            switch (IconName) {
              case "Certificate":
                IconComponent = Icon.Certificate;
                break;
              case "SwitchHorizontal":
                IconComponent = Icon.SwitchHorizontal;
                break;
              case "BookOpen":
                IconComponent = Icon.BookOpen;
                break;
              case "GraduationHat":
                IconComponent = Icon.GraduationHat;
                break;
              case "Announcement":
                IconComponent = Icon.Announcement;
                break;
              case "Plus":
                IconComponent = Icon.Plus;
                break;
              case "Share":
                IconComponent = Icon.Share;
                break;
              case "User":
                IconComponent = Icon.User;
                break;
              case "Archive":
                IconComponent = Icon.Archive;
                break;
              case "ClockFastForward":
                IconComponent = Icon.ClockFastForward;
                break;
              case "Star":
                IconComponent = Icon.Star;
                break;
              default:
                IconComponent = Icon.Plus;
            }

            return (
              <section key={question.question} className="max-w-[384px]">
                <div className="mb-5 border-8 border-solid border-utility-brand-50 bg-utility-brand-100 rounded-full w-fit p-3 mx-auto flex items-center justify-center">
                  {IconComponent && (
                    <IconComponent className="w-6 h-6 path-primary-600" />
                  )}
                </div>

                <div>
                  <header className="text-md md:text-xl font-semibold text-center text-utility-gray-900 md-2">
                    {question.question}
                  </header>
                  <p className="text-center text-sm md:text-md text-utility-gray-600">
                    {question.answer}
                  </p>
                </div>
              </section>
            );
          })}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
