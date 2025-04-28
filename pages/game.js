import { useState, useEffect } from 'react';

export default function Game() {
  const [shipPos, setShipPos] = useState({ x: 300, y: 300 }); // Початкова позиція корабля
  const [targetPos, setTargetPos] = useState(null); // Цільова позиція

  useEffect(() => {
    if (!targetPos) return; // Якщо немає цілі, нічого не робимо

    const interval = setInterval(() => {
      setShipPos((prev) => {
        const dx = targetPos.x - prev.x; // Різниця по осі X
        const dy = targetPos.y - prev.y; // Різниця по осі Y
        const distance = Math.sqrt(dx * dx + dy * dy); // Відстань до цілі

        if (distance < 5) {
          clearInterval(interval); // Якщо корабель досягнув цілі, зупиняємо рух
          return prev;
        }

        const speed = 2; // Швидкість корабля
        return {
          x: prev.x + (dx / distance) * speed, // Розрахунок нової X-координати
          y: prev.y + (dy / distance) * speed, // Розрахунок нової Y-координати
        };
      });
    }, 16); // ~60 FPS

    return () => clearInterval(interval); // Очищаємо інтервал при виході з компонента
  }, [targetPos]); // Запускати, коли змінюється targetPos

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Отримуємо розміри елемента
    setTargetPos({
      x: e.clientX - rect.left, // X-координата кліка на елементі
      y: e.clientY - rect.top, // Y-координата кліка на елементі
    });
  };

  return (
    <div
      onClick={handleClick} // Обробка кліка на елемент
      style={{
        width: '100vw', // Ширина екрану
        height: '100vh', // Висота екрану
        backgroundColor: 'black', // Колір фону
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute', // Абсолютне позиціонування для корабля
          width: 20,
          height: 20,
          backgroundColor: 'white', // Колір корабля
          left: shipPos.x - 10, // Коригуємо позицію по осі X
          top: shipPos.y - 10, // Коригуємо позицію по осі Y
          borderRadius: '50%', // Корабель виглядає як коло
          transform: 'translate(-50%, -50%)', // Центруємо корабель
        }}
      />
    </div>
  );
}
