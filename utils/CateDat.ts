import { IconType } from "react-icons";
import { AiFillAndroid, AiFillCamera, AiOutlineLaptop } from "react-icons/ai";
import { BiHeadphone, BiMobile, BiMouse, BiSolidBatteryCharging, BiSolidCableCar, BiSolidKeyboard, BiSolidTv, BiSolidWatch, BiSpeaker } from "react-icons/bi";

interface categoryType {
    label: string;
    icon: IconType;
};

export const ProductsCategory: categoryType[] = [

    {
        label: "all",
        icon: AiFillAndroid,
    },
    {
        label: "phone",
        icon: BiMobile,
    },
    {
        label: "Desktop",
        icon: AiOutlineLaptop,
    },
    {
        label: "tv",
        icon: BiSolidTv,
    },
    {
        label: "Keyboards",
        icon: BiSolidKeyboard,
    },
    {
        label: "cabels",
        icon: BiSolidCableCar,
    },
    {
        label: "adapter",
        icon: BiSolidBatteryCharging,
    },
    {
        label: "watch",
        icon: BiSolidWatch,
    },
    {
        label: "mouce",
        icon: BiMouse,
    },
    {
        label: "camera",
        icon: AiFillCamera,
    },
    {
        label: "headphones",
        icon: BiHeadphone,
    },
    {
        label: "speaker",
        icon: BiSpeaker,
    },

]

export default ProductsCategory