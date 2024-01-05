import { Avatar, Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import { saveAs } from "file-saver";
import { MdFileDownload } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

const ChatItemI = ({ content, role, key }) => {
  const auth = useContext(authContext);
  const [downloaded, setDownloaded] = useState(false);
  const handleDownload = () => {
    if (!downloaded) {
      saveAs(content, "downloaded_image.jpg");
      setDownloaded(true);
    }
    setTimeout(() => {
      setDownloaded(false);
    }, 2000);
  };
  return role == "user" ? (
    <Box
      key={key}
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d5612",
        my: 2,
        gap: 2,
      }}
    >
      <Avatar
        sx={{
          ml: "0",
        }}
      >
        <img src={"openai.png"} alt="openai" width={"30px"} />
      </Avatar>
      <Box>
        <Typography sx={{ fontSize: "15px" }}>{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box
      key={key}
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#004d56",
        gap: 2,
        my: 2,
      }}
    >
      <Avatar
        sx={{
          ml: "0",
          bgcolor: "black",
          color: "white",
        }}
      >
        {auth?.currentUser?.name[0]}
      </Avatar>
      <Box>
        <Typography
          sx={{
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={content}
            alt="content"
            style={{
              margin: "auto",
              width: "200px",
              height: "300px",
              padding: "30px",
              background: "white",
              borderRadius: "10px",
            }}
          />
          <h3
            style={{
              color: "black",
              position: "absolute",
              right: "5px",
              top: "-15px",
              cursor: "pointer",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            {downloaded ? (
              <GiConfirmed />
            ) : (
              <MdFileDownload onClick={ handleDownload} />
            )}
          </h3>
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatItemI;
