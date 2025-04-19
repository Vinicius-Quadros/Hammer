import React, { useState } from 'react';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { styles } from './styles/styles';
import { Player } from './types';
import PlayerSetupScreen from './components/PlayerSetupScreen';
import GameScreen from './components/GameScreen';

const App = () => {
  // Estados do aplicativo
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showPlayerSetup, setShowPlayerSetup] = useState<boolean>(true);
  const [newPlayerName, setNewPlayerName] = useState<string>('');
  const [showAddScoreModal, setShowAddScoreModal] = useState<boolean>(false);
  const [scoreInputs, setScoreInputs] = useState<{ [key: string]: string }>({});
  const [showAddPlayerModal, setShowAddPlayerModal] = useState<boolean>(false);
  const [additionalPlayerName, setAdditionalPlayerName] = useState<string>('');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [pingValue, setPingValue] = useState<string>('0.25');
  const [editingRound, setEditingRound] = useState<number | null>(null);

  // Reiniciar o jogo
  const restartGame = () => {
    setPlayers([]);
    setCurrentRound(1);
    setGameStarted(false);
    setShowPlayerSetup(true);
    setNewPlayerName('');
    setScoreInputs({});
    setShowPaymentModal(false);
    setPingValue('0.25');
  };

  // Renderização principal
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {showPlayerSetup ? (
          <PlayerSetupScreen
            newPlayerName={newPlayerName}
            setNewPlayerName={setNewPlayerName}
            setPlayers={setPlayers}
            setShowPlayerSetup={setShowPlayerSetup}
            setGameStarted={setGameStarted}
          />
        ) : (
          <GameScreen
            players={players}
            currentRound={currentRound}
            editingRound={editingRound}
            scoreInputs={scoreInputs}
            setScoreInputs={setScoreInputs}
            additionalPlayerName={additionalPlayerName}
            setAdditionalPlayerName={setAdditionalPlayerName}
            showAddScoreModal={showAddScoreModal}
            setShowAddScoreModal={setShowAddScoreModal}
            showAddPlayerModal={showAddPlayerModal}
            setShowAddPlayerModal={setShowAddPlayerModal}
            showPaymentModal={showPaymentModal}
            setShowPaymentModal={setShowPaymentModal}
            setEditingRound={setEditingRound}
            setPlayers={setPlayers}
            setCurrentRound={setCurrentRound}
            restartGame={restartGame}
            pingValue={pingValue}
          />
        )}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default App;