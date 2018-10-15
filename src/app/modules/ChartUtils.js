//take a data array that would be used in a recharts graph and returns the object name with the highest value
//for that given dataset
export const getHighestDataPoint = (data) => {
  let highestProp = 0;
  for(let i=0; i<data.length; i++){
    if(data[i].value > data[highestProp].value){
        highestProp = i;
    }
  }
  return data[highestProp].name;
}

export const getLowestDataPoint = (data) => {
  let lowestProp = 0;
  for(let i=0; i<data.length; i++){
    if(data[i].value < data[lowestProp].value){
        lowestProp = i;
    }
  }
  return data[lowestProp].name;
}