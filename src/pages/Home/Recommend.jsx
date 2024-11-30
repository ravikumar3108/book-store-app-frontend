import React, { useEffect, useState } from "react";
import BookCard from "../Books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/cart/bookApi";

const Recommend = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  console.log("recomm", books);

  return (
    <>
      <div className="py-10">
        <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          // pagination={{
          //   clickable: true,
          // }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1180: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {books.length > 0 &&
            books.map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard key={index} book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};

export default Recommend;
