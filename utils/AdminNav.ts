import { IconType } from "react-icons"
import { AiFillDashboard, AiOutlineHistory, AiOutlineOrderedList } from "react-icons/ai"
import { BiLogoProductHunt, BiCartAdd, BiLibrary } from "react-icons/bi"
interface adOption {
    Icon: IconType,
    title: string,
    onclick?: () => void
}
export const adminNavoptions: adOption[] = [
    {
        Icon: AiFillDashboard,
        title: "Dashboard",
    },
    {
        Icon: BiLogoProductHunt,
        title: "Add-Products",
    },
    {
        Icon: BiLibrary,
        title: "Manage-Products",
    },
    {
        Icon: AiOutlineOrderedList,
        title: "Manage-Orders",
    },



]
export default adminNavoptions 