import Image from "next/image";
import Link from "next/link";
import React from "react";
import { moonblossom } from "../fonts";

const PageHeader = () => {
  return (
    <Link href="/" className="mb-20 md:mb-32">
      <div className="flex items-center">
        <Image
          src="/hgt_logo_hi.png"
          alt="Heard Good Things logo"
          width={300}
          height={300}
          priority
        />
        <h1
          className={`text-6xl md:text-8xl ${moonblossom.className} max-w-[90px] md:max-w-[120px]`}
        >
          SH&#8203;OP
        </h1>
      </div>
    </Link>
  );
};

export default PageHeader;
