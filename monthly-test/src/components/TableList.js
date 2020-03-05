import React from 'react'
import { connect } from "react-redux"

function TableList(props) {
  console.log(props);
  return (
    <div>
      <table className="table mt-5">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Shop Name</th>
            <th scope="col">Shop Area</th>
            <th scope="col">Shop Category</th>
            <th scope="col">Shop Status</th>
          </tr>
        </thead>
        <tbody>
          {props.filteredShopsData && props.filteredShopsData.map((data, index) => {
            // console.log(data);
            let bgGreen = { background: "Green" };
            let bgRed = { background: "Red" };
            let style = data.status === "Open" ? bgGreen : bgRed;
            return (
              <tr key={index} style={style}>
                <th key={`${data.shopNam}${index}`} >{data.shopName}</th>
                <th key={`${data.area}${index}`}>{data.area}</th>
                <th key={`${data.category}${index}`}>{data.category}</th>
                <th key={`${data.status}${index}`}>{data.status}</th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    filteredShopsData: state.app.filterShopsData,
  }
}

export default connect(mapStateToProps)(TableList);