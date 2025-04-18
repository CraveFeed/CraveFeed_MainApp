import { useState } from "react";
import { 
  HomeOutlined, 
  MessageOutlined, 
  BellOutlined, 
  SettingOutlined,
} from "@ant-design/icons";
import chefIcon from "../assets/icons8-chef-hat-30.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface DockProps {
  index: number;
}

export const Dock = ({index} : DockProps) => {
    const Menus = [
    { name: "Ping", path : "/notifications" , icon: <BellOutlined style={{ fontSize : "18px"  , color : "white"}} />, dis: "translate-x-0" },
    { name: "Chat", path : "/chat" , icon: <MessageOutlined style={{ fontSize : "18px"  , color : "white"}}  />, dis: "translate-x-16" },
    { name: "Home", path : "/home" , icon: <HomeOutlined style={{ fontSize : "18px"  , color : "white"}} />, dis: "translate-x-32" },
    { name: "Nibbles", path : "/nibbles" , icon: <img src={chefIcon.src} style={{ width : "24px" , marginLeft : "20px" , color : "white" , marginBottom : "5px"}} />, dis: "translate-x-48" },
    { name: "Settings", path : "" , icon: <SettingOutlined style={{ fontSize : "18px"  , color : "white"}} />, dis: "translate-x-64" },
  ];
  const [active, setActive] = useState(index);
  const router = useRouter();
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/home") {
      setActive(2);
    } else if (path === "/nibbles") {
      setActive(3);
    }else if(path ==="/notifications"){
      setActive(0);
    }
  }, []);

  
  return (
    <div className="max-h-70 px-6 rounded-t-xl deck-mobile-width" style={{ backgroundColor : "#051017" , height : "70px" ,  border : "2px  solid #1B2730"}}>
      <ul className="flex relative">
        <span
          className={`duration-500 ${Menus[active].dis} border-4 border-gray-900 absolute
         -top-6 rounded-full`} style={{ backgroundColor : "#bebebe"  ,  left : "4px" , height : "56px" , width : "56px"}}>
          {/* <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px] shadow-myShadow1"
          ></span>
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
          ></span> */}
        </span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-16">
            <a
              className="flex flex-col text-center pt-6"
              onClick={() => {setActive(i) , router.push(menu.path)}}
            >
              <span
                className={`text-xl cursor-pointer duration-500 -mt-5 ${
                  i === active && "-mt-9 text-black"
                }`} style={{ zIndex: 1 }}
              >                 {menu.icon}
              </span>
              <span
                className={` ${
                  active === i
                    ? "translate-y-2 duration-700 opacity-100"
                    : "opacity-0 translate-y-5"
                } `}
                style={{ color: "#fff" }}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}