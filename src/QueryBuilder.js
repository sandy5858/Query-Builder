import { Button } from 'react-bootstrap';
import React, { useState } from 'react'
import GroupFilter from './GroupFilter';
import { conjunctionsArr } from './constants';

const QueryBuilder = () => {

    const [groupFilters, setgroupFilters] = useState([])
    const [conjunctions, setconjunctions] = useState([])
    const [conjunction, setconjunction] = useState("")
    const [query, setquery] = useState("")

    const addGroupFilter = () => {
        setgroupFilters([...groupFilters, [{ field: "", condition: "", criteria: "" }]])
        setconjunctions([...conjunctions, ""]);
    }

    const addFilter = (groupFilterId) => {
        let groupFiltersCopy = [...groupFilters];
        groupFiltersCopy[groupFilterId] = [...groupFiltersCopy[groupFilterId], { field: "", condition: "", criteria: "" }];
        setgroupFilters(groupFiltersCopy);
    }

    const deleteFilter = (groupFilterId, filterId) => {
        let groupFiltersCopy = [...groupFilters];
        groupFiltersCopy[groupFilterId] = groupFiltersCopy[groupFilterId].filter((el, indx) => indx !== filterId);
        if (groupFiltersCopy[groupFilterId].length === 0) {
            deleteGroupFilter(groupFilterId);
            return;
        }
        setgroupFilters(groupFiltersCopy);
    }

    const deleteGroupFilter = (groupFilterId) => {
        let groupFiltersCopy = groupFilters.filter((el, indx) => indx !== groupFilterId);
        let conjunctionsCopy = conjunctions.filter((el, indx) => indx !== groupFilterId);
        setgroupFilters(groupFiltersCopy);
        setconjunctions(conjunctionsCopy);
    }

    const changeField = (e, groupFilterId, filterId) => {
        let groupFiltersCopy = [...groupFilters];
        groupFiltersCopy[groupFilterId][filterId]['field'] = e.target.value;
        groupFiltersCopy[groupFilterId][filterId]['condition'] = "";
        groupFiltersCopy[groupFilterId][filterId]['criteria'] = "";
        setgroupFilters(groupFiltersCopy);
    }

    const changeCondition = (e, groupFilterId, filterId) => {
        let groupFiltersCopy = [...groupFilters];
        groupFiltersCopy[groupFilterId][filterId]['condition'] = e.target.value;
        setgroupFilters(groupFiltersCopy);
    }

    const changeCriteria = (e, groupFilterId, filterId) => {
        let groupFiltersCopy = [...groupFilters];
        groupFiltersCopy[groupFilterId][filterId]['criteria'] = e instanceof Date ? e : e.target.value;
        setgroupFilters(groupFiltersCopy);
    }

    const changeConjunction = (e, groupFilterId) => {
        let conjunctionsCopy = [...conjunctions];
        conjunctionsCopy[groupFilterId] = e.target.value;
        setconjunctions(conjunctionsCopy);
    }

    const getQuery = () => {
        let str = [];
        for (let i = 0; i < groupFilters.length; i++) {
            let temp = "(";
            for (let j = 0; j < groupFilters[i].length; j++) {
                if (j !== 0)
                    temp += conjunctions[i] === "AND" ? " && " : " || ";
                temp += groupFilters[i][j]['field'] + " " + groupFilters[i][j]['condition'] + " " + groupFilters[i][j]['criteria'];
            }
            temp += ")";
            str.push(temp);
        }
        if (conjunction === "AND")
            setquery(str.join(' && '));
        else
            setquery(str.join(' || '));
    }

    return (
        <div style={{ border: "1px solid violet", margin: "10px", padding: "10px", overflow: "auto", maxHeight: "500px" }}>
            <h1>QueryBuilder</h1>
            {groupFilters.length > 1 &&
                <select value={conjunction} onChange={(e) => setconjunction(e.target.value)}>
                    <option value="" disabled>Select Conjunction</option>
                    {conjunctionsArr.map(conjunction => <option key={conjunction} value={conjunction}>{conjunction}</option>)}
                </select>
            }
            {groupFilters.map((groupFilter, indx) =>
                <GroupFilter
                    key={indx}
                    id={indx}
                    addFilter={addFilter}
                    deleteFilter={deleteFilter}
                    deleteGroupFilter={deleteGroupFilter}
                    changeField={changeField}
                    changeCondition={changeCondition}
                    changeCriteria={changeCriteria}
                    changeConjunction={changeConjunction}
                    filters={groupFilter}
                    conjunction={conjunctions[indx]}
                />
            )}
            <Button variant="outline-primary" onClick={addGroupFilter}>+Add New Group Filter</Button>
            <div className="col my-5">
                <Button className="mx-2" variant="primary" onClick={getQuery}>Get Query</Button>
                <input className="mx-2" type="text" value={query} style={{ width: "700px" }} />
                <Button onClick={() => { navigator.clipboard.writeText(query) }}><i class="fa fa-clipboard"></i></Button>
            </div>
        </div>
    )
}

export default QueryBuilder;
