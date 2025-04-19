import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { styles } from '../../styles/styles';
import { Player } from '../../types';

interface AddPlayerModalProps {
  visible: boolean;
  players: Player[];
  currentRound: number;
  additionalPlayerName: string;
  setAdditionalPlayerName: (name: string) => void;
  setPlayers: (players: Player[]) => void;
  setShowAddPlayerModal: (show: boolean) => void;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
  visible,
  players,
  currentRound,
  additionalPlayerName,
  setAdditionalPlayerName,
  setPlayers,
  setShowAddPlayerModal,
}) => {
  const addPlayerMidGame = () => {
    if (additionalPlayerName.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um nome para o jogador');
      return;
    }

    if (players.length >= 5) {
      Alert.alert('Erro', 'O jogo já atingiu o número máximo de 5 jogadores');
      return;
    }

    // Encontrar a pior pontuação atual (maior número de pontos)
    let worstScore = 0;
    if (players.length > 0) {
      worstScore = Math.max(...players.map(player => player.total));
    }

    // Criar array de pontuações para o novo jogador
    const newPlayerScores = [];
    for (let i = 0; i < currentRound - 1; i++) {
      if (i === 0) {
        // Adicionar a pior pontuação na primeira posição
        newPlayerScores.push(worstScore);
      } else {
        // Preencher com zeros as outras rodadas já concluídas
        newPlayerScores.push(0);
      }
    }

    const newPlayer = {
      id: `player-${players.length + 1}`,
      name: additionalPlayerName.trim(),
      scores: newPlayerScores,
      total: worstScore,
      payment: 0,
    };

    setPlayers([...players, newPlayer]);
    setAdditionalPlayerName('');
    setShowAddPlayerModal(false);
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
              <Text style={styles.modalTitle}>Adicionar Novo Jogador</Text>

              <Text style={styles.modalInfo}>
                O novo jogador começará com a pontuação do pior jogador atual.
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Nome do jogador"
                value={additionalPlayerName}
                onChangeText={setAdditionalPlayerName}
              />

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.modalButton]}
                  onPress={() => {
                    Keyboard.dismiss();
                    addPlayerMidGame();
                  }}
                >
                  <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton, styles.modalButton]}
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowAddPlayerModal(false);
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

export default AddPlayerModal;