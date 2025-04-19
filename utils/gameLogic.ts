import { Player } from '../types';

/**
 * Calcula os pagamentos para cada jogador no final do jogo
 * Versão simplificada que considera apenas a diferença de pontuação
 */
export const calculatePayments = (players: Player[], pingValue: string): Player[] => {
  // Encontrar o vencedor (menor pontuação)
  const minScore = Math.min(...players.map(player => player.total));
  const winner = players.find(player => player.total === minScore);

  // Se houver mais de um vencedor (empate), não há pagamentos
  if (!winner || players.filter(player => player.total === minScore).length > 1) {
    return players.map(player => ({
      ...player,
      payment: 0,
    }));
  }

  // Calcular a diferença total que os perdedores devem pagar
  let totalToPay = 0;
  players.forEach(player => {
    if (player.total !== minScore) {
      // Cada perdedor paga a diferença de pontuação em centavos
      totalToPay += (player.total - minScore) / 100;
    }
  });

  // Atribuir pagamentos
  return players.map(player => {
    if (player.total === minScore) {
      // O vencedor recebe tudo
      return {
        ...player,
        payment: -totalToPay, // Negativo porque recebe
      };
    } else {
      // Perdedores pagam a diferença da sua pontuação com a do vencedor
      const paymentAmount = (player.total - minScore) / 100;
      return {
        ...player,
        payment: paymentAmount,
      };
    }
  });
};

/**
 * Encontra o jogador com a menor pontuação em uma determinada rodada
 */
export const findRoundWinner = (players: Player[], roundIndex: number): Player | null => {
  if (roundIndex < 0 || players.length === 0) return null;

  let minScore = Infinity;
  let winner = null;

  players.forEach(player => {
    if (player.scores.length > roundIndex) {
      const score = player.scores[roundIndex];
      if (score < minScore) {
        minScore = score;
        winner = player;
      }
    }
  });

  return winner;
};

/**
 * Formata pontuações longas para exibição mais amigável
 */
export const formatScore = (score: number): string => {
  const scoreStr = score.toString();

  // Se a pontuação tiver mais de 5 dígitos, encurta-a
  if (scoreStr.length > 5) {
    return `${scoreStr.substring(0, 5)}...`;
  }

  return scoreStr;
};