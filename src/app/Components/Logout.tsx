
import React from 'react'
import { Button, Modal } from 'antd';
import "../styles/logout.css"

export default function logout() {
  const[logout,clicklogout]=React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
   
    const loggingout = () =>{
      clicklogout(true)
    }
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return (
      <>
        <Button  onClick={showModal}  style={{ width : "100%"}}>
          Logout
        </Button>
        <Modal  footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  >
          {logout?
          <>
          <div style={{margin:"40px"}}> <span style={{display:"flex",justifyContent:"center" , fontSize:"32px", fontWeight:600}}>See you next time!</span>
          <span style={{display:"flex",justifyContent:"center" , fontSize:"16px" , color:"grey"}}>Can't wait to have you back!</span></div>
         
          </>
          :
          <>
          <div >  <span style={{display:"flex", justifyContent:"center" , fontSize:"25px" , fontWeight:600,marginTop:"30px"}}>Leaving So Soon?</span>
            <div style={{display:"flex" , flexDirection:"column",alignItems:"center",marginTop:"50px"}}>
              <span style={{color:"gray" , fontWeight:500}}>Thank you for visiting! Logging out ensures your privacy is safeguarded.</span>
             <Button type='primary' style={{marginTop:"20px"}} onClick={loggingout}>Logout</Button>
            </div></div>
          
            
          </>}
          
         
          
        </Modal>
      </>
  )
}
