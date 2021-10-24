import React from 'react'
import { fields, conditions } from "./constants";
import { Button } from "react-bootstrap"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filter = (props) => {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ border: "1px solid violet", margin: "10px", padding: "10px", display: "flex" }}>
                <select className="mx-5" value={props.filter['field']} onChange={(e) => props.changeField(e, props.groupFilterId, props.id)}>
                    <option value="" disabled>Select Field</option>
                    {fields.map(field => <option key={field} value={field}>{field}</option>)}
                </select>
                <select className="mx-5" value={props.filter['condition']} onChange={(e) => props.changeCondition(e, props.groupFilterId, props.id)}>
                    <option value="" disabled>Select Condition</option>
                    {props.filter['field'] !== "" &&
                        conditions[props.filter['field']].map(condition => <option key={condition} value={condition}>{condition}</option>)
                    }
                </select>
                {(props.filter['field'] === "") &&
                    <input className="mx-5" placeholder="Enter Criteria" style={{ cursor: "not-allowed" }} disabled />
                }
                {(props.filter['field'] === "language") &&
                    <input
                        className="mx-5" type="text"
                        placeholder={`Enter ${props.filter['field']}`}
                        value={props.filter['criteria']}
                        onChange={(e) => props.changeCriteria(e, props.groupFilterId, props.id)}
                    />
                }
                {(props.filter['field'] === 'date') &&
                    <DatePicker
                        className="mx-5"
                        selected={props.filter['criteria']}
                        onChange={(date) => props.changeCriteria(date, props.groupFilterId, props.id)}
                        placeholder="Enter Date"
                        dateFormat="dd/MM/yyyy"
                    />
                }
                {(props.filter['field'] === "salary" || props.filter['field'] === "customer_id") &&
                    <input
                        className="mx-5"
                        type="number"
                        placeholder={`Enter ${props.filter['field']}`}
                        value={props.filter['criteria']}
                        onChange={(e) => props.changeCriteria(e, props.groupFilterId, props.id)}
                    />
                }
            </div>
            <div style={{ margin: "10px", padding: "10px" }}>
                <Button variant="outline-secondary" onClick={() => props.deleteFilter(props.groupFilterId, props.id)}>
                    <i className="fa fa-trash"></i>
                </Button>
            </div>
        </div>
    )
}

export default Filter
