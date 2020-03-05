import React, { Component } from 'react'
import { connect } from "react-redux"
import TableList from "./TableList"

export class DataOuput extends Component {

  handleArea = areaName => {
    this.props.dispatch({
      type: "AREA_FILTER",
      payload: areaName
    })
  }

  handleCategory = categoryName => {
    this.props.dispatch({
      type: "CATEGORY_FILTER",
      payload: categoryName
    })
  }

  handleStatus = status => {
    this.props.dispatch({
      type: "STATUS_FILTER",
      payload: status
    })
  }
  render() {
    const { areas, category, status, filterShopsData } = this.props;
    return (
      <div>
        <div className="text-center">
          <div className="form-inline d-flex justify-content-around mt-5">
            <select onChange={(event) => this.handleArea(event.target.value)} className="form-control">
              {areas && areas.map(data => <option key={data}>{data}</option>)}
            </select>
            <select onChange={(event) => this.handleCategory(event.target.value)} className="form-control">
              {category && category.map(data => <option key={data}>{data}</option>)}
            </select>
            <select onChange={(event) => this.handleStatus(event.target.value)} className="form-control">
              {status && status.map(data => <option key={data}>{data}</option>)}
            </select>
          </div>
          {filterShopsData.length > 0 ? <TableList /> : <h4 className="mt-5">No data satisfying your filters</h4>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    areas: state.app.shopAreas,
    category: state.app.shopsCategory,
    status: state.app.shopsStatus,
    filterShopsData: state.app.filterShopsData
  }
}

export default connect(mapStateToProps)(DataOuput);
