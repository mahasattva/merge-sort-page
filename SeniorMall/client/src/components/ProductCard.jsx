import { Link } from 'react-router-dom';

function formatPrice(n) {
  if (typeof n !== 'number') return '-';
  return `${n.toLocaleString('ko-KR')}원`;
}

export default function ProductCard({ product }) {
  if (!product) return null;
  const { id, name, price, imageUrl, category } = product;
  return (
    <Link to={`/products/${id}`} className="product-card" aria-label={`${name}, 가격 ${formatPrice(price)}`}>
      <div className="product-card__image-wrap">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="product-card__image" loading="lazy" />
        ) : (
          <div className="product-card__placeholder" aria-hidden="true">사진 준비 중</div>
        )}
      </div>
      <div className="product-card__body">
        {category?.name && <span className="product-card__category">{category.name}</span>}
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{formatPrice(price)}</p>
      </div>
    </Link>
  );
}
