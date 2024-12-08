import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
export interface IMessageItemProps {
  author: string;
  datetime: string;
  message: string;
}

const MessageItem: React.FC<IMessageItemProps> = ({
  author,
  datetime,
  message,
}) => {
  return (
    <Container maxWidth="md">
      <Grid
        container
        spacing={2}
        marginBottom={3}
        padding={3}
        border={1}
        borderColor={"slategray"}
        borderRadius={1}
      >
        <Grid size={12}>
          <Box>
            {" "}
            <Typography
              display={"inline-block"}
              fontWeight={"bold"}
              fontSize={24}
              color={"textSecondary"}
            >
              From:{" "}
            </Typography>{" "}
            <Typography display={"inline-block"} fontSize={24}>
              {author}
            </Typography>
          </Box>
          <Box>
            <Typography
              display={"inline-block"}
              color={"textSecondary"}
              fontWeight={"bold"}
              fontSize={24}
            >
              Date:{" "}
            </Typography>{" "}
            <Typography display={"inline-block"} fontSize={24}>
              {" "}
              {datetime}{" "}
            </Typography>
          </Box>
          <Box>
            <Typography
              display={"inline-block"}
              color={"textSecondary"}
              fontWeight={"bold"}
              fontSize={24}
            >
              Text of message:{" "}
            </Typography>{" "}
            <Typography display={"inline-block"} fontSize={24}>
              {" "}
              {message}{" "}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MessageItem;
