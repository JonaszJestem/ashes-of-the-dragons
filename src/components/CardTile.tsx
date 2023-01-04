import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { FC } from "react";
import { CardType } from "../logic/Game";
import { useTheme } from "@mui/material";

const CardTile: FC<{
  type: CardType;
  onClick: VoidFunction;
  selected: boolean;
}> = ({ type, onClick, selected }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        minWidth: 250,
        minHeight: 300,
        background: selected
          ? theme.palette.grey.A100
          : theme.palette.grey.A200,
        border: selected ? `2px solid yellow` : undefined,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" justifyContent="center">
          <Typography>{type}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardTile;
