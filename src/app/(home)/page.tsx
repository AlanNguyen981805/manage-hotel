"use client";

import ResultSearchBooking from "@/components/features/home/result-search-booking";
import BookRoomForm from "@/components/forms/book-rooms";
import HeroSlider from "@/components/ui/slider";

function Posts() {
  return (
    <div>
      <div className="relative">
        <HeroSlider />

        <div className="bg-gray-700/60 p-4 lg:absolute lg:left-0 lg:right-0 lg:p-0 bottom-0 lg:z-30 lg:shadow-xl">
          <BookRoomForm />
        </div>
      </div>
      <ResultSearchBooking />
    </div>
  );
}

export default Posts;
