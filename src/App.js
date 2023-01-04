import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Button, { ButtonTypes } from './components/Button';
import { useState } from 'react';

const Operators = {
  CLEAR: 'C',
  PLUS: '+',
  MINUS: '-',
  EQUAL: '=',
};

export default function App() {
  const [result, setResult] = useState(0);
  const [formula, setFormula] = useState([]);
  const [modify, setModify] = useState('');

  const pirntModify = (formula) => {
    setModify(formula);
  };

  const onPressNumber = (number) => {
    const last = formula[formula.length - 1];
    pirntModify(formula);
    if (isNaN(last)) {
      setResult(number);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
    });
    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressOperator = (operator) => {
    pirntModify(formula);
    switch (operator) {
      case Operators.CLEAR:
        setFormula([]);
        setResult(0);
        return;
      case Operators.EQUAL:
        calculate();
        return;
      default: {
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        return;
      }
    }
  };

  const windowWidth = useWindowDimensions().width;
  const width = (windowWidth - 5) / 4;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.resultContainer}>
        <Text style={styles.text2}>{modify}</Text>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.text}>{result.toLocaleString()}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                onPress={() => onPressNumber(num)}
                buttonStyle={{ width, height: width, marginBottom: 1 }}
                buttonType={ButtonTypes.NUMBER}
              />
            ))}
          </View>
          <View style={styles.bottom}>
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonStyle={{ width: width * 2, height: width, marginTop: 1 }}
              buttonType={ButtonTypes.NUMBER}
            />
            <Button
              title="="
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonStyle={{ width, height: width, marginTop: 1 }}
              buttonType={ButtonTypes.OPERATOR}
            />
          </View>
        </View>
        <View>
          <Button
            title="C"
            onPress={() => {
              onPressOperator(Operators.CLEAR);
            }}
            buttonStyle={{ width, height: width, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title="-"
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonStyle={{ width, height: width, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
          <Button
            title="+"
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonStyle={{ width, height: width * 2 + 1, marginTop: 1 }}
            buttonType={ButtonTypes.OPERATOR}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
    color: '#fff',
    fontWeight: '700',
    fontStyle: 'italic',
    paddingBottom: 30,
    paddingRight: 30,
  },
  text2: {
    fontSize: 30,
    fontWeight: '700',
    color: '#fff',
    fontWeight: '700',
    fontStyle: 'italic',
    paddingBottom: 30,
    paddingRight: 30,
    opacity: 0.3,
  },
  resultContainer: {
    flex: 0.5,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#A5B4FC',
    justifyContent: 'space-evenly',
  },
  leftPad: {
    width: '75%',
  },
  number: {
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
