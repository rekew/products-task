import Navbar from "../components/navbar";
import "../styles/UserList.css";
import { useState } from "react";
import { UserListStore } from "../store/userProducts";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/store";

interface list {
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

function UserList() {
  const [modal, setModal] = useState<boolean>(false);
  const {
    data,
    addToUserList,
    removeFromProduct: userProductRemove,
    setUpdate,
  } = UserListStore();
  const {
    removeFromFavorites,
    removeFromProduct,
    data: storeData,
    addToList,
    updateProduct,
  } = useStore();
  const [formData, setFormData] = useState<list>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  });
  const [error, setError] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [targetId, setTargetId] = useState<null | number>(null);

  function getNextIdFromStore() {
    if (storeData.length === 0) return 1;
    const maxId = Math.max(...storeData.map((item) => item.id));
    return maxId + 1;
  }

  //https://as2.ftcdn.net/jpg/00/33/52/49/1000_F_33524989_ZjnZJa6eQRvLoHl0LP125yU09bJPGT7g.jpg

  function handleAdd() {
    const { title, price, description, category, image } = formData;
    const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/i;

    if (title.trim() === "") {
      setError("Title is required");
      return;
    }

    if (price <= 0) {
      setError("Please enter a valid price! Should be more than 0");
      return;
    }

    if (description.trim() === "") {
      setError("Description is required");
      return;
    }

    if (category.trim() === "") {
      setError("Category is required");
      return;
    }

    if (image.trim() === "") {
      setError("Image URL is required");
      return;
    }

    if (!imageUrlRegex.test(image.trim())) {
      setError(`Please enter a valid image URL (ending with .jpg, .png, etc.).
            Example valid URL:
            https://imgv3.fotor.com/images/blog-cover-image/a-shadow-of-a-boy-carrying-the-camera-with-red-sky-behind.jpg`);
      return;
    }

    setError("");
    const newProduct: list = {
      ...formData,
      id: getNextIdFromStore(),
    };
    addToUserList(newProduct);
    addToList(newProduct);

    setFormData({
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    });
    setModal(false);
  }

  const navigate = useNavigate();

  function navigateId(id: number) {
    navigate(`/products/${id}`);
  }

  function handleDelete(id: number) {
    removeFromFavorites(id);
    removeFromProduct(id);
    userProductRemove(id);
  }

  function handleEdit(id: number) {
    const product = data.find((p) => p.id === id);
    if (product) {
      setFormData({ ...product });
      setTargetId(id);
      setEdit(true);
    }
  }

  function handleEditSave() {
    const { title, price, description, category, image } = formData;
    const imageUrlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/i;

    if (title.trim() === "") {
      setError("Title is required");
      return;
    }

    if (price <= 0) {
      setError("Please enter a valid price! Should be more than 0");
      return;
    }

    if (description.trim() === "") {
      setError("Description is required");
      return;
    }

    if (category.trim() === "") {
      setError("Category is required");
      return;
    }

    if (image.trim() === "") {
      setError("Image URL is required");
      return;
    }

    if (!imageUrlRegex.test(image.trim())) {
      setError("Please enter a valid image URL.");
      return;
    }

    setError("");

    updateProduct(formData);
    setUpdate(formData);

    setFormData({
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    });
    setEdit(false);
    setTargetId(null);
  }

  return (
    <>
      <Navbar text="Добавить" onClick={() => setModal(true)} />

      {!modal && !edit && (
        <div className="user-list-products">
          {data.map(
            ({ image, title, id, category, rating, description, price }) => {
              return (
                <div key={id} className="product-card">
                  <div onClick={() => navigateId(id)}>
                    <img src={image} alt={title} className="product-image" />
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
                    <button onClick={() => handleDelete(id)}>
                      Удалить продукт
                    </button>
                    <button onClick={() => handleEdit(id)}>
                      Изменить продукт
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}

      {modal && !edit && (
        <div className="form-add">
          <div className="add-product">
            <h2>Add Product</h2>

            <input
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
            />

            <textarea
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Category"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />

            <div className="btn-group">
              <button onClick={handleAdd} className="green-btn">
                Add
              </button>
              <button onClick={() => setModal(false)} className="red-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {edit &&
        (() => {
          const product = data.find((p) => p.id === targetId);
          return product ? (
            <div className="form-add">
              <div className="add-product">
                <h2>Edit Product</h2>

                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                />

                <textarea
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Category"
                  name="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />

                <div className="btn-group">
                  <button onClick={handleEditSave} className="green-btn">
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEdit(false);
                      setFormData({
                        id: 0,
                        title: "",
                        price: 0,
                        description: "",
                        category: "",
                        image: "",
                        rating: { rate: 0, count: 0 },
                      });
                    }}
                    className="red-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : null;
        })()}

      {error && <h1 className="error-text">{error}</h1>}
    </>
  );
}

export default UserList;
