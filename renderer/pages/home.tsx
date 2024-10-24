import React, { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Sidebar } from "../components/Sidebar";
import { HomePageHeader } from "../components/homepage/Header";
import Models from "./models";
import FeaturedModels from "../components/homepage/FeaturedModels";
import HeroCarousel from "../components/homepage/HeroCaousel";
import FeaturedTools from "../components/homepage/FeaturedTools";

export default function HomePage() {
  return (
    <>
      <HomePageHeader />
      <HeroCarousel />
      <FeaturedModels />
      <FeaturedTools />
    </>
  );
}
{
  /* <div className="m-5 flex justify-center">

      <Link href="/playground">Playground</Link>
    </div> */
}
