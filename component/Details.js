import React, { useContext, useState } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    PermissionsAndroid,
    Image,
    Button,
    StyleSheet,
    Pressable,
    ScrollView,
    Platform,
    Alert
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import { androidCameraPermission } from './Permission';
import ImagePicker from 'react-native-image-crop-picker';


const Details = ({ navigation }) => {
    const DummyImage = "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png";
    const IntialUserData = {
        Name: "",
        Age: "",
        Phone: "",
        AltPhone: "",
        Address: "",
        Aadhar: "",
        Camera: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png"
    }
    const [cameraImage, setCameraImage] = useState(DummyImage);
    const [userData, setUserData] = useState(IntialUserData);

    let option = {
        saveToPhotos: true,
        mediaType: 'photo',
    }

    const onSelectImage = async () => {
        const permissionStatus = await androidCameraPermission()
        if (permissionStatus || Platform.OS === 'android') {
            Alert.alert(
                "Upload Aadhaar",
                'Choose an Option',
                [
                    { text: 'Camera', onPress: openCamera },
                    { text: 'Gallery', onPress: openGallery },
                    { text: 'Cancel', onPress: () => { } },
                ]
            )
        }

       
    }

    const openCamera = async () => {
        // const granded = await PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.CAMERA,
        // );
        // if (granded === PermissionsAndroid.RESULTS.GRANTED) {
        //     const result = await launchCamera(option);
        //     setCameraImage(result.assets[0].uri);
        // }
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setCameraImage(image);
        });
    }
    const openGallery = async () => {
        // const result = await launchImageLibrary(option);
        // setCameraImage(result.assets[0].uri)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setCameraImage(image);
        });
    }


    const handleChange = (value, name) => {
        setUserData({
            ...userData,
            [name]: value,
            Camera: cameraImage
        })
    }

    const handleSubmit = async () => {
        console.log(userData);
        // try {
        //     const response = await axios({
        //         method: 'post',
        //         url: "http://192.168.1.7/Lotus-Medical/public/create-patient-api.php",
        //         crossDomain: true,
        //         headers: {
        //             'Access-Control-Allow-Origin': '*',
        //             'content-type': 'application/x-www-form-urlencoded'
        //         },
        //         data: { patientData: (patientData) },
        //         dataType: 'json'
        //     });
        //     // if(response){
        //     //     setUserData(IntialUserData)
        //     // }
        // }
        // catch (err) {
        //     console.log("API Error = ", err)
        // }
        // setUserData(IntialUserData)
    }
    const handleLogout = () => {
        navigation.navigate("Login");
    };
    return (
        <ScrollView style={styles.background}>
            <Pressable onPress={handleLogout}>
                <Icon name="log-out" size={30} style={styles.icon} />
            </Pressable>
            <View style={styles.border}>
                <View>
                    <Text style={styles.heading}>Name</Text>
                    <TextInput
                        style={styles.body}
                        placeholder='Enter Name'
                        placeholderTextColor='#233EE8'
                        value={userData.Name || ""}
                        onChangeText={(e) => handleChange(e, 'Name')}
                    />
                </View>
                <View>
                    <Text style={styles.heading}>Age</Text>
                    <TextInput
                        style={styles.body}
                        placeholder='Enter Age'
                        placeholderTextColor='#233EE8'
                        value={userData.Age || ""}
                        onChangeText={(e) => handleChange(e, 'Age')}
                    />
                </View>
                <View>
                    <Text style={styles.heading}>Phone Number</Text>
                    <TextInput
                        style={styles.body}
                        placeholder='Enter Phone Number'
                        placeholderTextColor='#233EE8'
                        value={userData.Phone || ""}
                        onChangeText={(e) => handleChange(e, 'Phone')}
                    />
                </View>
                <View>
                    <Text style={styles.heading}>Alternate Phone Number</Text>
                    <TextInput
                        style={styles.body}
                        placeholder='Enter Alternate Phone Number'
                        placeholderTextColor='#233EE8'
                        value={userData.AltPhone || ""}
                        onChangeText={(e) => handleChange(e, 'AltPhone')}
                    />
                </View>
                <View>
                    <Text style={styles.heading}>Address</Text>
                    <TextInput
                        style={styles.body}
                        placeholder='Enter Address'
                        placeholderTextColor='#233EE8'
                        value={userData.Address || ""}
                        onChangeText={(e) => handleChange(e, 'Address')}
                    />
                </View>
                <View>
                    <Text style={styles.heading}>Aadhar Number</Text>
                    <TextInput
                        style={styles.body}
                        placeholder='Enter Aadhar Number'
                        placeholderTextColor='#233EE8'
                        value={userData.Aadhar || ""}
                        onChangeText={(e) => handleChange(e, 'Aadhar')}
                    />
                </View>
                <View>
                    <Text style={styles.heading}>Upload Aadhaar Card</Text>
                    <Pressable style={styles.UploadedImage} onPress={openGallery}>
                        <Image style={{ height: 100, width: 150 }} source={{ uri: cameraImage }} />
                    </Pressable>

                    {
                        cameraImage !== DummyImage ?
                            <TouchableOpacity onPress={() => setCameraImage(DummyImage)}>
                                <Text style={styles.clearButton}>ClearImage</Text>
                            </TouchableOpacity>
                            : null
                    }
                </View>
                <TouchableOpacity onPress={onSelectImage}>
                    <Text style={styles.CameraButton}>Upload Image</Text>
                </TouchableOpacity>
                <View style={styles.cameraButtonView}>
                    <TouchableOpacity onPress={openCamera}>
                        <Text style={styles.CameraButton}>Open Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openGallery}>
                        <Text style={styles.CameraButton}>Open Gallery</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={handleSubmit} >
                        <Text style={styles.button}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderColor: "#000",
        borderWidth: 1,
        marginLeft: 120,
        marginRight: 120,
        padding: 8,
        backgroundColor: "#10491D",
        color: "#fff",
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    // Clear Image
    clearButton: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderColor: "#000",
        borderWidth: 1,
        marginLeft: 120,
        marginRight: 120,
        padding: 8,
        backgroundColor: "red",
        color: "#fff",
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 'bold'
    },
    // All Styles of Camera 
    CameraButton: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15,
        borderColor: "#000",
        borderWidth: 1,
        padding: 8,
        backgroundColor: "#5E27BC",
        color: "#fff",
        borderRadius: 10,
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 50,
    },
    cameraButtonView: {
        flexDirection: 'row',
    },
    UploadedImage: {
        alignItems: 'center'
    },
    // Background Image
    background: {
        flex: 1,
        backgroundColor: '#CAD9CC'
    },
    // Text
    heading: {
        color: '#000',
        marginTop: 20,
        marginBottom: 20,
        fontSize: 15,
        fontWeight: 'bold'
    },
    //TextInput
    body: {
        fontSize: 15,
        borderBottomColor: '#000',
        borderWidth: 1,
    },
    // login container
    border: {
        borderColor: '#000',
        margin: 10,
        padding: 10
    },
    // SignUp warning Text
    warning: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    //Icon
    icon: {
        marginLeft: 350,
        color: 'red',
        marginTop: 20,
    },
    // login container
    border: {
        borderColor: '#000',
        margin: 10,
        padding: 10
    },
})

export default Details
