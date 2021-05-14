import {useContext} from 'react';

import {DataContext} from '../App';

export default function EntriesList(){
    const data = useContext(DataContext);
    console.log(data);
    return(
        <div>
            <h2>List of Journal Entries</h2>
            <ul>
                {data.map((entry,i)=>{
                    return <li>{entry.post}</li>
                })}
            </ul>
        </div>
    )
}