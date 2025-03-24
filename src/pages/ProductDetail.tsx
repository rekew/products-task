import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "../store/store";
import "../styles/detailedProduct.css";

function Detail() {
  const { id } = useParams();
  const { data } = useStore();
  const navigate = useNavigate();

  console.log(data);

  const details = data.find((p) => p.id === Number(id));

  if (!details) {
    return <p>Loading product details...</p>;
  }

  const { image, rating, title, price, category, description } = details;

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>

      <div className="product-detail-card">
        <div className="product-image-section">
          <img src={image} alt={title} className="product-detail-image" />
        </div>

        <div className="product-info-section">
          <h2 className="product-title">{title}</h2>
          <p className="product-category">
            Category: <span>{category}</span>
          </p>
          <p className="product-price">
            Price: <strong>${price}</strong>
          </p>
          <p className="product-rating">
            Rating: {rating.rate} ★ ({rating.count} reviews)
          </p>

          <p className="product-description-title">Description:</p>
          <p className="product-full-description">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
