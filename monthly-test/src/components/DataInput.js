import React, { Component } from 'react'
import { connect } from "react-redux"

export class DataInput extends Component {
  state = {
    shopName: "",
    area: "Jayanagar",
    category: "Grocery",
    openingDate: "",
    closingDate: ""
  }

  handleShopName = (name) => {
    this.setState({
      shopName: name
    })
  }

  handleArea = (areaName) => {
    this.setState({
      area: areaName
    })
  }

  handleCategory = (categoryName) => {
    this.setState({
      category: categoryName
    })
  }

  handleOpeningDate = (openingDate) => {
    this.setState({
      openingDate: openingDate
    })
  }

  handleClosingDate = (closingDate) => {
    this.setState({
      closingDate: closingDate
    })
  }

  sendData = () => {
    const { shopName, openingDate, closingDate } = this.state;
    if (!closingDate || !openingDate)
      alert("Date can't be empty")
    else if (closingDate < openingDate)
      alert("Closing Date can't be before opening date")
    else if (!shopName.trim())
      alert("Shop name can't be empty")
    else {
      let close = new Date(this.state.closingDate);
      let open = new Date(this.state.openingDate);
      let status = (close >= new Date() && open <= new Date()) || (open.getFullYear() === new Date().getFullYear() && open.getMonth() === new Date().getMonth() && open.getDate() === new Date().getDate()) || ((close.getFullYear() === new Date().getFullYear() && close.getMonth() === new Date().getMonth() && close.getDate() === new Date().getDate())) ? 'Open' : 'Close';
      console.log(open.getTime(), new Date().getTime())
      this.props.dispatch({
        type: "ADD_SHOP",
        payload: {
          ...this.state,
          status
        }
      })
      this.setState({
        shopName: "",
        area: "Jayanagar",
        category: "Grocery",
        openingDate: "",
        closingDate: ""
      })
    }
  }

  render() {
    // console.log(this.props);
    const { areas, category } = this.props;
    return (
      <div className="jumbo text-center">
        <h1 className="m-0 mb-2 pt-5">Shops List</h1>
        <div className="form-inline d-flex justify-content-around mt-5">
          <input onChange={(event) => this.handleShopName(event.target.value)} value={this.state.shopName} className="form-control" type="string" placeholder="Enter Shop Name"></input>
          <select onChange={(event) => this.handleArea(event.target.value)} value={this.state.area} className="form-control">
            {areas && areas.map(data => <option key={data}>{data}</option>)}
          </select>
          <select onChange={(event) => this.handleCategory(event.target.value)} value={this.state.category} className="form-control">
            {category && category.map(data => <option key={data}>{data}</option>)}
          </select>
          <input onChange={(event) => this.handleOpeningDate(event.target.value)} value={this.state.openingDate} type="date" className="form-control" max={this.state.closingDate}></input>
          <input onChange={(event) => this.handleClosingDate(event.target.value)} value={this.state.closingDate} type="date" className="form-control" min={this.state.openingDate}></input>
          <button onClick={() => this.sendData()} className="btn btn-success">Submit</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    areas: state.app.shopAreas,
    category: state.app.shopsCategory
  }
}

export default connect(mapStateToProps)(DataInput);
