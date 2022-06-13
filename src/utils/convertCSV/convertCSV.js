function convertCSV(csv) {
  let lines = csv.split("\n");
  let arrayCouncil = [];
  let item = [];
  let i = 0;
  // tách csv ra thành từng hội hội đồng rồi add vào 1 mảng lớn
  while (i < lines.length) {
    if (lines[i].split(";")[0]) {
      item.push(lines[i]);
    }
    if (i + 1 !== lines.length) {
      if (lines[i + 1].split(";")[0]) {
        i++;
      } else {
        arrayCouncil.push(item);
        item = [];
        i += 2;
      }
    } else {
      arrayCouncil.push(item);
      break;
    }
  }
  // handle data csv ở trên thành result
  let result = [];
  let itemResult = {};
  let count = 1;
  arrayCouncil.forEach(item => {
    itemResult.location = item[0].split(";")[0];
    let councilHeader = item[2].split(";");
    let councilMember = item[3].split(";");
    let council = {};
    for (let i = 0; i < councilHeader.length - 2; i++) {
      council[councilHeader[i]] = councilMember[i];
    }
    council["index"] = count;
    count++;
    itemResult.council = council;
    let topic = [];
    let topicHeader = item[5].split(";");
    for (let i = 6; i < item.length; i++) {
      let topicItem = {};
      let topicContent = item[i].split(";");
      for (let j = 0; j < topicHeader.length - 1; j++) {
        topicItem[topicHeader[j]] = topicContent[j];
      }
      topic.push(topicItem);
    }
    itemResult.topic = topic;
    result.push(itemResult);
    itemResult = {};
  });
  return result; //JavaScript object
  // return JSON.stringify(result) //JSON
}

export default convertCSV;
