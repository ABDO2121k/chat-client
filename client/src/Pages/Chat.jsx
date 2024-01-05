import { Avatar, Box,  IconButton, Typography } from "@mui/material";
import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { authContext } from "../context/AuthContext";
import ChatItem from "../components/chat/chatItem";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-hot-toast";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Robot2 from '../models/Robot2'
import { Canvas } from "@react-three/fiber";

// and5lo react syntax highlighter bax ndiro highlight l syntax li aysftlna chatbot
const Chat = () => {
  const inputR = useRef(null);
  const auth = useContext(authContext);
  const [chatMessages, setM] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    if (auth?.isLo && auth?.currentUser) {
      toast.loading("Loading chats.....", { id: "loadChat" });
      auth
        .getChat()
        .then((data) => {
          setM([...data]);
          toast.success(" chats are loaded", { id: "loadChat" });
        })
        .catch((err) => {
          console.log("error", err);
          toast.error("Failed to load chats!!!", { id: "loadChat" });
        });
    }else{
       navigate('/login')
    }
  }, [auth]); // drt had auth hna 7it kol mra kandiro refresh kaytxonja lvaleur dial isLo
  // donc lfonction atb9a t5dm kol mra drna refresh 7it flwl kant kat5dm 4ir mnin kanbdlo route

  const handleSubmit = async () => {
    const content = inputR.current?.value;
    inputR.current.value = "";
    if(content.toLowerCase()=="clear") return handleClear();
    const newM = { role: "user", content: content };
    setM((prev) => [...prev, newM]);
    const chatData = await auth.ChatR(content);
    setM([...chatData.chats]);
  };

  const handleClear = async () => {
    try {
      toast.loading(" clearing chat ", { id: "delete chat" });
      await axios.delete("/chat/clearChat");
      setM([]);
      toast.success(" chats cleared successfully ", { id: "delete chat" });
    } catch (err) {
      toast.error("failed to clear chat", { id: "delete chat" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "96%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: "flex",
            xs: "none",
            sm: "none",
            flex: 0.2,
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "70vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: "5px",
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.currentUser?.name[0]}
          </Avatar>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
            }}
          >
            You are talking to a chatBot
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 4,
              p: 3,
            }}
          >
            You can ask any question and our chatBot will answer you, our
            chatBot is made By ABDELKADER KOUAH
             {/* ROBOT 3D */}
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          style={{width:'300px',height:'250px',marginTop:'20px'}}
        >
          <directionalLight intensity={3.5} position={[10, 10, 10]} />
          <ambientLight intensity={0.5} />
          {/* //suspense kat5lina nbiyno l 3d bxakl mzn */}
          <Suspense fallback={'Loading ....'}>
            <Robot2
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[2,1.5, 2]}
            />
          </Suspense>
        </Canvas>
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "50vh",
            borderRadius: "10px",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowY: "auto",
            overflowX: "hidden",
            scrollBehavior: "smooth",
          }}
        >
          {" "}
          {chatMessages.map((chat, i) => (
            <ChatItem content={chat.content} role={chat.role} key={i}/>
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            type="text"
            style={{
              width: "100%",
              background: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
            ref={inputR}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white" }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
