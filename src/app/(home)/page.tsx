"use client";

import ResultSearchBooking from "@/components/features/home/result-search-booking";
import BookRoomForm from "@/components/forms/book-rooms";
import HeroSlider from "@/components/ui/slider";

function Posts() {
  return (
    <div>
      <div className="relative">
        <HeroSlider />

        <div className="p-4 lg:absolute lg:left-0 lg:right-0 lg:p-0 bottom-16 lg:z-30">
          <BookRoomForm />
        </div>
      </div>
      <ResultSearchBooking />
    </div>
  );
}

export default Posts;
