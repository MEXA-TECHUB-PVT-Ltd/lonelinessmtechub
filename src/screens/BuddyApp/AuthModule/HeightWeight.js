import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const HeightWeightScreen = () => {
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [weight, setWeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('ft');
  const [weightUnit, setWeightUnit] = useState('kg');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let's Get to Know You Better!</Text>
      <Text style={styles.subHeader}>Your height and weight can help us provide a more personalized experience</Text>

      <Text style={styles.label}>Height</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="00"
          value={heightFt}
          onChangeText={setHeightFt}
        />
        {heightUnit === 'ft' && (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="00"
            value={heightIn}
            onChangeText={setHeightIn}
          />
        )}
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[styles.selectorButton, heightUnit === 'ft' && styles.selectedButton]}
            onPress={() => setHeightUnit('ft')}
          >
            <Text style={styles.selectorText}>Ft</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectorButton, heightUnit === 'cm' && styles.selectedButton]}
            onPress={() => setHeightUnit('cm')}
          >
            <Text style={styles.selectorText}>Cm</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.label}>Weight</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="00"
          value={weight}
          onChangeText={setWeight}
        />
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[styles.selectorButton, weightUnit === 'kg' && styles.selectedButton]}
            onPress={() => setWeightUnit('kg')}
          >
            <Text style={styles.selectorText}>Kg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectorButton, weightUnit === 'lb' && styles.selectedButton]}
            onPress={() => setWeightUnit('lb')}
          >
            <Text style={styles.selectorText}>Lb</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    color: '#FFF',
    paddingHorizontal: 10,
    backgroundColor: '#333',
    marginRight: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: '#FFC107',
  },
  selectorText: {
    color: '#FFF',
  },
  button: {
    height: 50,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default HeightWeightScreen;
