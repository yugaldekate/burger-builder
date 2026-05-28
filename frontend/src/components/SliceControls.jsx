import React from 'react';
import { SLICES } from '../data/slices';

const SliceControls = ({ slices = [], onAdd, onRemove, onMoveUp, onMoveDown, maxSlicesReached }) => {
  return (
    <div className="slice-controls">
      <h3>1. Choose Ingredients</h3>
      <div className="ingredients-grid">
        {SLICES.map(slice => (
          <button
            key={slice.name}
            type="button"
            className="ingredient-btn"
            style={{ borderLeft: `5px solid ${slice.color}` }}
            onClick={() => onAdd(slice.name)}
            disabled={maxSlicesReached}
          >
            <span className="ing-name">{slice.name}</span>
            <span className="ing-price">₹{slice.price}</span>
          </button>
        ))}
      </div>
      {maxSlicesReached && (
        <p className="error-message">Maximum of 10 customized slices allowed per burger.</p>
      )}

      <h3>2. Active Custom Slices</h3>
      {slices.length === 0 ? (
        <p className="no-ingredients-text">Your burger is currently empty (just bread).</p>
      ) : (
        <div className="active-slices-list">
          {slices.map((sliceName, index) => {
            const sliceInfo = SLICES.find(s => s.name === sliceName) || {};
            return (
              <div key={`${sliceName}-${index}`} className="active-slice-item">
                <span className="slice-badge" style={{ backgroundColor: sliceInfo.color, color: sliceInfo.textColor }}>
                  {sliceName}
                </span>
                <div className="slice-actions">
                  <button
                    type="button"
                    className="action-btn move-btn"
                    onClick={() => onMoveUp(index)}
                    disabled={index === 0}
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    className="action-btn move-btn"
                    onClick={() => onMoveDown(index)}
                    disabled={index === slices.length - 1}
                    title="Move Down"
                  >
                    ▼
                  </button>
                  <button
                    type="button"
                    className="action-btn remove-btn"
                    onClick={() => onRemove(index)}
                    title="Remove Ingredient"
                  >
                    ✖
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SliceControls;
