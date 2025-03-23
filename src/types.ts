export type Difficulty = 'pemula' | 'menengah' | 'lanjutan';

export type Operation = 'tambah' | 'kurang' | 'kali' | 'bagi';

export type Question = {
  id: string;
  operation: Operation;
  num1: number;
  num2: number;
  answer: number;
  options: number[];
};

export type GameState = {
  skor: number;
  pertanyaanSekarang: number;
  totalPertanyaan: number;
  difficulty: Difficulty;
  operation: Operation;
  bintang: number;
};

export type Feedback = {
  pesan: string;
  tipe: 'sukses' | 'gagal' | 'petunjuk';
};