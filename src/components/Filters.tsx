"use client";

import React from "react";

export function Filters() {
  return (
    <div className="filters">
      <h3 className="filter-title">Бренд</h3>
      <ul className="filter-list">
        <li className="filter-item">All</li>
        <li className="filter-item">Wilson</li>
        <li className="filter-item">Head</li>
        <li className="filter-item">Yonex</li>
        <li className="filter-item">Babolat</li>
        <li className="filter-item">Tecnifibre</li>
      </ul>
    </div>
  );
}

