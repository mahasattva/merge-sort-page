import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api, { getErrorMessage } from '../api/client.js';
import ProductCard from '../components/ProductCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Button from '../components/Button.jsx';

const PAGE_SIZE = 12;

export default function ProductListPage() {
  const [params, setParams] = useSearchParams();
  const categorySlug = params.get('category') || '';
  const query = params.get('q') || '';
  const page = Number(params.get('page') || 1);

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 카테고리 목록은 한 번만 로드
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/categories');
        setCategories(Array.isArray(data) ? data : []);
      } catch { /* 카테고리 실패해도 페이지는 동작 */ }
    })();
  }, []);

  // 카테고리 slug → id 매핑이 필요. categories 로드 전이면 slug 기반 엔드포인트로 직접 호출.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        let data;
        if (categorySlug) {
          const res = await api.get(`/api/categories/${categorySlug}/products`, {
            params: { page, limit: PAGE_SIZE }
          });
          data = res.data;
        } else {
          const res = await api.get('/api/products', {
            params: { page, limit: PAGE_SIZE, q: query || undefined }
          });
          data = res.data;
        }
        if (!cancelled) {
          setItems(data?.items ?? []);
          setTotal(data?.total ?? 0);
        }
      } catch (err) {
        if (!cancelled) setError(getErrorMessage(err, '상품 목록을 불러오지 못했습니다.'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [categorySlug, query, page]);

  function setFilter(nextSlug) {
    const next = new URLSearchParams(params);
    if (nextSlug) next.set('category', nextSlug); else next.delete('category');
    next.delete('page');
    setParams(next);
  }

  function goToPage(nextPage) {
    const next = new URLSearchParams(params);
    next.set('page', String(nextPage));
    setParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="container">
      <h1 className="section-title">
        {query ? `'${query}' 검색 결과` : '상품 목록'}
      </h1>

      <div className="filter-bar" role="group" aria-label="카테고리 필터">
        <button
          type="button"
          className={`filter-chip${!categorySlug ? ' filter-chip--active' : ''}`}
          onClick={() => setFilter('')}
          aria-pressed={!categorySlug}
        >전체</button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={`filter-chip${categorySlug === c.slug ? ' filter-chip--active' : ''}`}
            onClick={() => setFilter(c.slug)}
            aria-pressed={categorySlug === c.slug}
          >{c.name}</button>
        ))}
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="form__error" role="alert">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <div className="empty-state">
          <p className="empty-state__title">조건에 맞는 상품이 없습니다.</p>
          <p>다른 카테고리를 선택하거나 검색어를 바꿔보세요.</p>
        </div>
      )}
      {!loading && !error && items.length > 0 && (
        <>
          <div className="product-grid">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          <div className="pagination" aria-label="페이지 이동">
            <Button
              variant="secondary"
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
            >이전</Button>
            <span className="pagination__info" aria-live="polite">
              {page} / {totalPages} 페이지
            </span>
            <Button
              variant="secondary"
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages}
            >다음</Button>
          </div>
        </>
      )}
    </div>
  );
}
