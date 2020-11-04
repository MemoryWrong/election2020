import ReactUSAMap from "react-usa-map";

export default function Map({ states }) {
    const handleClick  = (event) => {
      console.log(event.target.dataset.name);
    };
  
    return (
      <div className="App">
        <ReactUSAMap customize={states} onClick={handleClick} />
      </div>
    );
}