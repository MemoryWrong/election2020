import ReactUSAMap from "react-usa-map";
import { useBreakpointValue, Box } from "@chakra-ui/core"

const USAMap = ({ states, onStateClick }) => {
    const width = useBreakpointValue([200, 350, 500, 600]);
  
    return (
      <Box mt={5}>
        <ReactUSAMap height={width} customize={states} onClick={onStateClick} />
      </Box>
    );
}

export default USAMap;