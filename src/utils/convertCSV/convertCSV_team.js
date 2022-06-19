function convertCSV(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(";");
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(";");
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j].trim()] = currentline[j].trim();
    }
    result.push(obj);
  }
  // }
  return result; //JavaScript object
  // return JSON.stringify(result) //JSON
}

export default convertCSV;
