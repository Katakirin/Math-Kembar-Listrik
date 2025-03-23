import { Operation, Question, Difficulty } from '../types';

const generateNumber = (difficulty: Difficulty, operation: Operation): number => {
  if (operation === 'tambah' || operation === 'kurang') {
    switch (difficulty) {
      case 'pemula':
        // Angka 1-9 untuk pemula
        return Math.floor(Math.random() * 9) + 1;
      case 'menengah':
        // Angka 10-99 untuk menengah
        return Math.floor(Math.random() * 90) + 10;
      case 'lanjutan':
        // Angka 100-999 untuk lanjutan
        return Math.floor(Math.random() * 900) + 100;
    }
  } else {
    // Untuk operasi kali dan bagi tetap menggunakan logika yang lama
    switch (difficulty) {
      case 'pemula':
        return Math.floor(Math.random() * 10) + 1;
      case 'menengah':
        return Math.floor(Math.random() * 20) + 1;
      case 'lanjutan':
        return Math.floor(Math.random() * 50) + 1;
    }
  }
};

const calculateAnswer = (num1: number, num2: number, operation: Operation): number => {
  switch (operation) {
    case 'tambah':
      return num1 + num2;
    case 'kurang':
      return num1 - num2;
    case 'kali':
      return num1 * num2;
    case 'bagi':
      return Math.floor(num1 / num2);
  }
};

export const generateQuestion = (
  difficulty: Difficulty,
  operation: Operation
): Question => {
  let num1 = generateNumber(difficulty, operation);
  let num2 = generateNumber(difficulty, operation);

  // Untuk pengurangan, pastikan num1 selalu lebih besar dari num2
  if (operation === 'kurang') {
    if (num2 > num1) {
      [num1, num2] = [num2, num1];
    }
  }

  // Pastikan soal pembagian memiliki jawaban bilangan bulat
  if (operation === 'bagi') {
    // Pastikan num2 tidak 0 dan sesuai dengan tingkat kesulitan
    num2 = Math.max(num2, 1);
    const maxMultiplier = difficulty === 'pemula' ? 5 : difficulty === 'menengah' ? 10 : 20;
    // Buat num1 sebagai kelipatan dari num2 untuk mendapatkan hasil bulat
    num1 = num2 * (Math.floor(Math.random() * maxMultiplier) + 1);
  }

  const answer = calculateAnswer(num1, num2, operation);

  // Generate opsi jawaban yang salah
  const options = [answer];
  while (options.length < 4) {
    let wrongAnswer;
    if (operation === 'tambah' || operation === 'kurang') {
      // Untuk tambah/kurang, buat jawaban salah dalam rentang ±10% dari jawaban benar
      const range = Math.max(Math.floor(answer * 0.1), 2);
      wrongAnswer = answer + (Math.floor(Math.random() * range) + 1) * (Math.random() < 0.5 ? 1 : -1);
    } else {
      // Untuk kali/bagi, gunakan logika yang lama
      wrongAnswer = answer + (Math.floor(Math.random() * 5) + 1) * (Math.random() < 0.5 ? 1 : -1);
    }
    
    if (!options.includes(wrongAnswer) && wrongAnswer > 0) {
      options.push(wrongAnswer);
    }
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    operation,
    num1,
    num2,
    answer,
    options: options.sort(() => Math.random() - 0.5),
  };
};