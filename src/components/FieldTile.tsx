import { FC } from "react";
import { Field } from "../logic/Field";
import { Position } from "./types";
import { Typography, useTheme } from "@mui/material";

const FieldTile: FC<{
  field: Field;
  selectable: boolean;
  selected: boolean;
  onClick: VoidFunction;
}> = ({ field, selectable, onClick, selected }) => {
  const theme = useTheme();
  return (
    <div
      onClick={onClick}
      style={{
        gridColumn: `col ${field.column} / span 1`,
        gridRow: `row ${field.row} / span 1`,
        height: 70,
        width: 70,
        border: selected ? "3px solid black" : "1px solid black",
        cursor: selectable ? "pointer" : "default",
        pointerEvents: selectable ? "all" : "none",
        background: theme.palette.grey.A200,
        boxSizing: "border-box",
      }}
    >
      <img
        height={16}
        width={16}
        src={field.getImage()}
        style={{
          marginTop: 8,
          marginLeft: 8,
        }}
      />
      <Typography variant="caption" display="inline-block">
        {field.card?.type}
      </Typography>
      <Typography variant="caption" display="inline-block">
        {field.card?.owner}
      </Typography>
    </div>
  );
};

export default FieldTile;
