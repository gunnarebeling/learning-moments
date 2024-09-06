import { useEffect, useState } from "react"
import { getTopics } from "../../../services/getTopics"

export const FilterSection = ({setSelectedTopic,setTextValue}) => {
    const [allTopics, setAllTopics] = useState([])
    

    useEffect(() => {
        getTopics().then( topicsArray => {
            setAllTopics(topicsArray)
        })
    }, [])

    return (
    <div className="filter-section  m-2 d-flex justify-content-between">
        <div>
            <label htmlFor="dropdown">Topic: </label>
            <select id="dropdown"  onChange={(event) => setSelectedTopic(event.target.value)}>
                <option value="" >all</option>
                {allTopics.map(topic => {
                    return (
                        <option value={topic.id} key={topic.id}>{topic.topic}</option>
                    )
                })}
                
            </select>
        </div>
        <div className="post-search ">
            <input type="text"placeholder="search posts" onChange={event => setTextValue(event.target.value)}/>
        </div>

    </div>
    
    )
}