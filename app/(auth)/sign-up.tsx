import CustomButton from "@/components/CustomButton"
import InputField from "@/components/InputField"
import OAuth from "@/components/OAuth"
import { icons, images } from "@/constants"
import { Link } from "expo-router"
import { useState } from "react"
import { Alert, Image, ScrollView, Text, View } from "react-native"
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import ReactNativeModal from "react-native-modal"
import { fetchAPI } from "@/lib/fetch"

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()
    const [verification, setVerification] = useState({
        state: "default",
        error: '',
        code: ''
    })
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const onSignUpPress = async () => {
        if (!isLoaded) {
            return
        }

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            setVerification({
                ...verification,
                state: 'pending'
            })
        } catch (err: any) {
            Alert.alert(err.errors[0].longMessage)
        }
    }

    const onPressVerify = async () => {
        if (!isLoaded) {
            return
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            })

            if (completeSignUp.status === 'complete') {
                await fetchAPI('/(api)/user',{
                    method:'POST',
                    body:JSON.stringify({
                        name:form.name,
                        email:form.email,
                        clerk_id:completeSignUp.createdUserId
                    })
                });
                
                await setActive({ session: completeSignUp.createdSessionId })
                setVerification({ ...verification, state: 'success' })
                router.push('/(root)/(tabs)/home')
            } else {
                setVerification({
                    ...verification,
                    state: 'failed',
                    error: 'verification failed'
                })
            }
        } catch (err: any) {
            setVerification({
                ...verification,
                state: 'failed',
                error: err.errors[0].longMessage
            })
        }
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flext-1 bg-white">
                <View className="reative w-full h-[250px]">
                    <Image source={images.signUpCar} className="z-0 w-full h-[250px] " />
                    <Text className="absolute bottom-5 left-5 text-black font-JakartaSemiBold text-2xl">Create Your Account</Text>
                </View>

                <View className="px-4">
                    <InputField
                        label="Name"
                        placeholder="Enter your Name"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) => setForm({ ...form, name: value })}
                    />
                    <InputField
                        label="Email"
                        placeholder="Enter your Email"
                        icon={icons.email}
                        value={form.email}
                        onChangeText={(value) => setForm({ ...form, email: value })}
                    />

                    <InputField
                        label="Password"
                        placeholder="Enter your Password"
                        icon={icons.lock}
                        secureTextEntry={true}
                        value={form.password}
                        onChangeText={(value) => setForm({ ...form, password: value })}
                    />

                    <CustomButton title="Sign Up" className="mt-2" onPress={() => onSignUpPress()} />
                    <OAuth />
                    <Link href='/(auth)/sign-in' className="text-center text-lg font-JakartaMedium mt-2 ">
                        <Text>Already have an account?</Text>
                        <Text className="text-blue-500">Log in</Text>
                    </Link>

                </View>

                <ReactNativeModal
                    isVisible={verification.state === 'pending'}
                    onModalHide={() => setShowSuccessModal(true)}
                >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="font-JakartaBold text-2xl mb-2">
                            Verification
                        </Text>
                        <Text className="text-base font-Jakarta mb-5">
                            we' ve sent you verification code to {form.email}
                        </Text>

                        <InputField
                            label="code"
                            icon={icons.lock}
                            placeholder="123456"
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(value) => setVerification({ ...verification, code: value })}

                        />
                        {verification.error &&
                            <Text className="text-red-500 text-sm my-1">
                                {verification.error}
                            </Text>
                        }

                        <CustomButton
                            title="Verify Email"
                            className="bg-success-500 mt-5"
                            onPress={() => onPressVerify()}
                        />

                    </View>

                </ReactNativeModal>

                <ReactNativeModal isVisible={showSuccessModal} >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image source={images.check} className="h-[110px] w-[110px] mx-auto my-5" />
                        <Text className="text-center text-3xl font-JakartaBold">
                            Verified
                        </Text>
                        <Text className="text-base text-gray-500 font-Jakarta text-center mt-2"  >
                            You successfully Verified you account
                        </Text>
                        <CustomButton
                            title="Home"
                            onPress={() => {
                                setShowSuccessModal(false);
                                router.push("/(root)/(tabs)/home")
                            }}
                            className="mt-2"
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    )
}

export default SignUp