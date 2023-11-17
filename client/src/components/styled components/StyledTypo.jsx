import { Typography } from "@material-tailwind/react";

const StyledTypo = ({ children }) => {
  return (
    <Typography
      variant="small"
      color="blue-gray"
      className="p-1 font-medium"
    >
      {children}
    </Typography>
  )
}

export default StyledTypo
