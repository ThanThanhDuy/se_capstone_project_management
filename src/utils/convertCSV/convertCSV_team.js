function convertCSV(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(";");
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(";");
    for (var j = 0; j < headers.length; j++) {
      if (
        headers[j].trim() === "mentor_name" ||
        headers[j].trim() === "leader_name" ||
        headers[j].trim() === "member_name"
      ) {
        let users = currentline[j].split(", ");
        for (let k = 0; k < users.length; k++) {
          obj["code_" + `${headers[j].trim()}` + `_${k + 1}`] =
            users[k].split("-")[0];
          obj[headers[j].trim() + ` ${k + 1}`] = users[k].split("-")[1];
        }
        let name = "";
        for (let l = 0; l < users.length; l++) {
          name += users[l].split("-")[1] + ", ";
        }

        obj[headers[j].trim()] = name.slice(0, -2);
      } else if (
        headers[j].trim() === "semeter_name" ||
        headers[j].trim() === "topic_name"
      ) {
        obj["code_" + `${headers[j].trim()}`] = currentline[j].split("-")[0];
        obj[headers[j].trim()] = currentline[j].split("-")[1];
      } else {
        obj[headers[j].trim()] = currentline[j].trim();
      }
    }
    // console.log(obj);
    result.push(obj);
  }
  console.log(result);
  // }
  return result; //JavaScript object
  // return JSON.stringify(result) //JSON
}

export default convertCSV;
