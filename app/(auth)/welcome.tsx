import { Image, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { router } from "expo-router"
import Swiper from "react-native-swiper"
import { useRef, useState } from "react"
import { onboarding } from "@/constants"
import CustomButton from "@/components/CustomButton"

const Onboarding=()=>{
    const swipRef=useRef <Swiper>(null)
    const [activeIndex,setActiveIndex]=useState(0)
    const lastIndex=activeIndex=== onboarding.length-1
    return(
        <SafeAreaView className="h-full flex justify-between items-center bg-white" >
            <TouchableOpacity onPress={()=>{
                router.replace('/(auth)/sign-up')
            } }
            className="w-full flex justify-end items-end p-5">
                <Text className=" font-JakartaBold text-blue-500 ">Skip</Text>
            </TouchableOpacity>
            <Swiper ref={swipRef} 
            loop={false}
            dot={<View className="w-[32px] h-1 mx-1 bg-[#E2E8F0] rounded-full"></View>} 
            activeDot={<View className="w-[32px] h-1 mx-1 bg-blue-600 rounded-full"></View>} 
            onIndexChanged={(index)=>setActiveIndex(index)}
            >
            {onboarding.map((item)=>(
                <View key={item.id} className="flex justify-center items-center p-5">
                    <Image source={item.image} className="w-full h-[300px] " resizeMode="contain" />
                    <View className="mt-2 ">

                    <Text className="text-3xl font-JakartaBold text-center">{item.title}</Text>
                    </View>
                    <Text className="mt-2 text-center text-lg font-JakartaSemiBold text-gray-500">{item.description} </Text>
                </View>
            ))}
            </Swiper>
        <CustomButton title={lastIndex?'Get Started':'Next'} 
        onPress={()=> lastIndex? router.replace('/(auth)/sign-up '): swipRef.current?.scrollBy(1)}
        className="w-10/12 mt-10 mb-2 " />
        </SafeAreaView>
    )
}

export default Onboarding