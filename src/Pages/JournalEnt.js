import {Link} from "react-router-dom";

export default function GetPage({ page }){
    return(
        <div>
            <Link to="/" className="Linko">Back to Home</Link>
            <header>
               <h1>{}</h1>
            </header>
            <div>
            {/* <img src={dog.url} className='hoo' alt="nonsense"></img> */}
            <div>
            <p className="oogoo"><a  className="boobalafoola">Life:</a> {}s have a life span of {dog.breeds[0].life_span}</p>
            </div>
            
            </div>
        </div>
    )
}