"use client";

import ResultSearchBooking from "@/components/features/home/result-search-booking";
import BookRoomForm from "@/components/forms/book-rooms";
import HeroSlider from "@/components/ui/slider";

function Posts() {
  return (
    <div className="relative">
      <HeroSlider />
      <div className="relative z-10">
        <div className="relative">
          <div className="p-4 lg:absolute lg:left-0 lg:right-0 lg:p-0 bottom-64 lg:z-30">
            <BookRoomForm />
          </div>
        </div>
        <ResultSearchBooking />
      </div>
    </div>
  );
}

export default Posts;
