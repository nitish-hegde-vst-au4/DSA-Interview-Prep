import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

let initialState = {
  shopsData: [],
  filterShopsData: [],
  shopAreas: ["Jayanagar", "Basavanagudi", "JP Nagar", "Padmanabhanagar", "Banashankari", "Uttarahalli", "Kumaraswamy", "Girinagar"],
  shopsCategory: ["Grocery", "Butcher", "Baker", "Chemist", "Stationery shop", "Hardware shop", "Flower", "Newsagent", "Furniture"],
  shopsStatus: ["All", "Open", "Close"],
  filterArea: "Jayanagar",
  filterCategory: "Grocery",
  filterSatus: "All"
}

function appReducer(state = initialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state))
  let filterShopsData = [];
  switch (action.type) {
    case "ADD_SHOP":
      let shopData = stateCopy.shopsData;
      stateCopy.filterShopsData = [];
      shopData.push(action.payload);
      filterShopsData = filterData(stateCopy.shopsData, stateCopy.filterArea, stateCopy.filterCategory, stateCopy.filterSatus);
      stateCopy.filterShopsData.push(...filterShopsData);
      return stateCopy;

    case "AREA_FILTER":
      stateCopy.filterArea = action.payload;
      filterShopsData = filterData(stateCopy.shopsData, stateCopy.filterArea, stateCopy.filterCategory, stateCopy.filterSatus);
      stateCopy.filterShopsData = [];
      stateCopy.filterShopsData.push(...filterShopsData);
      return stateCopy;

    case "CATEGORY_FILTER":
      stateCopy.filterCategory = action.payload;
      filterShopsData = filterData(stateCopy.shopsData, stateCopy.filterArea, stateCopy.filterCategory, stateCopy.filterSatus);
      stateCopy.filterShopsData = [];
      stateCopy.filterShopsData.push(...filterShopsData);
      return stateCopy;

    case "STATUS_FILTER":
      stateCopy.filterSatus = action.payload;
      filterShopsData = filterData(stateCopy.shopsData, stateCopy.filterArea, stateCopy.filterCategory, stateCopy.filterSatus);
      stateCopy.filterShopsData = [];
      stateCopy.filterShopsData.push(...filterShopsData);
      return stateCopy;

    default:
      return stateCopy;
  }
  // return state;
}

const filterData = (shops, area, category, status) => {
  let filtershops = shops.filter(shop => shop.area === area && shop.category === category);
  if (status !== "All")
    filtershops = filtershops.filter(shop => shop.status === status)
  return filtershops;
}

const rootReducers = combineReducers({
  app: appReducer
});

const store = createStore(rootReducers, composeWithDevTools());

export default store;