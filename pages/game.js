// /pages/game.js
import { useState, useEffect } from 'react';

export default function Game() {
  const [shipPos, setShipPos] = useState({ x: 300, y: 300 });
  const [targetPos, setTargetPos] = useState(null);

  useEffect(() => {
    if (!targetPos) return;

    const interval = setInterval(() => {
      setShipPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 5) {
          clearInterval(interval);
          return prev;
        }

        const speed = 2; // Пікселів за крок
        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed,
        };
      });
    }, 16); // ~60 FPS

    return () => clearInterval(interval);
  }, [targetPos]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTargetPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 20,
          height: 20,
          backgroundColor: 'white',
          left: shipPos.x - 10,
          top: shipPos.y - 10,
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
