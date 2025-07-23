import React, { useState } from 'react';
import { WaitingRoom } from './components/popupplay/WaitingRoom';
import { QuizScreen } from './components/popupplay/PlayingRoom';
import '../assets/css/PlayPage.css';

// === UPDATE: Dữ liệu mẫu đã được cập nhật với 20 câu hỏi về Nhật Bản ===
const dummyQuiz = {
  title: 'Quiz about Japan',
  questions: [
    { id: 1, text: "What flower is Japan's national emblem?", options: { a: 'Rose', b: 'Lotus', c: 'Cherry Blossom', d: 'Chrysanthemum' }, answer: 'c' },
    { id: 2, text: 'Kimono is the traditional Japanese garment.', options: { a: 'True', b: 'False' }, answer: 'a' },
    { id: 3, text: "Who is commemorated during the Obon festival in Japan?", options: { a: 'Gods', b: "Ancestors' spirits", c: 'The Emperor', d: 'Patron saints' }, answer: 'b' },
    { id: 4, text: "What is Japan's most famous traditional dish worldwide?", options: { a: 'Mochi', b: 'Sushi', c: 'Takoyaki', d: 'Ramen' }, answer: 'b' },
    { id: 5, text: 'A Geisha is:', options: { a: 'A warrior', b: 'A theater actor', c: 'A traditional female artist', d: 'A queen' }, answer: 'c' },
    { id: 6, text: 'Sumo is a traditional sport originating from Japan.', options: { a: 'True', b: 'False' }, answer: 'a' },
    { id: 7, text: 'What is the suffix "-san" used for in Japanese?', options: { a: 'Informal address', b: 'A polite and respectful title', c: "A famous person's name", d: 'A profession' }, answer: 'b' },
    { id: 8, text: 'Which city is the former imperial capital of Japan?', options: { a: 'Tokyo', b: 'Osaka', c: 'Kyoto', d: 'Sapporo' }, answer: 'c' },
    { id: 9, text: 'What is the famous Japanese tea ceremony called?', options: { a: 'Chado (The Way of Tea)', b: 'Ikebana', c: 'Bon Odori', d: 'Noh' }, answer: 'a' },
    { id: 10, text: 'What is a "Torii" in Japanese culture?', options: { a: 'A type of food', b: 'A traditional shrine gate', c: 'A martial art', d: 'A costume' }, answer: 'b' },
    { id: 11, text: 'The Tanabata festival is associated with what story?', options: { a: 'The story of Altair and Vega', b: 'The legend of Mount Fuji', c: 'The Sun Goddess', d: 'The legend of a carp becoming a dragon' }, answer: 'a' },
    { id: 12, text: 'On what occasion do the Japanese typically eat soba noodles?', options: { a: 'Birthdays', b: 'Summer festivals', c: "New Year's Eve", d: 'Mid-Autumn festival' }, answer: 'c' },
    { id: 13, text: 'What does the culture of "Omotenashi" represent in Japan?', options: { a: 'Competition', b: 'Selfless hospitality', c: 'Conservatism', d: 'Business ethics' }, answer: 'b' },
    { id: 14, text: 'How many distinct seasons does Japan have?', options: { a: '2', b: '3', c: '4', d: '5' }, answer: 'c' },
    { id: 15, text: 'What is the art of "Ikebana"?', options: { a: 'Tea ceremony', b: 'Paper folding', c: 'Flower arrangement', d: 'Calligraphy' }, answer: 'c' },
    { id: 16, text: 'The Japanese typically bow when:', options: { a: 'Eating', b: 'Communicating and greeting', c: 'Going to sleep', d: 'Exercising' }, answer: 'b' },
    { id: 17, text: 'The Hanami festival is an occasion for:', options: { a: 'Eating free sushi', b: 'Watching fireworks', c: 'Viewing cherry blossoms', d: 'Giving gifts' }, answer: 'c' },
    { id: 18, text: 'Anime and Manga are characteristic of what aspect of Japanese culture?', options: { a: 'Ancient literature', b: 'Popular entertainment', c: 'Politics', d: 'Religion' }, answer: 'b' },
    { id: 19, text: 'The Japanese typically take off their shoes when entering a house.', options: { a: 'True', b: 'False' }, answer: 'a' },
    { id: 20, text: 'What is the name of the highest mountain in Japan?', options: { a: 'Mount Takao', b: 'Mount Fuji', c: 'Mount Aso', d: 'Mount Rokko' }, answer: 'b' }
  ]
};

export const GameContainer = ({ game, onExit }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartQuiz = () => setIsPlaying(true);

  const handleFinish = () => {
    setIsPlaying(false);
    onExit(); // quay về GamePage
  };

  return (
    <>
      {!isPlaying ? (
        <WaitingRoom game={dummyQuiz} onStartQuiz={handleStartQuiz} onExit={onExit} />
      ) : (
        <QuizScreen game={dummyQuiz} onFinish={handleFinish} />
      )}
    </>
  );
};
