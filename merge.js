export function mergeSort(arr){
  let arr1 = arr.slice(0, arr.length / 2)
  let arr2 = arr.slice(arr.length / 2, arr.length)

  if(arr1.length > 1){
    arr1 = mergeSort(arr1)
  }

  if(arr2.length > 1){
    arr2 = mergeSort(arr2)
  }

  return join(arr1, arr2)
}

function join(arr1, arr2){
  let sorted = []
  let i1 = 0
  let i2 = 0

  while(i1 < arr1.length && i2 < arr2.length){
    if(arr1[i1] > arr2[i2]){
      sorted.push(arr2[i2])
      i2++
    }else{
      sorted.push(arr1[i1])
      i1++
    }
  }

  while(i1 < arr1.length){
    sorted.push(arr1[i1])
    i1++
  }

  while(i2 < arr2.length){
    sorted.push(arr2[i2])
    i2++
  }

  return sorted
}
