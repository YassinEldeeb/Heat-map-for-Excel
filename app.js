const xlsxFile = require("read-excel-file/node")
const fs = require("fs")

const dataObj = []

xlsxFile("./excel.xlsx").then((rows) => {
  rows.forEach((col, index) => {
    col.forEach((data, index) => {
      if (index === 5) {
        if (
          data !== 0 &&
          col[index + 1] !== 0 &&
          data !== "Latitude" &&
          col[index + 1] !== "Longitude"
        ) {
          let arr = []
          arr = [data, col[index + 1]]
          dataObj.push(arr)
        }
      }
    })
  })
  const features = []
  dataObj.forEach((each) => {
    features.push({
      type: "Feature",
      properties: [],
      geometry: {
        type: "Point",
        coordinates: each,
      },
    })
  })
  fs.writeFileSync(
    "data.geojson",
    JSON.stringify({
      type: "FeatureCollection",
      features: features,
    })
  )
})
