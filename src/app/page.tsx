"use client";

import BookForm from "@/components/BookForm";
import SearchResult from "@/components/SearchResult";
import HeroSlider from "@/components/Slider";

function Posts() {
  return (
    <div>
      <div className="relative">
        <HeroSlider />

        <div className="bg-gray-700/60 p-4 lg:absolute lg:left-0 lg:right-0 lg:p-0 bottom-0 lg:z-30 lg:shadow-xl">
          <BookForm />
        </div>
      </div>
      <SearchResult />
    </div>
  );
}
export default Posts;
