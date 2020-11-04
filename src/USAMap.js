import ReactUSAMap from "react-usa-map";
import { useBreakpointValue } from "@chakra-ui/core"

export default function Map({ states }) {
    const width = useBreakpointValue({ base: 100, md: 500, lg: 1000 });

    const handleClick  = (event) => {
      console.log(event.target.dataset.name);
    };
  
    return (
      <div className="App">
        <ReactUSAMap width={width} customize={states} onClick={handleClick} />
      </div>
    );
}