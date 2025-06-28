import { motion } from "framer-motion";
import Image from "next/image";

const Hero = ({
  username,
  image,
}: {
  username: string | undefined;
  image: string;
}) => {
  return (
    <div className="relative w-screen h-[60vh] overflow-hidden bg-[#f7f1e1] font-serif">
      <Image
        src="/images/home_bg.avif"
        alt="Vintage paper texture"
        fill
        className="object-cover z-0 mix-blend-multiply opacity-60"
        priority
      />

      <div className="absolute top-[10%] left-[2%] z-2 rotate-[-8deg] shadow-lg">
        <div className="bg-white p-2">
          <Image
            src={image}
            alt="Polaroid"
            width={210}
            height={240}
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="absolute top-[-15] right-[-5] w-40 h-40 sm:w-40 sm:h-40 md:top-[-10] md:right-[-5] md:w-80 md:h-80 lg:w-80 lg:h-80 rotate-[15deg]">
        <Image
          src="/images/globe.jpg"
          alt="Globe"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute bottom-[-100] left-[100] w-40 h-40 sm:w-40 sm:h-80 md:w-80 md:h-40 lg:w-120 lg:h-80 rotate-[30deg]">
        <Image
          src="/images/stamp.jpg"
          alt="Stamp"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute bottom-[-16] right-[-10]  w-40 h-40 sm:w-40 sm:h-40 md:bottom-[-16] md:right-0 md:w-80 md:h-40 lg:w80 lg:h-80 rotate-[-15deg]">
        <Image
          src="/images/map.svg"
          alt="Map"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-40 sm:h-40 md:bottom-[-50] md:right-0 md:w-60 md:h-60 lg:w-48 lg:h-48 rotate-[40deg]">
        <Image
          src="/images/round_flights.svg"
          alt="Flights"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div
        className="absolute top-4 left-54 w-20 h-20 sm:w-40 sm:h-40
        md:top-[10] md:left-[240] md:w-36 md:h-36 lg:w-48 lg:h-48 rotate-[6deg] xl:w-32 xl:h-32"
        style={{
          animation: "bounce 3s ease-in-out infinite",
        }}
      >
        <Image
          src="/images/calendar.svg"
          alt="Calendar"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute top-[80] right-[-30] w-1/2 h-1/2 sm:w-40 sm:h-40 md:top-0 md:right-[80] md:w-80 md:h-80 lg:top-[-10] lg:right-[260] lg:w-96 lg:h-96 rotate-[-50deg]">
        <Image
          src="/images/trail.svg"
          alt="Trail"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div
        className="absolute bottom-[180] right-[10] w-15 h-15 sm:w-40 sm:h-40 md:w-36 md:h-36 lg:top-[30] lg:right-[50] lg:w-32 lg:h-32 xl:w-32 xl:h-32"
        style={{
          animation: "bounce 3s ease-in-out infinite",
        }}
      >
        <Image
          src="/images/bag.svg"
          alt="Bag"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div
        className="absolute bottom-[60] left-[160] w-20 h-20 sm:w-40 sm:h-40 md:bottom-[40] md:left-[240] md:w-36 md:h-36 lg:bottom-[-40] lg:left-[300] lg:w-32 lg:h-32 xl:w-40 xl:h-40"
        style={{
          animation: "bounce 3s ease-in-out infinite",
        }}
      >
        <Image
          src="/images/food.svg"
          alt="Food"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute lg:bottom-0 lg:right-[280] lg:w-48 lg:h-48 xl:bottom-0 xl:right-[320] xl:w-48 xl:h-48">
        <Image
          src="/images/beach.svg"
          alt="Beach"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute lg:top-0 lg:right-[280] lg:w-48 lg:h-48 xl:bottom-0 xl:left-[520] xl:w-32 xl:h-32">
        <Image
          src="/images/sign.svg"
          alt="SignBoard"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Text */}
      <div className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center px-4 gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            duration: 1,
            ease: "easeOut",
          }}
          className="text-[calc(1rem+4vw)] font-playfair  text-black  px-2 bg-white"
        >
          {`Welcome ${username || "User"}`}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2,
            duration: 1,
            ease: "easeOut",
          }}
          className="text-[calc(1rem+1.5vw)] italic text-gray-700 font-handwritten bg-white px-2"
        >
          Let’s write your next chapter.
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
