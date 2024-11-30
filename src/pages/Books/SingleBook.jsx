import { useParams } from "react-router-dom";
import { useFetchBookByIdQuery } from "../../redux/features/cart/bookApi";
import { getImgUrl } from "../../utilis/getImgUrl";
import { FaOpencart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";


function SingleBook() {
  const { id } = useParams();
  const { data: books = [], isLoading, isError } = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div>Loading.....</div>;
  if (isError) return <div>Error happing to load book info</div>;

  return (
    <>
      <div className="max-w-lg shadow-md p-5">
        <h1 className="text-2xl font-bold mb-6"></h1>

        <div className="">
          <div>
            <img
              src={`${getImgUrl(books.book.coverImage)}`}
              alt={books.book.title}
              className="mb-8"
            />
          </div>

          <div className="mb-5">
            <p className="text-gray-700 mb-2">
              <strong>Author:</strong> {books.book.author || "admin"}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Published:</strong>{" "}
              {new Date(books.book?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4 capitalize">
              <strong>Category:</strong> {books.book?.category}
            </p>
            <p className="text-gray-700">
              <strong>Description:</strong> {books.book.description}
            </p>
          </div>

          <button
            onClick={() => handleAddToCart(books.book)}
            className="btn-primary px-6 space-x-1 flex items-center gap-1 "
          >
            <FaOpencart className="size-6" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleBook;
