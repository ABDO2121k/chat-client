import { Box, Button, Typography } from "@mui/material";
import InputC from "../shared/InputC";
import { BiLogIn } from "react-icons/bi";
import { Suspense, useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Robot2 from "../models/Robot2";
import { Canvas } from "@react-three/fiber";
import Robot from "../models/Robot";

const Signup = () => {
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      toast.loading("signing up In", { id: "login" });
      await auth?.signup({ name, email, password });
      toast.success("logged In", { id: "login" });
    } catch (err) {
      console.log("error: ", err);
      toast.error("signing in failed ", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.currentUser) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box width={"100%"} height={"90vh"} display="flex" flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        {/* ROBOT 3D */}
        {/* ROBOT 3D */}
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          {/* //suspense kat5lina nbiyno l 3d bxakl mzn */}
          <Suspense fallback={"Loading ...."}>
            <Robot
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[5, 5, 5]}
            />
          </Suspense>
        </Canvas>
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        mb={6}
        ml="auto"
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
            height: "100%",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Typography
              variant="h4"
              textAlign={"center"}
              fontWeight={600}
              padding={2}
              color={"white"}
            >
              Login
            </Typography>
            <InputC type={"text"} name="name" label={"Name"} />
            <InputC type={"email"} name="email" label={"Email"} />
            <InputC type={"password"} name="password" label={"Password"} />
            <Button
              type="submit"
              endIcon={<BiLogIn />}
              sx={{
                px: 2,
                py: 1,
                width: "300px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
