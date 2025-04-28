// /pages/index.js
import Game from './game'; // або вбудувати код гри прямо сюди

export default function Home() {
  return (
    <div>
      <h1>Welcome to SpaceForce!</h1>
      <Game /> {/* Тут вставляється твоя гра */}
    </div>
  );
}
