import { Swiper, SwiperSlide } from "swiper/react";
import { sliderData } from "@/constants/data";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import "swiper/css/effect-fade";
import "swiper/css";

const HeroSlider = () => {
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="heroSlider fixed top-0 left-0 w-full h-screen -z-50"
    >
      {sliderData.map(({ id, bg }) => (
        <SwiperSlide
          className="h-full relative flex justify-center items-center"
          key={id}
        >
          <div className="absolute top-0 w-full h-full">
            <Image
              className="object-cover"
              src={bg}
              alt="logo"
              fill
              priority
              sizes="100vw"
              quality={100}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
