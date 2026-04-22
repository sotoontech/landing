"use client";

import { ReactNode } from "react";

type Item = Record<string, unknown>;

export default function Repeater({
  items,
  onChange,
  render,
  emptyItem,
}: {
  items: Item[];
  onChange: (next: Item[]) => void;
  render: (item: Item, setItem: (next: Item) => void) => ReactNode;
  emptyItem: Item;
}) {
  const update = (i: number, next: Item) => {
    const copy = items.slice();
    copy[i] = next;
    onChange(copy);
  };

  const remove = (i: number) => {
    const copy = items.slice();
    copy.splice(i, 1);
    onChange(copy);
  };

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const copy = items.slice();
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };

  const add = () => onChange([...items, JSON.parse(JSON.stringify(emptyItem))]);

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="repeater-item">
          <div className="repeater-actions">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              title="Move up"
            >
              ↑
            </button>
            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1}
              title="Move down"
            >
              ↓
            </button>
            <button
              type="button"
              className="danger"
              onClick={() => remove(i)}
              title="Remove"
            >
              ×
            </button>
          </div>
          {render(item, (next) => update(i, next))}
        </div>
      ))}
      <button type="button" className="btn ghost" onClick={add}>
        + Add item
      </button>
    </div>
  );
}
