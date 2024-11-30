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

const categories = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const TopSellers = () => {
  // const [books, setBooks] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("Choose a genre");

  // useEffect(() => {
  //   //  fetch data from the public folder
  //   fetch("books.json")
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data));
  // }, []);

  const { data: books = [] } = useFetchAllBooksQuery();

  const filterBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  return (
    <>
      <div className="py-10">
        <h2 className="text-3xl font-semibold mb-6">Top Seller</h2>
        {/* Categories  */}
        <div className="mb-8 flex items-center">
          <select
            onChange={(e) => {
              setselectedCategory(e.target.value);
            }}
            name="category"
            id="category"
            className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {/*  Swiper Js used to a=making slider  */}
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
          {filterBooks.length > 0 ?
            filterBooks.map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard key={index} book={book} />
              </SwiperSlide>
            )): <h2>No Book Found</h2>}
        </Swiper>

        {/* showm filter books  */}
      </div>
    </>
  );
};

export default TopSellers;
