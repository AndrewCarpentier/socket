export function Events({events}){
    return (
        <ul>
            {
                events.map((events, index)=>(
                    <li key={index}>{events}</li>
                ))
            }
        </ul>
    )
}