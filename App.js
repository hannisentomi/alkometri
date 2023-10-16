import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Switch } from 'react-native';

import NumericInput from 'react-native-numeric-input';
import stylesLight from './styles';
import stylesDark from './stylesDark';



export default function App() {
  const [bottles, setBottles] = useState(0);
  const [hours, setHours] = useState(0);
  const [weight, setWeight] = useState('');
  const [resultMale, setResultMale] = useState(0);
  const [resultFemale, setResultFemale] = useState(0);
  const [selectedGender, setSelectedGender] = useState('male');
  const [isCalculated, setIsCalculated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);



  //laskee veren alkoholipitoisuuden. Tarkistaa ensiksi onko arvot positiivisia. 
  //Tähän voisi lisätä myös mahdollisuuden vaihtaa juoman koko sekä alkoholipitoisuus.
  const calculateBloodAlcohol = () => {
    if (weight >= 0 && bottles >= 0 && hours >= 0) {
      const calculatedLitres = bottles * 0.33;
      const calculatedGrams = calculatedLitres * 8 * 4.5;
      const calculatedBurning = weight / 10;
      const calculatedGramsLeft = calculatedGrams - calculatedBurning * hours;
      let calculatedResultMale = calculatedGramsLeft / (weight * 0.7);
      let calculatedResultFemale = calculatedGramsLeft / (weight * 0.6);

      if (calculatedResultMale < 0) {
        calculatedResultMale = 0;
      }
      if (calculatedResultFemale < 0) {
        calculatedResultFemale = 0;
      }
      setResultMale(calculatedResultMale);
      setResultFemale(calculatedResultFemale);
      setIsCalculated(true);
    } else {
      alert('We need your weight to calculate blood alcohol level');
    }
  };

  //Vaihdetaan teema nappia painamalla. Tarkistetaan ensin mikä teema on valittuna ja vaihdetaan toiseen.
  //Aluksi yritin tehdä tämän käyttämällä vain yhtä stylesheetiä, mutta en saanut sitä toimimaan.
  //En saannut vaihdettua numeric inputin numeroiden väriä stylesheetin kautta joten jätin värin sellaiseksi joka näkyi 
  //molemmissa teemoissa. Olisin muuten vaihtanut käänteiset värit teemojen kesken. En keksinyt mitä värejä käyttää joten ajattelin
  //toteuttaa tumman teeman.
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const styles = isDarkMode ? stylesDark : stylesLight;

  //Päivitetään paino tekstikentästä.
  const handleWeightChange = (text) => {
    setWeight(text);
  };

  //Vaihdetaan sukupuolta nappia painamalla. Tarkistetaan ensin mikä sukupuoli on valittuna ja vaihdetaan toiseen.
  const toggleGender = () => {
    setSelectedGender(selectedGender === 'male' ? 'female' : 'male');
  };
  const genderIcon = selectedGender === 'male' ? 'mars' : 'venus';

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.switchContainer}>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              style={styles.switchContainer}
            />
          </View>
          <View>
            <Text style={styles.headerText}>Alcometer</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Weight:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleWeightChange}
              value={weight}
              keyboardType="numeric"
              placeholder="Weight"
              backgroundColor="white"
            />
          </View>
          {/* //Olisin halunnut siirtä näistä mahdollisimman paljon suoraan tyylitiedostoihin mutta laiskuus iski.
                 Otin suuren osan asetuksista suoraan linkitetyn sivun esimerkistä. Näytti ihan jees joten vaihdoin vain värejä.*/}
          <View style={styles.add}>
            <Text style={styles.labelText}>Bottles:</Text>
            <NumericInput
              style={styles.numericInput}
              value={bottles}
              onChange={(value) => setBottles(value)}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={1}
              valueType='real'
              rounded
              textColor='#f0f0f0'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='#338BA8'
              leftButtonBackgroundColor='#43A6C6'
            />
          </View>

          <View style={styles.add}>
            <Text style={styles.labelText}>Hours:</Text>
            <NumericInput
              style={styles.numericInput}
              value={hours}
              onChange={(value) => setHours(value)}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={0.5}
              valueType='real'
              rounded
              textColor='#f0f0f0' //Tätä yritin vaihtaa tyyli tiedostosta, mutta en saanut toimimaan.
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='#338BA8'
              leftButtonBackgroundColor='#43A6C6'
            />
          </View>
           {/* Tein iconin jota painamalla vaihtaa sukupuolen ja myös iconi vaihtuu vastaamaan nykyistä sukupuolta. */}
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={toggleGender} style={styles.genderButton}>
              <FontAwesome name={genderIcon} size={150} color="blue" />
            </TouchableOpacity>
          </View>

          <View style={styles.resultContainer}>
            {isCalculated && (
              <Text style={styles.labelText}>
                {selectedGender === 'male' ? `${resultMale.toFixed(2)}‰` : `${resultFemale.toFixed(2)}‰` }
              </Text>
            )} 
          </View>
          {/*Ideana oli tehdä kaksi neliötä tästä napista sekä sukupuolen vaihto iconista mutta en oikein saanut sitä onnistumaan. 
              Tuskailin tämän kanssa ehkä vähän liian kauan. */}
          <View style={styles.calculateButton}>
            <Button title="Calculate Blood Alcohol" onPress={calculateBloodAlcohol} />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

