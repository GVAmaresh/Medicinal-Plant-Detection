"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";

interface FounderMemberProp {
  name: string;
  image: string;
  description: string;
}

export default function FounderMember({
  name,
  image,
  description,
}: FounderMemberProp) {
  return (
    <Card
      sx={{
        display: {xs:"flex flex-col", md:"flex"},
        width: { sx: "73%", xs: "80%" },
        height: "100%",
        marginTop: 3,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: 310, md: 400 },
          height: 250,
        }}
        image={image}
        alt="Founder image"
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent>
          <Typography component="div" variant="h5" className=" font-bold">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            className=" text-base   "
          >
            {description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
