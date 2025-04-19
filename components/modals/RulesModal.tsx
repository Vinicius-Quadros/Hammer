import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

interface RulesModalProps {
  visible: boolean;
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.modalTitle}>Regras do Hammer</Text>

            <Text style={styles.sectionTitle}>Objetivo</Text>
            <Text style={styles.paragraph}>
              Realizar o menor número de pontos após as 7 rodadas.
            </Text>

            <Text style={styles.sectionTitle}>Participantes</Text>
            <Text style={styles.paragraph}>
              Mínimo de 2 e máximo de 5 jogadores.
            </Text>

            <Text style={styles.sectionTitle}>Rodadas</Text>
            <Text style={styles.paragraph}>O jogo consiste em 7 rodadas com objetivos diferentes:</Text>

            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, styles.tableCell]}>Rodada</Text>
                <Text style={[styles.tableHeader, styles.tableCell]}>Cartas</Text>
                <Text style={[styles.tableHeader, styles.tableCell]}>Objetivo</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Primeira</Text>
                <Text style={styles.tableCell}>9</Text>
                <Text style={styles.tableCell}>Duas trincas</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Segunda</Text>
                <Text style={styles.tableCell}>10</Text>
                <Text style={styles.tableCell}>Uma trinca e uma sequência</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Terceira</Text>
                <Text style={styles.tableCell}>11</Text>
                <Text style={styles.tableCell}>Duas sequências</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Quarta</Text>
                <Text style={styles.tableCell}>12</Text>
                <Text style={styles.tableCell}>Três trincas</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Quinta</Text>
                <Text style={styles.tableCell}>13</Text>
                <Text style={styles.tableCell}>Duas trincas e uma sequência</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Sexta</Text>
                <Text style={styles.tableCell}>14</Text>
                <Text style={styles.tableCell}>Uma trinca e duas sequências</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Sétima</Text>
                <Text style={styles.tableCell}>15</Text>
                <Text style={styles.tableCell}>Três sequências</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Pontuação</Text>
            <Text style={styles.paragraph}>
              No final de cada rodada, conta-se quantos pontos, determinados pelas cartas que ficaram na mão do participante, e anota-se para ser somado no final.
            </Text>

            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableHeader, styles.tableCell]}>Carta</Text>
                <Text style={[styles.tableHeader, styles.tableCell]}>Pontos</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>3</Text>
                <Text style={styles.tableCell}>3</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>4</Text>
                <Text style={styles.tableCell}>4</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>5</Text>
                <Text style={styles.tableCell}>5</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>6</Text>
                <Text style={styles.tableCell}>6</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>7</Text>
                <Text style={styles.tableCell}>7</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>8, 9, 10, J, Q, K</Text>
                <Text style={styles.tableCell}>10</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>A</Text>
                <Text style={styles.tableCell}>20</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>2 (coringa)</Text>
                <Text style={styles.tableCell}>50</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Regras de Jogo</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Uma sequência deve possuir no mínimo 4 cartas seguidas.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Uma trinca deve ter três cartas de naipes diferentes.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Você pode colocar cartas no jogo do adversário em sua vez, e essa carta colocada não pode ser descartada.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Em um descarte, qualquer pessoa pode reivindicar a última carta descartada, tendo preferência a ordem dos participantes.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <View style={styles.bullet} />
                <Text style={styles.bulletText}>
                  Caso baixe um jogo incorreto, perde-se a oportunidade de comprar o descarte de qualquer outro jogador que não seja o imediatamente antes dessa pessoa.
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Pagamento (Quando Envolvendo Dinheiro)</Text>
            <Text style={styles.paragraph}>
              O vencedor de cada rodada recebe um pingo de 25 centavos. No final, será subtraída a pontuação do campeão do jogo dos demais participantes, sendo o valor restante pago em centavos.
            </Text>
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2a5298',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2a5298',
    marginTop: 15,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 10,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 10,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f2f2f2',
  },
  tableCell: {
    padding: 8,
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
  },
  bulletList: {
    marginBottom: 15,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f39c12',
    marginRight: 8,
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
  },
});

export default RulesModal;