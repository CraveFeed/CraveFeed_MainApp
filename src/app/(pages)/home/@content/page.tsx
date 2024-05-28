import { Avatar, Card  , Flex} from "antd";
import avatar from "../../../assets/avatar.jpg"
import "../../../styles/content.css"

export default function Content(){
    return (
        <Flex style={{backgroundColor : "#051017" , border : "none" , color : "white" , width : "100%"}}>
            <Card style={{width : "100%" , backgroundColor : "#1B2730" , border : "none" , borderRadius : "20px" , height : "auto"}}>
                <Flex>
                    <Avatar size={50} src={avatar.src}/>
                </Flex>
            </Card>
        </Flex>
    )
}