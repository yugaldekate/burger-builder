import React from 'react';
import { SLICES } from '../data/slices';

const BurgerVisualization = ({ slices = [] }) => {
  // Map slice names to their details (like colors)
  const getSliceDetails = (name) => {
    return SLICES.find(s => s.name === name) || { color: '#cccccc', textColor: '#333333' };
  };

  return (
    <div className="burger-visual-container">
      <div className="burger-visualization">
        {/* Top Bread */}
        <div className="burger-layer bread-top">
          <span className="layer-label">Bread (Top)</span>
        </div>

        {/* Custom Slices stack */}
        {slices.length === 0 ? (
          <div className="empty-burger-msg">
            No customized slices yet. Add some slices below!
          </div>
        ) : (
          slices.map((sliceName, index) => {
            const details = getSliceDetails(sliceName);
            return (
              <div
                key={`${sliceName}-${index}`}
                className="burger-layer custom-slice"
                style={{
                  backgroundColor: details.color,
                  color: details.textColor
                }}
              >
                <span className="layer-label">{sliceName}</span>
              </div>
            );
          })
        )}

        {/* Bottom Bread */}
        <div className="burger-layer bread-bottom">
          <span className="layer-label">Bread (Bottom)</span>
        </div>
      </div>
    </div>
  );
};

export default BurgerVisualization;
