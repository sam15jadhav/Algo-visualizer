var svg,
  bandScale,
  text,
  maxElement = 15,
  dataRange = maxElement * 2,
  areaHeight = 250,
  areaWidth = 800,
  time = 300,
  traverseColor = "#ffcaa1",
  smallestColor = "#ab87ff",
  unsortedColor = "#add8e6",
  sortedColor = "#56b4d3",
  isSorting = false,
  isFound = false;


// generating random data
var data = randomData(maxElement, dataRange);
function setSpeed() {
  time = 1000 - document.getElementById("speed").value;
}
//a d3 function for scaling height for all the data this function
var heightScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, areaHeight]);

// initialized a chart with random value
createChart(data);

const SortAlgo = {
  //Merge Sort methods to perform merge sort algorithm
  mergeSort() {
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    // async function for selection sort algorithm
    async function sort(self, arr, l, r) {
      // l is for left index and r is
      // right index of the sub-array
      // of arr to be sorted */
      if (r > l) {
        var m = l + parseInt((r - l) / 2);

        sort(this, arr, l, m);

        sort(this, arr, m + 1, r);

        var n1 = m - l + 1;
        var n2 = r - m;

        // Create temp arrays
        var L = new Array(n1);
        var R = new Array(n2);

        // Copy data to temp arrays L[] and R[]
        for (var i = 0; i < n1; i++) L[i] = arr[l + i];
        for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

        // Merge the temp arrays back into arr[l..r]

        // Initial index of first subarray
        var i = 0;

        // Initial index of second subarray
        var j = 0;

        // Initial index of merged subarray
        var k = l;

        while (i < n1 && j < n2) {
          if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
          } else {
            arr[k] = R[j];
            j++;
          }
          k++;
        }

        // Copy the remaining elements of
        // L[], if there are any
        while (i < n1) {
          arr[k] = L[i];
          i++;
          k++;
        }

        // Copy the remaining elements of
        // R[], if there are any
        while (j < n2) {
          arr[k] = R[j];
          j++;
          k++;
        }
        swapBar(data);
      }

      console.log(data);
      svg.selectAll("rect").style("fill", "#56b4d3");
      isSorting = false;
      isFound = true;
      togglePlay();
    }

    // calling sort function here
    sort(this, data, 0, data.length - 1);
  },

   // If user wants to stop the sorting process then this function will be called and sorting algorithm will be stopped immediately.
  sortStop() {
    this.abort = true;
    isSorting = false;
  }
}

function stopSorting() {
    const stopSorting = SortAlgo.sortStop.bind(SortAlgo);
    stopSorting();
  }

  function startSorting() {
    const mergeSortStarted = SortAlgo.mergeSort.bind(SortAlgo);
    mergeSortStarted();
  }

  
document.getElementById("sort").addEventListener("click", function () {
    isSorting = true;
    startSorting();
    togglePlay();
  });
  
  document.getElementById("stop").addEventListener("click", function () {
    if (isSorting) {
      stopSorting();
      togglePlay();
    }
  });
  
  document.getElementById("random-data").addEventListener("click", function () {
    if (isSorting) {
      stopSorting();
      togglePlay();
    }
    if (isFound) {
      isFound = false;
      document.getElementById("sort").classList.remove("none");
    }
    svg.remove();
    var data = randomData(maxElement, dataRange);
    createChart(data);
  });
  