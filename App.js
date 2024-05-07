import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from './src/Utils/Colors/Colors';
import CrossIcon from './src/Utils/SVGIcons/SystemIcons/CrossIcon';
import DeleteIcon from './src/Utils/SVGIcons/SystemIcons/DeleteIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DatePicker from 'react-native-date-picker';
import Notifications from './src/Utils/Notifications';

const App = () => {
  const [taskMsg, setTaskMsg] = useState(null);
  const [Remainders, setRemainders] = useState([]);
  const [textModal, setTextModal] = useState(false);
  const [date, setDate] = useState();
  const setNotification = () => {
    const __date = new Date(date).getTime() - new Date(Date.now()).getTime();

    Notifications.schduleNotification(date, taskMsg);
  };

  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    const task = await AsyncStorage.getItem('Remainders');
    console.log(task, '-=-=-task=-=-=-');
    setRemainders(JSON.parse(task ?? []));
  };
  console.log(Remainders);

  const removeTask = async index => {
    Remainders.splice(index, 1);
    setRemainders(prev => [...prev]);
    await AsyncStorage.setItem('Remainders', JSON.stringify([...Remainders]));
  };

  useEffect(() => {}, []);

  const setItems = async () => {
    await AsyncStorage.setItem(
      'Remainders',
      JSON.stringify([taskMsg, ...Remainders]),
    );
  };

  const saveTask = async () => {
   

    if (taskMsg !== null && date !== null) {
      setItems();
      setRemainders(prev => [taskMsg, ...prev] ?? taskMsg);
      setTextModal(false);
      setTaskMsg(null);
      setNotification(date, taskMsg);
      setDate(null);

     
    } else {
      alert('Please add remainder and time');
    }
  };

  const renderTask = props => {
    const {item, index} = props;
    return (
      <View style={style.FlatListContainer}>
        <Text style={style.FlatListItemStyle}>{item}</Text>
        <TouchableOpacity onPress={() => removeTask(index)}>
          <DeleteIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={style.mainContainer}>
        <Text style={style.mainHeading}>Remainder App</Text>
        {Remainders && Remainders.length ? (
          <FlatList
            data={Remainders}
            renderItem={renderTask}
            keyExtractor={(item, index) => item + index}
          />
        ) : (
          <View style={style.nolistContainer}>
            <Text style={style.noTaskFound}>No Remainders Found!</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={{alignItems: 'flex-end'}}
        onPress={() => setTextModal(true)}>
        <Image
          source={require('./assets/icons/plus.png')}
          style={style.plusIcon}
        />
      </TouchableOpacity>
      <Modal visible={textModal} transparent={true} animationType="slide">
        <View style={style.ModalMainContainer}>
          <View style={style.ModalInnerContainer}>
            <View style={style.modalHeader}>
              <Text style={style.modalHeading}>Add Remainder</Text>
              <TouchableOpacity
                style={{alignItems: 'flex-end'}}
                onPress={() => setTextModal(false)}>
                <CrossIcon />
              </TouchableOpacity>
            </View>

            <TextInput
              value={taskMsg}
              multiline
              onChangeText={val => setTaskMsg(val)}
              style={style.TextInputStle}
              placeholder="Enter Your Remainder"
            />
            <DatePicker
              date={date || new Date()}
              onDateChange={d => setDate(d)}
            />

            <TouchableOpacity style={style.saveButton} onPress={saveTask}>
              <Text style={style.Save}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default App;
const style = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: 'white', padding: 10},
  mainHeading: {
    fontSize: 30,
    textAlign: 'center',
    color: COLORS.PRIMARY_PURPLE,
    fontWeight: '900',
    marginBottom: 20,
  },
  nolistContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  noTaskFound: {fontSize: 25, fontWeight: '400', color: 'black'},
  plusIcon: {height: 50, width: 50, marginBottom: 10, marginRight: 10},
  ModalMainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.TRANSPARENT,
  },
  ModalInnerContainer: {
    height: '80%',
    backgroundColor: COLORS.BACKGROUND_WHITE,
    borderRadius: 10,
    margin: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  modalHeading: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
    textAlignVertical: 'center',
    fontWeight: '900',
    color: COLORS.PRIMARY_PURPLE,
  },
  TextInputStle: {
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.NEUTRAL_LIGHT,
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    backgroundColor: COLORS.BLUE,
    paddingVertical: 10,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10,
  },
  Save: {
    fontSize: 20,
    color: COLORS.BACKGROUND_WHITE,
    fontWeight: '500',
  },
  FlatListContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.NEUTRAL_DARK,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  FlatListItemStyle: {
    fontSize: 14,
    color: COLORS.BACKGROUND_WHITE,
    flex: 1,
  },
});
