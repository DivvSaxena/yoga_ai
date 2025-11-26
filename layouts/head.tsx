import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";

export const Head = () => {
  return (
    <NextHead>
      <title>{siteConfig.name} - AI Fitness for India</title>
      <meta
        key="title"
        content={`${siteConfig.name} - AI Fitness for India`}
        property="og:title"
      />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={siteConfig.description} name="description" />
      <meta
        content="YogaAI, fitness, diet plan, workout, yoga, Indian diet, AI fitness, health, wellness, personalized nutrition"
        name="keywords"
      />
      <meta content="YogaAI" name="author" />
      <meta content="website" property="og:type" />
      <meta content="en_IN" property="og:locale" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <meta content="#17c964" name="theme-color" />
      <link href="/favicon.ico" rel="icon" />
    </NextHead>
  );
};
