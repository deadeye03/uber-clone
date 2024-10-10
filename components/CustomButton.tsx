import { ButtonProps } from "@/types/type"
import { Text, TouchableOpacity } from "react-native"

const getBgVariantStyle=(variant:ButtonProps['bgVariant'])=>{
    switch (variant) {
        case "secondary":
            return "bg-gray-500";
        
        case "danger":
            return "bg-red-500";
        
        case "success":
            return "bg-green-500";
        
        case "outline":
            return "bg-transparent border-neutral-300 border-[0.5px]";
        
        default:
            return "bg-[#0286ff] "
    }
};

const CustomButton = ({
    onPress,
    title,
    bgVariant = "primary",
    textVariant = "default",
    IconLeft,
    IconRight,
    className,
    ...props

}: ButtonProps) => (
    <TouchableOpacity onPress={onPress} 
    className={`w-full rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}{...props} >
        {IconLeft && <IconLeft />}
        <Text className={`text-center text-lg font-bold ${getTextStyle(textVariant)} p-3`}>{title}</Text>
        {IconRight && <IconRight />}
    </TouchableOpacity>
)
const getTextStyle = (variant: ButtonProps['textVariant']) => {
    switch (variant) { 
        case "primary":
            return "text-black";

        case "secondary":
            return "text-gray-100";

        case "success":
            return "text-green-100";

        case "danger":
            return "text-red-100";

        default:
            return "text-white "
    }
};

export default CustomButton   