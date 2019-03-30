
var topPlaces;
var left;
var right;
var pivot;
var index;
export default class MarkerSort{

constructor(){
    topPlaces = [];
    topPlacesLength = 10;
    this.unsorted = [];
    left = 0;
    right = 0;

    }

async setItems(unsorted){

    for(let i =0; i < unsorted.length; i++){
        this.unsorted[i] = unsorted[i];
    }

    right = unsorted.length-1;

    let sorted = await this.quickSort(this.unsorted, left, right);
    //console.log('this is sorted!!!');
    //console.log(sorted);

    //console.log(sorted[3]);
    this.setTopPlaces(sorted);
    //console.log(this.unsorted);

  }


  setTopPlaces(sorted) {
    for(let i = sorted.length-1; i > sorted.length-10; i--) {
          let temp = sorted[i];
          topPlaces.push(temp);

          //console.log('should be sorted items');
          //console.log(sorted[i]);
      }

}

quickSort(unsorted, left, right){
//console.log(right);
    if(left >= right)return;
    pivot = (unsorted[Math.floor((left + right) / 2)]).response.venue.rating;
    index = this.partition(unsorted, left, right, pivot);
    this.quickSort(unsorted, left, index -1);
    this.quickSort(unsorted, index, right);
    return unsorted;

    console.log('this is what unsorted returns after quickSort');
    console.log(unsorted);
}

partition(unsorted, left, right, pivot){
    while(left <= right){
        while(unsorted[left].response.venue.rating < pivot){

        //console.log('sorted left array');
        //console.log(unsorted[left]);

            left++;
        }
        while(unsorted[right].response.venue.rating > pivot){
            right--;
        }
        if(left <= right){
            [unsorted[left].response.venue.rating, unsorted[right].response.venue.rating] = [unsorted[right].response.venue.rating, unsorted[left].response.venue.rating];
            left++;
            right--;
        }
      }
      return left;
    }

}


