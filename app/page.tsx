"use client";
import React from "react";
import "./globals.css";
import Navbar from "@/src/Components/Navbar";
import Badge from "@/src/Components/Badges/Badges";
import Image from "next/image";
import bg from "../src/img/Dashboard.jpg";
import {
  SecondTextWithImage,
  TextWithImage,
} from "@/src/Components/TextWithCard/TextWithImage";
import CardService from "@/src/Components/Card/CardService";

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header>
        <Navbar />
      </header>
      <main className="p-5">
        <section className="flex flex-col items-center justify-center gap-5 mt-16">
          <Badge />
          <h1 className="text-6xl font-semibold text-black dark:text-white">
            Build your SaaS in seconds
          </h1>
          <p className="text-black dark:text-white">
            This template demonstrates most of NapoPlate&#39;s components.
            It&#39;s a great starting point to build your own SaaS.
          </p>
          <div className="mt-14">
            <Image
              className="rounded-xl"
              src={bg}
              alt="Image de fond du tableau de bord"
              width={1375}
            />
          </div>
        </section>

        {/* First Section */}
        <section className="flex flex-col items-center justify-center mt-96">
          <TextWithImage />
        </section>

        {/* Second Section */}
        <section className="flex flex-col items-center justify-center mt-52">
          <SecondTextWithImage />
        </section>

        {/*Card Section*/}
        <section className="flex items-center justify-center mt-10">
          <CardService />
        </section>
      </main>
    </div>
  );
}
