import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import React, { useState } from 'react';
import imagePath from '../../constants/imagePath';
import {
  height,
  moderateScale,
  textScale,
  width,
} from '../../styles/responsiveSize';
import colors from '../../styles/colors';
import AntDesign from '@expo/vector-icons/AntDesign';

const TodoTask = ({ navigation, route }) => {
  const [isCheck, setIsCheck] = useState(null);
  const [categories, setCategories] = useState(route?.params?.categories || []);
  const [editing, setEditing] = useState(null); // For editing state
  const [newTask, setNewTask] = useState('');
  const [newList, setNewList] = useState('');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);

  // Add a new task to the selected list
  const addTask = (categoryIndex) => {
    if (newTask.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }

    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].lists.push(newTask.trim());
    setCategories(updatedCategories);
    setNewTask('');
  };

  // Add a new list to the selected category
  const addList = () => {
    if (newList.trim() === '') {
      Alert.alert('Error', 'List cannot be empty');
      return;
    }

    const updatedCategories = [...categories];
    updatedCategories.push({ name: newList.trim(), lists: [] });
    setCategories(updatedCategories);
    setNewList('');
  };

  // Edit a task or category
  const handleEdit = (categoryIndex, listIndex) => {
    setEditing({ categoryIndex, listIndex });
  };

  // Save edited task or category
  const saveEdit = (categoryIndex, listIndex, editedText) => {
    const updatedCategories = [...categories];
    if (listIndex !== null) {
      updatedCategories[categoryIndex].lists[listIndex] = editedText;
    } else {
      updatedCategories[categoryIndex].name = editedText;
    }
    setCategories(updatedCategories);
    setEditing(null);
  };

  // Delete a task or category
  const handleDelete = (categoryIndex, listIndex) => {
    const updatedCategories = [...categories];
    if (listIndex !== null) {
      updatedCategories[categoryIndex].lists.splice(listIndex, 1);
    } else {
      updatedCategories.splice(categoryIndex, 1);
    }
    setCategories(updatedCategories);
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} style={styles.scrollView}>
        <View style={styles.container}>
          <ImageBackground style={styles.imgBackStyle} source={imagePath.back}>
            <View style={styles.headerContainer}>
              <ImageBackground style={styles.goBackIcImage} source={imagePath.headerIc}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={imagePath.goBackArrow} />
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </ImageBackground>
          <Image style={styles.girlImageStyle} source={imagePath.girl} />
          <View style={styles.contentContainer}>
            <Text style={styles.todoTextStyle}>Todo Tasks</Text>

            {/* Input to add new list */}
            <View style={styles.addContainer}>
              <TextInput
                value={newList}
                onChangeText={setNewList}
                placeholder="Add new list"
                style={styles.input}
              />
              <TouchableOpacity onPress={addList}>
                <AntDesign name="plussquare" size={24} color="black" />
              </TouchableOpacity>
            </View>

            {categories.map((category, catIndex) => (
              <View key={catIndex} style={styles.categoryContainer}>
                {editing?.categoryIndex === catIndex ? (
                  <View style={styles.editContainer}>
                    <TextInput
                      value={category.name}
                      onChangeText={(text) => saveEdit(catIndex, null, text)}
                      style={styles.input}
                    />
                    <TouchableOpacity onPress={() => setEditing(null)}>
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.categoryHeader}>
                    <Text style={styles.categoryTitle}>{category.name}</Text>
                    <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => handleEdit(catIndex, null)}>
                      <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(catIndex, null)}>
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
                    </View>
                  </View>
                )}
                {category.lists.map((list, listIndex) => (
                  <View key={listIndex} style={styles.taskContainer}>
                    {editing?.categoryIndex === catIndex && editing.listIndex === listIndex ? (
                      <View style={styles.editContainer}>
                        <TextInput
                          value={list}
                          onChangeText={(text) => saveEdit(catIndex, listIndex, text)}
                          style={styles.input}
                        />
                        <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => setEditing(null)}>
                          <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View style={styles.taskItem}>
                        <TouchableOpacity onPress={() => setIsCheck(list)}>
                          <Image
                            style={styles.checkBox}
                            source={isCheck === list ? imagePath.RectangleCheck : imagePath.RectangleUncheck}
                          />
                          <Text style={styles.taskText}>{list}</Text>
                        </TouchableOpacity>
                        <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={() => handleEdit(catIndex, listIndex)}>
                          <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDelete(catIndex, listIndex)}>
                          <AntDesign name="delete" size={24} color="black" />
                        </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                ))}
                {/* Input to add new task */}
                <View style={styles.addContainer}>
                  <TextInput
                    value={newTask}
                    onChangeText={setNewTask}
                    placeholder="Add new task"
                    style={styles.input}
                  />
                  <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => addTask(catIndex)}>
                    <AntDesign name="plussquare" size={24} color="black" />
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TodoTask;

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute', // Set absolute positioning
    right: 0, // Align to the right
    top: 10, // Optional: Adjust top position if needed
    flexDirection: 'row', // Arrange icons in a row
    alignItems: 'center', // Center icons vertically (optional)
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.themebackgroundcolor,
  },
  container: {
    flex: 1,
    backgroundColor: colors.themebackgroundcolor,
    paddingBottom: moderateScale(40),
  },
  imgBackStyle: {
    width: width / 1,
    height: height / 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goBackIcImage: {
    width: width / 2,
    height: height / 6.7,
    paddingVertical: moderateScale(44),
    paddingHorizontal: moderateScale(22),
  },
  girlImageStyle: {
    height: height / 4.5,
    width: width / 2.8,
    alignSelf: 'center',
    marginTop: moderateScale(-40),
  },
  contentContainer: {
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  todoTextStyle: {
    fontSize: textScale(20),
    fontWeight: '500',
    color: colors.black,
    marginBottom: moderateScale(10),
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(10),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: moderateScale(5),
    padding: moderateScale(5),
    flex: 1,
  },
  categoryContainer: {
    marginBottom: moderateScale(20),
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: textScale(16),
    fontWeight: '600',
    color: colors.black,
    marginBottom: moderateScale(10),
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(5),
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: moderateScale(10),
  },
  taskText: {
    fontSize: textScale(14),
    color: colors.black,
    flex: 1,
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: textScale(18),
    color: colors.black,
  },
});

