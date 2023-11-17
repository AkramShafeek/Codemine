import { Button } from "@material-tailwind/react"
import StyledTypo from "../styled components/StyledTypo"

const NavItem = ({ navItem }) => {
  return (
    <StyledTypo>
      <a href={navItem.link} className="flex items-center text-white hover:text-gray-50 transition-colors">
        <Button variant="text" size="sm" color="white">
          {navItem.name}
        </Button>
      </a>
    </StyledTypo>
  )
}

export default NavItem