//mapping is array of type [{ oldName: '', newName: '' }]
//assuming new property is always not nested - but old property can be nested once
//there is most likely a better way to do this
const changeArrayPropertyNames = (array, mapping) => {
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
const addArrayProperty = (array, name, value) => {
	for(let i = 0; i<array.length; i++){
		array[i][name] = value;
	}
	return array;
}

const resultsFilter = (array) => {
	
}

export default { changeArrayPropertyNames, addArrayProperty };