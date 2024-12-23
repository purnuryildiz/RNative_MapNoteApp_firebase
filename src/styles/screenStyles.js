import {StyleSheet} from 'react-native';
import Colors from '../theme/colors';

// define your styles
const screenStyles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
});

//make this component available to the app
export default screenStyles;
