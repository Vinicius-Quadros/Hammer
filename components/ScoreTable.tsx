import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles/styles';
import { Player } from '../types';
import { formatScore } from '../utils/gameLogic';

interface ScoreTableProps {
  players: Player[];
  currentRound: number;
  setEditingRound: (round: number) => void;
  setScoreInputs: (inputs: { [key: string]: string }) => void;
  setShowAddScoreModal: (show: boolean) => void;
}

const ScoreTable: React.FC<ScoreTableProps> = ({
  players,
  currentRound,
  setEditingRound,
  setScoreInputs,
  setShowAddScoreModal,
}) => {
  return (
    <View style={styles.scoreTable}>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 2 }]}>Jogador</Text>
        {Array.from({ length: currentRound > 7 ? 7 : currentRound - 1 }, (_, i) => (
          <Text key={`round-${i+1}`} style={styles.headerCell}>R{i+1}</Text>
        ))}
        <Text style={styles.headerCell}>Total</Text>
      </View>

      <ScrollView>
        {players.map(player => (
          <View key={player.id} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]} numberOfLines={1} ellipsizeMode="tail">{player.name}</Text>
            {Array.from({ length: currentRound > 7 ? 7 : currentRound - 1 }, (_, i) => (
              <TouchableOpacity
                key={`${player.id}-score-${i}`}
                style={styles.scoreColumnContainer}
                onPress={() => {
                  // Configurar modo de edição para esta rodada
                  setEditingRound(i);

                  // Preencher entradas de pontuação com os valores atuais
                  const initialScores = {};
                  players.forEach(p => {
                    if (p.scores[i] !== undefined) {
                      initialScores[p.id] = p.scores[i].toString();
                    }
                  });

                  setScoreInputs(initialScores);
                  setShowAddScoreModal(true);
                }}
              >
                <Text style={[styles.tableCell, styles.editableCell]} numberOfLines={1}>
                  {player.scores[i] !== undefined ? formatScore(player.scores[i]) : '-'}
                </Text>
              </TouchableOpacity>
            ))}
            <Text style={[styles.tableCell, styles.totalCell]} numberOfLines={1}>{formatScore(player.total)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScoreTable;