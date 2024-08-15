import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '../../styles/colors';
import {
  height,
  moderateScale,
  textScale,
  width,
} from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import TextInputComp from '../../Components/TextInputComp';
import CustomBtn from '../../Components/CustomBtn';
import navigationsStrings from '../../constants/navigationsStrings';

const AddToList = ({ navigation }) => {
  const [categories, setCategories] = useState([{ name: '', lists: [''] }]);

  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].name = value;
    setCategories(newCategories);
  };

  const handleListChange = (catIndex, listIndex, value) => {
    const newCategories = [...categories];
    newCategories[catIndex].lists[listIndex] = value;
    setCategories(newCategories);
  };

  const addCategory = () => {
    setCategories([...categories, { name: '', lists: [''] }]);
  };

  const addList = (catIndex) => {
    const newCategories = [...categories];
    newCategories[catIndex].lists.push('');
    setCategories(newCategories);
  };

  const handleNavigation = () => {
    if (categories.length === 0) {
      alert('Please add at least one category and list');
      return;
    }
    navigation.navigate(navigationsStrings.TODOTASK, { categories });
  };
  

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{ flex: 1, backgroundColor: colors.themebackgroundcolor }}>
      <View
        style={{
          flex: 1,
          paddingBottom: moderateScale(40),
          backgroundColor: colors.themebackgroundcolor,
        }}>
        <ImageBackground
          style={styles.backgroundStyle}
          resizeMode="cover"
          imageStyle={styles.imageBackStyle}
          source={imagePath.headerIc}>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={imagePath.goBackArrow} />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.containViewStyle}>
          <Text style={styles.welcomeText}>Welcome Onboard!</Text>
          <Image
            style={styles.whiteBoardImageStyle}
            source={imagePath.laptop}
          />
          <Text style={styles.forgetText}>
            Add categories and lists below:
          </Text>

          {categories.map((category, catIndex) => (
            <View key={catIndex}>
              <TextInputComp
                value={category.name}
                onChangeText={(value) => handleCategoryChange(catIndex, value)}
                placeholder={`Category ${catIndex + 1}`}
              />
              {category.lists.map((list, listIndex) => (
                <TextInputComp
                  key={listIndex}
                  value={list}
                  onChangeText={(value) => handleListChange(catIndex, listIndex, value)}
                  placeholder={`List ${listIndex + 1} in ${category.name}`}
                />
              ))}
              <View style={styles.buttonWrapper}>
                <CustomBtn
                  btnStyle={styles.addListButton}
                  btnText={'Add another list'}
                  onpress={() => addList(catIndex)}
                />
              </View> 
            </View>
          ))}

          <CustomBtn
            btnStyle={{ marginTop: moderateScale(20) }}
            btnText={'Add another category'}
            onpress={addCategory}
          />
          <CustomBtn
            btnStyle={{ marginTop: moderateScale(20) }}
            btnText={'Submit'}
            onpress={handleNavigation}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddToList;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageBackStyle: {
    height: height / 6.3,
    width: width / 2.1,
  },
  backgroundStyle: {
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(40),
  },
  containViewStyle: {
    alignItems: 'center',
    marginTop: moderateScale(44),
  },
  welcomeText: {
    fontSize: textScale(20),
    fontWeight: '500',
    color: colors.black,
  },
  whiteBoardImageStyle: {
    marginTop: moderateScale(21),
    height: height / 3.8,
    width: width / 1.5,
  },
  forgetText: {
    color: colors.btnColor,
    fontSize: textScale(13),
    marginBottom: moderateScale(32),
    fontWeight: '500',
    marginTop: moderateScale(12),
  },
  buttonWrapper: {
    alignItems: 'center',
    marginVertical: moderateScale(10),
  },
  signinText: {
    fontSize: textScale(15),
    color: colors.btnColor,
    fontWeight: '500',
  },
});
