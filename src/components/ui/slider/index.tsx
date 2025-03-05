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
      className="heroSlider h-[500px] lg:h-[650px]"
    >
      {sliderData.map(({ id, bg }) => (
        <SwiperSlide
          className="h-full relative flex justify-center items-center"
          key={id}
        >
          <div className="absolute top-0 w-full h-full">
            <Image className="object-cover h-full w-full" src={bg} alt="logo" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
