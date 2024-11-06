import { useState } from "react";
import { 
  HomeOutlined, 
  UserOutlined, 
  MessageOutlined, 
  CameraOutlined, 
  SettingOutlined 
} from "@ant-design/icons";

export const Dock = () => {
    const Menus = [
    { name: "Home", icon: <HomeOutlined style={{ fontSize : "18px"}} />, dis: "translate-x-0" },
    { name: "Profile", icon: <UserOutlined style={{ fontSize : "18px"}}  />, dis: "translate-x-16" },
    { name: "Message", icon: <MessageOutlined style={{ fontSize : "18px"}} />, dis: "translate-x-32" },
    { name: "Photos", icon: <CameraOutlined style={{ fontSize : "18px"}} />, dis: "translate-x-48" },
    { name: "Settings", icon: <SettingOutlined style={{ fontSize : "18px"}} />, dis: "translate-x-64" },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="max-h-[2.4rem] px-6 rounded-t-xl" style={{ backgroundColor : "#051017" , borderRadius : "40%" ,  border : "2px  solid #4C5965"}}>
      <ul className="flex relative">
        <span
          className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-gray-900 h-10 w-10 absolute
         -top-5 rounded-full`} style={{ backgroundColor : "#fd7077"  ,  left : "14.5px"}}>
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
              onClick={() => setActive(i)}
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
                    ? "-translate-y-0 duration-700 opacity-100"
                    : "opacity-0 translate-y-10"
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