import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'navy',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  numericInput: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  add: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'lightblue',
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: 'lightblue',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'navy',
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButton: {
    width: 150,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  calculateButton: {
    width: 150,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  switchContainer: {
 
    alignItems: 'left',
    marginTop: 20,
    marginRight: 300,
    width: 60,  
    height: 30,  
  },
});

export default styles;