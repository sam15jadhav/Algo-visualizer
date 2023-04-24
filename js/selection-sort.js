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
  
  // selection sort methods
  selectionSort() {
    // promise for async selection sort with delay
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    // async function for selection sort algorithm
    async function sort(self) {
      for (let i = 0; i < data.length; i++) {
        // Stoping execution here if users wants to stop.
        if (self.abort) {
          self.abort = false;
          return;
        }
        smallest = data[i];
        pos = i;
        changeBarColor(smallest, smallestColor);
        await timer(time);
        for (var j = i + 1; j < data.length; j++) {
          if (self.abort) {
            self.abort = false;
            return;
          }
          changeBarColor(data[j], traverseColor);
          if (smallest > data[j]) {
            await timer(time);
            changeBarColor(smallest, unsortedColor);
            smallest = data[j];
            pos = j;
          }

          changeBarColor(smallest, smallestColor);
          await timer(time);
          changeBarColor(data[j], unsortedColor);
        }
        if (data[i] != smallest) {
          temp = data[i];
          data[i] = smallest;
          data[pos] = temp;
        }
        // swapping bar and changing smallest color
        changeBarColor(smallest, sortedColor);
        swapBar(data);
        await timer(time); // then the created Promise can be awaited
      }

      // After complete sorting algorithm making all the bar green.
      svg.selectAll("rect").style("fill", "#56b4d3");

      isSorting = false;
      isFound = true;
      togglePlay();
    }
    // calling sort function here
    sort(this);
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
    const selectionSortStarted = SortAlgo.selectionSort.bind(SortAlgo);
    selectionSortStarted();
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
