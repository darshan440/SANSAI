import Link from "next/link";

import Image from "next/image";
import { Button } from "./ui/button";

const heroSection = () => {
  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title">
            Your AI Carrer Coch for
            <br />
            Professional Success
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Advance your Carrer with persnalized guidence, interview prep and
            AI-powered Tools for job success.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button className="px-8" size="lg">
              Get Started
            </Button>
          </Link>

          <Link href="/">
            <Button className="px-8" size="lg" variant="outline">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="">
          <div>
            <Image
              className="rounded-lg shadow-2xl border mx-auto"
              src={"/banner.jpeg"}
              width={1280}
              height={720}
              alt="Banner Sensai"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default heroSection;
