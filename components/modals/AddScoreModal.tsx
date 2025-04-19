import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { styles } from '../../styles/styles';
import { Player } from '../../types';
import { calculatePayments } from '../../utils/gameLogic';

interface AddScoreModalProps {
  visible: boolean;
  players: Player[];
  currentRound: number;
  editingRound: number | null;
  scoreInputs: { [key: string]: string };
  setScoreInputs: (inputs: { [key: string]: string }) => void;
  setShowAddScoreModal: (show: boolean) => void;
  setEditingRound: (round: number | null) => void;
  setPlayers: (players: Player[]) => void;
  setCurrentRound: (round: number) => void;
  setShowPaymentModal: (show: boolean) => void;
  pingValue: string;
}

const AddScoreModal: React.FC<AddScoreModalProps> = ({
  visible,
  players,
  currentRound,
  editingRound,
  scoreInputs,
  setScoreInputs,
  setShowAddScoreModal,
  setEditingRound,
  setPlayers,
  setCurrentRound,
  setShowPaymentModal,
  pingValue,
}) => {
  const addScores = () => {
    // Verificar se todos os jogadores têm pontuação inserida
    const allPlayersHaveScores = players.every(player =>
      scoreInputs[player.id] !== undefined && scoreInputs[player.id].trim() !== ''
    );

    if (!allPlayersHaveScores) {
      Alert.alert('Erro', 'Por favor, insira a pontuação para todos os jogadores');
      return;
    }

    // Atualizar pontuações
    const updatedPlayers = players.map(player => {
      const score = parseInt(scoreInputs[player.id] || '0', 10);
      let newScores = [...player.scores];

      // Verificar se estamos editando uma rodada anterior ou adicionando uma nova
      if (editingRound !== null && editingRound < newScores.length) {
        // Editar uma rodada existente
        newScores[editingRound] = score;
      } else {
        // Adicionar pontuação para nova rodada
        newScores.push(score);
      }

      const newTotal = newScores.reduce((sum, score) => sum + score, 0);

      return {
        ...player,
        scores: newScores,
        total: newTotal,
        payment: 0, // Será calculado no final do jogo
      };
    });

    setPlayers(updatedPlayers);
    setScoreInputs({});
    setShowAddScoreModal(false);
    setEditingRound(null);

    // Verificar se chegamos ao final do jogo
    if (currentRound === 7 && editingRound === null) {
      // Calcular pagamentos
      const playersWithPayments = calculatePayments(updatedPlayers, pingValue);
      setPlayers(playersWithPayments);
      setShowPaymentModal(true);
    } else if (editingRound === null) {
      // Avançar para a próxima rodada apenas se não estamos editando uma rodada anterior
      setCurrentRound(currentRound + 1);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {editingRound !== null
                  ? `Editar Pontuação - Rodada ${editingRound + 1}`
                  : `Pontuação - Rodada ${currentRound}`
                }
              </Text>

              <ScrollView style={styles.modalScroll} keyboardShouldPersistTaps="handled">
                {players.map(player => (
                  <View key={player.id} style={styles.scoreInputContainer}>
                    <Text style={styles.playerName}>{player.name}</Text>
                    <TextInput
                      style={styles.scoreInput}
                      keyboardType="numeric"
                      placeholder="Pontos"
                      value={scoreInputs[player.id] || ''}
                      blurOnSubmit={false}
                      onChangeText={text => {
                        setScoreInputs({
                          ...scoreInputs,
                          [player.id]: text
                        });
                      }}
                    />
                  </View>
                ))}
              </ScrollView>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.modalButton]}
                  onPress={() => {
                    Keyboard.dismiss();
                    addScores();
                  }}
                >
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton, styles.modalButton]}
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowAddScoreModal(false);
                    setEditingRound(null);
                  }}
                >
                  <Text style={styles.secondaryButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddScoreModal;