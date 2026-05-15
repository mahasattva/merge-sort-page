export default function InterestPicker({ interests, selected, onToggle, max = 5 }) {
  return (
    <div className="interest-grid">
      {interests.map(({ id, name }) => {
        const isSelected = selected.includes(id);
        const isDisabled = !isSelected && selected.length >= max;
        return (
          <button
            key={id}
            type="button"
            className={`interest-tag ${isSelected ? 'selected' : ''}`}
            onClick={() => onToggle(id)}
            disabled={isDisabled}
            aria-pressed={isSelected}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
}
