import { useState, useEffect } from "react";
import { useStore } from "../store/store";
import { UserListStore } from "../store/userProducts";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function Product({ fltr, searchText }: { fltr: string; searchText: string }) {
  useEffect(() => {
    setCurrentPage(1);
  }, [fltr, searchText]);

  const {
    data,
    removeFromFavorites,
    addToFavorites,
    favorites,
    removeFromProduct,
  } = useStore();
  const { removeFromProduct: userProductRemove } = UserListStore();

  let show = fltr === "favorites" ? favorites : data;

  if (searchText.trim() !== "") {
    show = show.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(show.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = show.slice(startIndex, endIndex);

  const isEmpty = show.length === 0;

  function handleFavorite(isFavorited: any, product: Product) {
    if (isFavorited) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  }

  function handleDelete(id: number) {
    if (fltr === "favorites") {
      removeFromFavorites(id);
    }
    removeFromProduct(id);
    userProductRemove(id);
  }

  function navigateId(id: number) {
    navigate(`/products/${id}`);
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  return (
    <>
      {isEmpty ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h3>
            {fltr === "favorites"
              ? "Нет продуктов в избранном"
              : "Нет продуктов в списке"}
          </h3>
        </div>
      ) : (
        <>
          <div className="page-container">
            <div className="products">
              {currentItems.map(
                ({
                  id,
                  image,
                  title,
                  category,
                  rating,
                  description,
                  price,
                }) => {
                  const isFavorited = favorites.some(
                    (product) => product.id === id
                  );

                  return (
                    <div key={id} className="product-card">
                      <div onClick={() => navigateId(id)}>
                        <img
                          src={image}
                          alt={title}
                          className="product-image"
                        />
                        <h3>{title}</h3>
                        <p>
                          <strong>${price}</strong>
                        </p>
                        <p>{category}</p>
                        <p className="product-description">
                          {description.slice(0, 100)}...
                        </p>
                        <p>
                          rate : {rating.rate} ({rating.count} reviews)
                        </p>
                      </div>

                      <div className="buttons">
                        <button
                          onClick={() =>
                            handleFavorite(isFavorited, {
                              id,
                              image,
                              title,
                              category,
                              rating,
                              description,
                              price,
                            })
                          }
                        >
                          {isFavorited
                            ? "Удалить из избранного"
                            : "Добавить в избранное"}
                        </button>
                        <button onClick={() => handleDelete(id)}>
                          Удалить продукт
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                Назад
              </button>
              <span>
                Страница {currentPage} из {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Вперед
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Product;
