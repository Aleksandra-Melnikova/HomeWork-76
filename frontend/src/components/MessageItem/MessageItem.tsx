import React from "react";
import { IMessage } from "../../types";
import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

const MessageItem: React.FC<IMessage> = ({
  _id,
  author,
  datetime,
  message,
}) => {
  return (
    <Container maxWidth="md">
    <Grid   container itemID={_id} spacing={2} marginBottom={3} padding={3} border={1} borderColor={'slategray'} borderRadius={1}>
      <Grid size={12} >
        <Typography fontSize={24}>
          <Typography display={'inline-block'} fontWeight={'bold'} fontSize={24} color={'textSecondary'} >From: </Typography> {author}
        </Typography>
          <Typography fontSize={24}>  <Typography display={'inline-block'} color={'textSecondary'} fontWeight={'bold'} fontSize={24} >Date: </Typography> {datetime} </Typography>
        <Typography fontSize={24} > <Typography display={'inline-block'}  color={'textSecondary'} fontWeight={'bold'} fontSize={24} >Text of message: </Typography> {message} </Typography>
      </Grid>
    </Grid>
    </Container>
  );
};

export default MessageItem;
