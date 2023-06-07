import React, { useState } from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { Button, Card, Title, Paragraph, Modal, Text } from 'react-native-paper';

const PromotionalScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
    setModalVisible(true);
  };

  const handleBuyPlan = () => {
    // Aquí puedes manejar la acción de compra del plan seleccionado
    console.log('Comprar', selectedPlan);
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/img/corona.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <Title style={styles.title}>¡Descubre nuestros Planes Premium!</Title>

      <Paragraph style={styles.description}>
        Obtén acceso ilimitado a características exclusivas y disfruta de una experiencia premium.
      </Paragraph>

      <Card style={styles.card2}>
        <Card.Content>
          <Title style={styles.planTitle2}>Prime Essentials</Title>
          <Paragraph style={styles.planDescription2}>
            Disfruta de tu aplicación sin preocuparte por la publicidad.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => handlePlanSelection('Prime Essentials')}
            style={styles.button2}
          >
            Seleccionar
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.planTitle}>Platinum Edition</Title>
          <Paragraph style={styles.planDescription}>
            Disfruta de una experiencia premium con acceso ilimitado, sin publicidad y nuestras características exclusivas.
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            onPress={() => handlePlanSelection('Platinum Edition')}
            style={styles.button}
            color="#6200ee"
          >
            Seleccionar
          </Button>
        </Card.Actions>
      </Card>

      <Modal visible={isModalVisible} onDismiss={handleCloseModal} contentContainerStyle={styles.modalContainer}>
        {selectedPlan === 'Prime Essentials' && (
          <Card style={styles.modalCard1}>
            <Card.Content>
              <Title style={styles.modalTitle}>{selectedPlan}</Title>
              <Text style={styles.modalPrice}>0,99€/mes</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={handleBuyPlan} style={styles.modalButton}>
                Comprar
              </Button>
            </Card.Actions>
          </Card>
        )}

        {selectedPlan === 'Platinum Edition' && (
          <Card style={styles.modalCard2}>
            <Card.Content>
              <Title style={styles.modalTitle}>{selectedPlan}</Title>
              <Text style={styles.modalPrice}>1,99€/mes</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" onPress={handleBuyPlan} style={styles.modalButton}>
                Comprar
              </Button>
            </Card.Actions>
          </Card>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#702B9E',
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#888',
  },
  card: {
    marginBottom: 16,
    width: '100%',
    maxWidth: 400,
    elevation: 2,
    backgroundColor: "#BBDEFB", // Agregamos sombra al card
  },
  card2: {
    marginBottom: 16,
    width: '100%',
    maxWidth: 400,
    elevation: 2,
    backgroundColor: "#C1CDF9", // Agregamos sombra al card
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0D47A1',
  },
  planTitle2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6d77f6',
  },
  planDescription: {
    fontSize: 16,
    marginBottom: 16,
    color: '#1565C0',
  },
  planDescription2: {
    fontSize: 16,
    marginBottom: 16,
    color: '#6071D7',
  },
  button: {
    marginTop: 16,
    width: '100%',
    backgroundColor: "#2196F3",
  },
  button2: {
    backgroundColor: "#6071D7",
    marginTop: 16,
    width: '100%',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 40,
    borderRadius: 40,
  },
  modalCard1: {
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 5,
  },
  modalCard2: {
    backgroundColor: 'white', 
    borderRadius: 8,
    elevation: 2,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#76A7F4',
  },
  modalPrice: {
    fontSize: 25,
    textAlign: 'center',
    color: '#6071D7',
    marginBottom: 16,
  },
  modalButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: "#76A7F4",
  },
});

export default PromotionalScreen;
