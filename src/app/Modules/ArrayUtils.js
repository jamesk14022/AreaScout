//mapping is array of type [{ oldName: '', newName: '' }]
//assuming new property is always not nested - but old property can be nested once
//there is most likely a better way to do this
export const changeArrayPropertyNames = (array, mapping) => {
  for(let i = 0; i<array.length; i++){
	for(let n = 0; n<mapping.length; n++){
	  let { newName, oldName } = mapping[n];
      let oldNameArr = oldName.split('.');
	  if(oldNameArr.length===1){
	    array[i][newName] = array[i][oldName];
	    delete array[i][oldName];
	  }else{
	    array[i][newName] = array[i][oldNameArr[0]][oldNameArr[1]];
	    delete array[i][oldNameArr[0]][oldNameArr[1]];
	  }
	}
  }
  return array;
} 

//adds property to all objects in array
export const addArrayProperty = (array, name, value) => {
  for(let i = 0; i<array.length; i++){
    array[i][name] = value;
  }
  return array;
}

//objectProperty is the property you wish to check for duplicates of
export const resultsFilterDuplicates = (array, objectProp) => {
  return array.filter((item, index, self) => (
	index === self.findIndex((i) => (
	  i[objectProp] === item[objectProp]
	))
  ));
}

//sorts array of objects by ascenindg distance from lat long
//if distance prop not specified we assume item.dist.calculated
export const sortArrayAscending = (array, distanceProp) => {
  return array.sort((a, b) => (
  	parseFloat(a['dist']['calculated']) - parseFloat(b['dist']['calculated'])
  ));
}
