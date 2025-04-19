import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  Keyboard,
} from 'react-native';
import RulesModal from './modals/RulesModal';

const PlayerSetupScreen = ({
  newPlayerName,
  setNewPlayerName,
  setPlayers,
  setShowPlayerSetup,
  setGameStarted,
}) => {
  const [rulesModalVisible, setRulesModalVisible] = useState(false);

  const handleStartGame = () => {
    console.log("Botão iniciar clicado");

    if (newPlayerName.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um nome para o jogador');
      return;
    }

    // Dividir nomes separados por vírgula
    const playerNames = newPlayerName.split(',').map(name => name.trim()).filter(name => name !== '');

    if (playerNames.length < 2 || playerNames.length > 5) {
      Alert.alert('Erro', 'O jogo deve ter entre 2 e 5 jogadores');
      return;
    }

    const newPlayers = playerNames.map((name, index) => ({
      id: `player-${index + 1}`,
      name,
      scores: [],
      total: 0,
      payment: 0,
    }));

    setPlayers(newPlayers);
    setShowPlayerSetup(false);
    setGameStarted(true);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Hammer</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.headerLine} />
              <Text style={styles.cardTitle}>Nova Partida</Text>
              <View style={styles.headerLine} />
            </View>

            <Text style={styles.instructionText}>Insira os nomes dos jogadores</Text>
            <Text style={styles.hintText}>(Separe com vírgula: João, Maria, Pedro)</Text>

            <TextInput
              style={styles.input}
              value={newPlayerName}
              onChangeText={setNewPlayerName}
              placeholder="Nomes dos jogadores (2-5)"
              placeholderTextColor="#999"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleStartGame}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Iniciar Jogo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => setRulesModalVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.infoButtonText}>Sobre o Jogo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rulesContainer}>
            <Text style={styles.rulesTitle}>Lembre-se das regras:</Text>
            <View style={styles.ruleItem}>
              <View style={styles.ruleBullet} />
              <Text style={styles.ruleText}>Mínimo de 2 e máximo de 5 jogadores</Text>
            </View>
            <View style={styles.ruleItem}>
              <View style={styles.ruleBullet} />
              <Text style={styles.ruleText}>Jogamos 7 rodadas com objetivos diferentes</Text>
            </View>
            <View style={styles.ruleItem}>
              <View style={styles.ruleBullet} />
              <Text style={styles.ruleText}>O menor número de pontos vence</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>

      {/* Modal de regras do jogo */}
      <RulesModal
        visible={rulesModalVisible}
        onClose={() => setRulesModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2a5298', // Fundo azul escuro
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2a5298', // Mesmo fundo azul escuro
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white', // Texto branco
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  cardTitle: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a5298', // Azul escuro
  },
  instructionText: {
    fontSize: 18,
    color: '#2C3E50', // Azul muito escuro (quase preto)
    textAlign: 'center',
    fontWeight: '500',
  },
  hintText: {
    fontSize: 14,
    color: '#95a5a6', // Cinza médio
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#2C3E50', // Texto azul escuro
  },
  button: {
    backgroundColor: '#3498db', // Azul médio
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  infoButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
  },
  rulesContainer: {
    marginTop: 30,
    marginBottom: 60, // Aumentei a margem inferior para subir mais a caixa
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#f39c12', // Laranja
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ruleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f39c12', // Laranja
    marginRight: 8,
  },
  ruleText: {
    color: 'white',
    fontSize: 14,
  },
});

export default PlayerSetupScreen;