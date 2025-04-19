// Interface para definir a estrutura de um jogador
export interface Player {
  id: string;
  name: string;
  scores: number[];
  total: number;
  payment: number;
}

// Interface para definir as regras de cada rodada
export interface Round {
  number: number;
  cards: number;
  objective: string;
}