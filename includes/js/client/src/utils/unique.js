
// returns unique version of an ordered array of objects using key supplied
// will value later entries as "unique" version
export default function(toDeDupe: Array, key: string) {
  let arr = {}, returnArr = [];
  
  for ( var i=0, len=toDeDupe.length; i < len; i++ )
    arr[toDeDupe[i][key]] = toDeDupe[i];

  for ( var key in arr )
    returnArr.push(arr[key]);

  return returnArr;
}