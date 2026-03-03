import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { BASE_URL } from "../constants";

const Product = ({ product }) => {
  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("/uploads")) {
      return `${BASE_URL}${path}`;
    }
    return path;
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={getImageUrl(product.image)} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews}reviews`} />
        </Card.Text>

        <Card.Text as="h3">
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product