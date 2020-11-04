import ReactUSAMap from "react-usa-map";
import { useBreakpointValue, Box } from "@chakra-ui/core"

export default function Map({ states }) {
    const width = useBreakpointValue([200, 350, 500, 600]);

    const handleClick  = (event) => {
      console.log(event.target.dataset.name);
    };
  
    return (
      <Box mt={5}>
        <ReactUSAMap height={width} customize={states} onClick={handleClick} />
      </Box>
    );
}