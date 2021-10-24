import { Button } from "react-bootstrap"
import React from 'react'
import Filter from "./Filter"
import { conjunctionsArr } from "./constants"

const GroupFilter = (props) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ border: "1px solid violet", margin: "10px", padding: "10px", overflow: "auto", maxHeight: "200px" }}>
                {props.filters.length > 1 &&
                    <select value={props.conjunction} onChange={(e) => props.changeConjunction(e, props.id)}>
                        <option value="" disabled>Select Conjunction</option>
                        {conjunctionsArr.map(conjunction => <option key={conjunction} value={conjunction}>{conjunction}</option>)}
                    </select>
                }
                {props.filters.map((filter, indx) =>
                    <Filter
                        key={indx}
                        id={indx}
                        groupFilterId={props.id}
                        deleteFilter={props.deleteFilter}
                        changeField={props.changeField}
                        changeCondition={props.changeCondition}
                        changeCriteria={props.changeCriteria}
                        filter={filter}
                    />
                )}
                <Button variant="outline-primary" onClick={() => props.addFilter(props.id)}>+Add Filter</Button>
            </div>
            <div style={{ margin: "10px", padding: "10px" }}>
                <Button variant="outline-secondary" onClick={() => props.deleteGroupFilter(props.id)}>
                    <i className="fa fa-trash"></i>
                </Button>
            </div>
        </div>
    )
}

export default GroupFilter;
