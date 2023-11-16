import StyledTypo from "../styled components/StyledTypo"

const NavItem = ({ navItem }) => {
  return (
    <StyledTypo>
      <a href={navItem.link} className="flex items-center hover:text-blue-500 transition-colors">
        {navItem.name}
      </a>
    </StyledTypo>
  )
}

export default NavItem