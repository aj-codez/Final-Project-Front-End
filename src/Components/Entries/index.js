import { useContext, useState } from "react"
import { DataContext } from "../../App"

export default function Entry({data}){
    const contextData = useContext(DataContext);
    const [thePost,setThePost]=useState(data.post);
    const [theContent,setTheContent]=useState(data.content);

    const onFormSubmit = (e)=>{
        e.preventDefault();
        const theData = {post:thePost,content:theContent}
        updatedEnt(theData,data._id)
    }

    return (
        <div>
            <a href={data.url} target="_blank">
                <h3>{data.post}</h3>
            </a>
            <button onClick={()=> contextData.delete(data._id)}>Delete</button>
            <div>
                <form>
                    <input type="submit"/>
                    <input type="text" id="post" placeholder="post" value={} onChange={onThePostChange}></input>
                    <input type="text" id="content" placeholder="content" value={} onChange={onTheContentChange}></input>
                </form>
            </div>
        </div>
    )
}