import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    PermissionsAndroid,
    Image,
    Button
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const Details = () => {
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
    const openCamera = async () => {
        const granded = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granded === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(option);
            setCameraImage(result.assets[0].uri);
            console.log('test');
        }
    }
    const openGallery = async () => {
        const result = await launchImageLibrary(option);
        setCameraImage(result.assets[0].uri)
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
    return (
        <SafeAreaView>
            <View>
                <Text>Name</Text>
                <TextInput
                    placeholder='Enter Name'
                    value={userData.Name || ""}
                    onChangeText={(e) => handleChange(e, 'Name')}
                />
            </View>
            <View>
                <Text>Age</Text>
                <TextInput
                    placeholder='Enter Age'
                    value={userData.Age || ""}
                    onChangeText={(e) => handleChange(e, 'Age')}
                />
            </View>
            <View>
                <Text>Phone Number</Text>
                <TextInput
                    placeholder='Enter Phone Number'
                    value={userData.Phone || ""}
                    onChangeText={(e) => handleChange(e, 'Phone')}
                />
            </View>
            <View>
                <Text>Alternate Phone Number</Text>
                <TextInput
                    placeholder='Enter Alternate Phone Number'
                    value={userData.AltPhone || ""}
                    onChangeText={(e) => handleChange(e, 'AltPhone')}
                />
            </View>
            <View>
                <Text>Address</Text>
                <TextInput
                    placeholder='Enter Address'
                    value={userData.Address || ""}
                    onChangeText={(e) => handleChange(e, 'Address')}
                />
            </View>
            <View>
                <Text>Aadhar Number</Text>
                <TextInput
                    placeholder='Enter Aadhar Number'
                    value={userData.Aadhar || ""}
                    onChangeText={(e) => handleChange(e, 'Aadhar')}
                />
            </View>
            <View>
                <TouchableOpacity onPress={openCamera}>
                    <Text>Open Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openGallery}>
                    <Text>Open Gallery</Text>
                </TouchableOpacity>
                <Image style={{ height: 100, width: 150 }} source={{ uri: cameraImage }} />
                {
                    cameraImage !== DummyImage ? <Button title='ClearImage' onPress={() => setCameraImage(DummyImage)} /> : null
                }
            </View>
            <View>
                <Button title='Submit' onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    )
}

export default Details
