import { useEffect, useState } from "react"
import { getTopics } from "../../../services/getTopics"

export const FilterSection = () => {
    const [allTopics, setAllTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState([])

    useEffect(() => {
        getTopics().then( topicsArray => {
            setAllTopics(topicsArray)
        })
    }, [])

    return (
    <div className="filter-section">
        <div>
            <label htmlFor="dropdown">Choose an option:</label>
            <select id="dropdown" defaultValue="">
                <option value="" disabled selected>select a topic</option>
                {allTopics.map(topic => {
                    return (
                        <option value={topic.id} key={topic.id}>{topic.topic}</option>
                    )
                })}
                
            </select>
        </div>

    </div>
    
    )
}