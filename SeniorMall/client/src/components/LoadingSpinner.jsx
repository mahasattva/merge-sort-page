// 색깔만으로 상태를 구분하지 않도록 텍스트 라벨을 항상 함께 노출
export default function LoadingSpinner({ label = '불러오는 중...' }) {
  return (
    <div className="spinner-wrap" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
