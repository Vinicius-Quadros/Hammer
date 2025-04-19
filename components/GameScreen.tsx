import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles/styles';
import { Player } from '../types';
import { rounds } from '../data/rounds';
import { findRoundWinner } from '../utils/gameLogic';
import ScoreTable from './ScoreTable';
import AddScoreModal from './modals/AddScoreModal';
import AddPlayerModal from './modals/AddPlayerModal';
import PaymentModal from './modals/PaymentModal';

interface GameScreenProps {
  players: Player[];
  currentRound: number;
  editingRound: number | null;
  scoreInputs: { [key: string]: string };
  setScoreInputs: (inputs: { [key: string]: string }) => void;
  additionalPlayerName: string;
  setAdditionalPlayerName: (name: string) => void;
  showAddScoreModal: boolean;
  setShowAddScoreModal: (show: boolean) => void;
  showAddPlayerModal: boolean;
  setShowAddPlayerModal: (show: boolean) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  setEditingRound: (round: number | null) => void;
  setPlayers: (players: Player[]) => void;
  setCurrentRound: (round: number) => void;
  restartGame: () => void;
  pingValue: string;
}

const GameScreen: React.FC<GameScreenProps> = ({
  players,
  currentRound,
  editingRound,
  scoreInputs,
  setScoreInputs,
  additionalPlayerName,
  setAdditionalPlayerName,
  showAddScoreModal,
  setShowAddScoreModal,
  showAddPlayerModal,
  setShowAddPlayerModal,
  showPaymentModal,
  setShowPaymentModal,
  setEditingRound,
  setPlayers,
  setCurrentRound,
  restartGame,
  pingValue,
}) => {
  const winner = findRoundWinner(players, currentRound - 2);

  return (
    <View style={styles.gameContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Hammer - Rodada {currentRound}/7</Text>
        <Text style={styles.roundInfo}>
          {currentRound <= 7
            ? `${rounds[currentRound-1].cards} cartas - ${rounds[currentRound-1].objective}`
            : 'Jogo finalizado!'}
        </Text>
      </View>

      {/* Mostrar vencedor da rodada anterior, se houver */}
      {winner && (
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>
            Vencedor da rodada {currentRound - 1}: {winner.name} ({winner.scores[currentRound - 2]} pts)
          </Text>
        </View>
      )}

      {/* Tabela de pontuação */}
      <ScoreTable
        players={players}
        currentRound={currentRound}
        setEditingRound={setEditingRound}
        setScoreInputs={setScoreInputs}
        setShowAddScoreModal={setShowAddScoreModal}
      />

      {/* Botões de ação */}
      <View style={styles.buttonContainer}>
        {currentRound <= 7 && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowAddScoreModal(true)}
          >
            <Text style={styles.buttonText}>Registrar Pontos</Text>
          </TouchableOpacity>
        )}

        {currentRound <= 7 && players.length < 5 && (
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setShowAddPlayerModal(true)}
          >
            <Text style={styles.secondaryButtonText}>Adicionar Jogador</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.dangerButton]}
          onPress={restartGame}
        >
          <Text style={styles.buttonText}>Reiniciar Jogo</Text>
        </TouchableOpacity>
      </View>

      {/* Modais */}
      <AddScoreModal
        visible={showAddScoreModal}
        players={players}
        currentRound={currentRound}
        editingRound={editingRound}
        scoreInputs={scoreInputs}
        setScoreInputs={setScoreInputs}
        setShowAddScoreModal={setShowAddScoreModal}
        setEditingRound={setEditingRound}
        setPlayers={setPlayers}
        setCurrentRound={setCurrentRound}
        setShowPaymentModal={setShowPaymentModal}
        pingValue={pingValue}
      />

      <AddPlayerModal
        visible={showAddPlayerModal}
        players={players}
        currentRound={currentRound}
        additionalPlayerName={additionalPlayerName}
        setAdditionalPlayerName={setAdditionalPlayerName}
        setPlayers={setPlayers}
        setShowAddPlayerModal={setShowAddPlayerModal}
      />

      <PaymentModal
        visible={showPaymentModal}
        players={players}
        restartGame={restartGame}
      />
    </View>
  );
};

export default GameScreen;