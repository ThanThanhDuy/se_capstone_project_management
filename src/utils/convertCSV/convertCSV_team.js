function convertCSV(csv, key) {
  var lines = csv.split("\n");
  console.log(lines);
  var result = [];

  var headers = lines[0].split(",");

  for (var i = 0; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[key[j]] = currentline[j];
    }

    result.push(obj);
  }

  return result; //JavaScript object
  // return JSON.stringify(result) //JSON
}

export default convertCSV;
