import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { styles } from '../../styles/styles';
import { Player } from '../../types';

interface PaymentModalProps {
  visible: boolean;
  players: Player[];
  restartGame: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  visible,
  players,
  restartGame,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Resultado Final</Text>

          <ScrollView style={styles.modalScroll}>
            {/* Tabela de pontuações finais */}
            <View style={styles.finalScoreTable}>
              <View style={styles.finalScoreHeader}>
                <Text style={styles.finalScoreHeaderText}>Jogador</Text>
                {Array.from({ length: 7 }, (_, i) => (
                  <Text key={`final-round-${i+1}`} style={styles.finalScoreHeaderText}>R{i+1}</Text>
                ))}
                <Text style={styles.finalScoreHeaderText}>Total</Text>
              </View>

              {players.map(player => (
                <View key={`final-${player.id}`} style={styles.finalScoreRow}>
                  <Text style={styles.finalScorePlayerName}>{player.name}</Text>
                  {Array.from({ length: 7 }, (_, i) => (
                    <Text key={`final-${player.id}-score-${i}`} style={styles.finalScoreCell}>
                      {player.scores[i] !== undefined ? player.scores[i] : '-'}
                    </Text>
                  ))}
                  <Text style={styles.finalScoreTotalCell}>{player.total}</Text>
                </View>
              ))}
            </View>

            {/* Separador */}
            <View style={styles.separator} />

            {/* Pagamentos */}
            <Text style={styles.paymentSectionTitle}>Pagamentos</Text>
            {players.map(player => (
              <View key={player.id} style={styles.paymentContainer}>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={[
                  styles.paymentText,
                  player.payment < 0 ? styles.receiveText : styles.payText
                ]}>
                  {player.payment < 0
                    ? `Recebe R$ ${Math.abs(player.payment).toFixed(2)}`
                    : `Paga R$ ${player.payment.toFixed(2)}`
                  }
                </Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.modalButton]}
              onPress={restartGame}
            >
              <Text style={styles.buttonText}>Novo Jogo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PaymentModal;