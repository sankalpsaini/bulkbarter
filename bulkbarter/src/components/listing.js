import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Listing(props) {
  return (
    <Card sx={{ border: 1, maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="listing">
            {props.User[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.Description}
        subheader={props.EndTime + " •  $" + props.price}
      />
      <CardMedia
        component="img"
        height="20"
        image={props.Picture}
        alt={props.Description}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <div>Total units available: {props.NoU}</div>
          Minimum units to purchase: {props.MoU}
        </Typography>
        <button className="bg-blue-400 mt-4 p-2 rounded-md text-white hover:bg-blue-600">
          I'm Interested
        </button>
      </CardContent>
    </Card>
  );
}