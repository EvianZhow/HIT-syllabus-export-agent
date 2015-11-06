function grkb_parse(doc, semester_begin_time, callback) {
  var table = doc.querySelector('body > div > div > div.xfyq_area.mt10 > div.xfyq_con > table > tbody');
  if (table != null) {
    for (var row = 2; row <= 7; row++) {
      for (var col = 3; col <= 9; col++) {
        var cell = table.querySelector('tr:nth-child('+row+') > td:nth-child('+col+')');
        cell.childNodes.forEach(function(entry) {
          if (entry.textContent.trim() == "")
            return;
          var match = /(.+?)(\(实验\))?◇(.+)?\[(\d+(?:-\d+)?)周\](.+)/.exec(entry.textContent.trim());
          if (match != null) {
            var c_name = match[1];
            var c_teacher = match[3]; if (c_teacher == null) { c_teacher = "无" }
            var startWeek = match[4].split("-")[0]; startWeek = Number(startWeek);
            var endWeek = match[4].split("-")[1]; if (endWeek == null) { endWeek = startWeek } else { endWeek = Number(endWeek) };
            var c_location = match[5];

            var start_time = (col-3)*86400000;
            var end_time = (col-3)*86400000;

            if (match[2] != null) {
              // 实验课
              switch (row-1) {
                case 1:
                  start_time += 26400000;
                  end_time += 35400000;
                  break;
                case 2:
                  start_time += 36000000;
                  end_time += 45000000;
                  break;
                case 3:
                  start_time += 46800000;
                  end_time += 55800000;
                  break;
                case 4:
                  start_time += 56400000;
                  end_time += 65400000;
                  break;
                case 5:
                  start_time += 66600000;
                  end_time += 75600000;
                  break;
                default:
                  break;
              }
            } else {
              // 正常课程
              switch (row-1) {
                case 1:
                  start_time += 28800000;
                  end_time += 35100000;
                  break;
                case 2:
                  start_time += 36000000;
                  end_time += 42300000;
                  break;
                case 3:
                  start_time += 49500000;
                  end_time += 55800000;
                  break;
                case 4:
                  start_time += 56700000;
                  end_time += 63000000;
                  break;
                case 5:
                  start_time += 66600000;
                  end_time += 75600000;
                  break;
                case 6:
                  start_time += 73800000;
                  end_time += 80100000;
                  break;
                default:
                  break;
              }
            }

            for (var w = startWeek; w <= endWeek; w+=1) {
              var week_base = (w-1)*604800000+semester_begin_time;
              var start_d = new Date(week_base+start_time);
              var end_d = new Date(week_base+end_time);
              callback({
                'name': c_name,
                'start_date': start_d,
                'end_date': end_d,
                'teacher': c_teacher,
                'location': c_location
              })
            }
          }
        });
      }
    }
  } else {
    alert('Error loading tables!');
  }
}

function xskb_parse(doc, semester_begin_time, callback) {
  var table = doc.querySelector('body > div > div > div.xfyq_area > div.xfyq_con > table > tbody');
  if (table != null) {
    for (var row = 2; row <= 7; row++) {
      for (var col = 3; col <= 9; col++) {
        var cell = table.querySelector('tr:nth-child('+row+') > td:nth-child('+col+')');
        cell.childNodes.forEach(function(entry) {
          if (entry.textContent.trim() == "")
            return;
          var match = /(.+?)(\(实验\))?◇(.+)?\[(\d+(?:-\d+)?)周\]◇(.+)/.exec(entry.textContent.trim());
          if (match != null) {
            var c_name = match[1];
            var c_teacher = match[3]; if (c_teacher == null) { c_teacher = "无" }
            var startWeek = match[4].split("-")[0]; startWeek = Number(startWeek);
            var endWeek = match[4].split("-")[1]; if (endWeek == null) { endWeek = startWeek } else { endWeek = Number(endWeek) };
            var c_location = match[5];

            var start_time = (col-3)*86400000;
            var end_time = (col-3)*86400000;

            if (match[2] != null) {
              // 实验课
              switch (row-1) {
                case 1:
                  start_time += 26400000;
                  end_time += 35400000;
                  break;
                case 2:
                  start_time += 36000000;
                  end_time += 45000000;
                  break;
                case 3:
                  start_time += 46800000;
                  end_time += 55800000;
                  break;
                case 4:
                  start_time += 56400000;
                  end_time += 65400000;
                  break;
                case 5:
                  start_time += 66600000;
                  end_time += 75600000;
                  break;
                default:
                  break;
              }
            } else {
              // 正常课程
              switch (row-1) {
                case 1:
                  start_time += 28800000;
                  end_time += 35100000;
                  break;
                case 2:
                  start_time += 36000000;
                  end_time += 42300000;
                  break;
                case 3:
                  start_time += 49500000;
                  end_time += 55800000;
                  break;
                case 4:
                  start_time += 56700000;
                  end_time += 63000000;
                  break;
                case 5:
                  start_time += 66600000;
                  end_time += 75600000;
                  break;
                case 6:
                  start_time += 73800000;
                  end_time += 80100000;
                  break;
                default:
                  break;
              }
            }

            for (var w = startWeek; w <= endWeek; w+=1) {
              var week_base = (w-1)*604800000+semester_begin_time;
              var start_d = new Date(week_base+start_time);
              var end_d = new Date(week_base+end_time);
              callback({
                'name': c_name,
                'start_date': start_d,
                'end_date': end_d,
                'teacher': c_teacher,
                'location': c_location
              })
            }
          }
        });
      }
    }
  } else {
    alert('Error loading tables!');
  }
}

function clop_parse(doc, semester_begin_time, callback) {
  var table = doc.querySelector('body > div > div.middle > div.right > div > div > div.table-container > table > tbody');
  if (table.querySelectorAll('tr') != null) {
    for (var row = 1; row <= table.querySelectorAll('tr').length; row++) {
      var cell = table.querySelector('tr:nth-child('+row+')');
      var c_name = cell.querySelector('td:nth-child(3)').textContent;
      var c_location = cell.querySelector('td:nth-child(4)').textContent;
      var c_seat = cell.querySelector('td:nth-child(5)').textContent;
      var c_week = Number(cell.querySelector('td:nth-child(6)').textContent);
      var c_weekday = cell.querySelector('td:nth-child(7)').textContent;
      var c_time = cell.querySelector('td:nth-child(8)').textContent;
      var start_time = (c_week-1)*604800000+semester_begin_time;
      var end_time = (c_week-1)*604800000+semester_begin_time;
      switch (c_weekday) {
        case "一":
          start_time += 0;
          end_time += 0;
          break;
        case "二":
          start_time += 86400000;
          end_time += 86400000;
          break;
        case "三":
          start_time += 86400000*2;
          end_time += 86400000*2;
          break;
        case "四":
          start_time += 86400000*3;
          end_time += 86400000*3;
          break;
        case "五":
          start_time += 86400000*4;
          end_time += 86400000*4;
          break;
        default:
          break;
      };
      switch (c_time) {
        case "3~4":
          start_time += 36000000;
          end_time += 45000000;
          break;
        case "5~6":
          start_time += 46800000;
          end_time += 55800000;
          break;
        case "7~8":
          start_time += 56400000;
          end_time += 65400000;
          break;
        default:
          break;
      };
      var start_d = new Date(start_time);
      var end_d = new Date(end_time);
      callback({
        'name': c_name,
        'start_date': start_d,
        'end_date': end_d,
        'teacher': c_teacher,
        'location': c_location
      })
    };
  } else {
    alert('Error loading tables!');
  }
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
}

function parse() {
  // Should be improved
  var d = new Date(2015, 9-1, 14); // Be careful with this 
  var csv_header = "Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\n";
  var csv_content = csv_header;
  var callback = function(object) {
    var c_name = object['name'];
    var start_d = object['start_date'];
    var end_d = object['end_date'];
    var c_teacher = object['teacher'];
    var c_location = object['location'];
    csv_content += c_name+','+(start_d.getMonth()+1)+'/'+start_d.getDate()+'/'+start_d.getFullYear()+','+start_d.getHours()%12+':'+('0'+start_d.getMinutes()).slice(-2)+':'+('0'+start_d.getSeconds()).slice(-2)+' '+(start_d.getHours()<12?"AM":"PM")+','+(end_d.getMonth()+1)+'/'+end_d.getDate()+'/'+end_d.getFullYear()+','+end_d.getHours()%12+':'+('0'+end_d.getMinutes()).slice(-2)+':'+('0'+end_d.getSeconds()).slice(-2)+' '+(end_d.getHours()<12?"AM":"PM")+','+'False,\"授课教师:'+c_teacher+'\",\"'+c_location+'\",True\n';
  }
  switch (document.URL) {
  case "http://jwts.hit.edu.cn/kbcx/queryGrkb":
    grkb_parse(document, d.getTime(), callback);
    break;
  case "http://jwts.hit.edu.cn/kbcx/queryXskb":
    xskb_parse(document, d.getTime(), callback);
    break;
  case "http://clop.hit.edu.cn/listBookingInfos.action":
    clop_parse(document, d.getTime(), callback);
    break;
  }
  download("classtable.csv", csv_content);
}

function parse_ics() {
  var d = new Date(2015, 9-1, 14); // Be careful with this 
  var cal = ics();
  var callback = function(object) {
    var c_name = object['name'];
    var start_d = object['start_date'];
    var end_d = object['end_date'];
    var c_teacher = object['teacher'];
    var c_location = object['location'];
    cal.addEvent(c_name, 
      "授课教师:"+c_teacher, 
      c_location, 
      (start_d.getMonth()+1)+'/'+start_d.getDate()+'/'+start_d.getFullYear()+' '+start_d.getHours()%12+':'+('0'+start_d.getMinutes()).slice(-2)+' '+(start_d.getHours()<12?"am":"pm"),
      (end_d.getMonth()+1)+'/'+end_d.getDate()+'/'+end_d.getFullYear()+' '+end_d.getHours()%12+':'+('0'+end_d.getMinutes()).slice(-2)+' '+(end_d.getHours()<12?"am":"pm")
      );
  }
  switch (document.URL) {
  case "http://jwts.hit.edu.cn/kbcx/queryGrkb":
    grkb_parse(document, d.getTime(), callback);
    break;
  case "http://jwts.hit.edu.cn/kbcx/queryXskb":
    xskb_parse(document, d.getTime(), callback);
    break;
  case "http://clop.hit.edu.cn/listBookingInfos.action":
    clop_parse(document, d.getTime(), callback);
    break;
  }
  cal.download("classtable");
}

function insert_btn(node) {
  var element = document.createElement("button");
  element.setAttribute("name", "generate_csv");
  element.setAttribute("id", "csv_btn");
  element.innerText = "生成 CSV 文件";
  // append to node
  node.appendChild(element);
  document.getElementById('csv_btn').addEventListener("click", parse, false);
}

function insert_btn_ics(node) {
  var element = document.createElement("button");
  element.setAttribute("name", "generate_ics");
  element.setAttribute("id", "ics_btn");
  element.innerText = "生成 iCal 文件";
  // append to node
  node.appendChild(element);
  document.getElementById('ics_btn').addEventListener("click", parse_ics, false);
}

function insert_td(node) {
  var td = document.createElement("td");
  var div = document.createElement("div");
  div.setAttribute("class", "addlist_button1 ml15");
  var element = document.createElement("a");
  element.setAttribute("href", "javascript:void(0);");
  element.setAttribute("name", "generate_csv");
  element.setAttribute("id", "csv_btn");
  var text = document.createElement("span");
  text.innerText = "生成 CSV 文件";
  // td > div > a > span
  element.appendChild(text);
  div.appendChild(element);
  td.appendChild(div);
  // append to node
  node.appendChild(td);
  document.getElementById('csv_btn').addEventListener("click", parse, false);
}

function insert_td_ics(node) {
  var td = document.createElement("td");
  var div = document.createElement("div");
  div.setAttribute("class", "addlist_button1 ml15");
  var element = document.createElement("a");
  element.setAttribute("href", "javascript:void(0);");
  element.setAttribute("name", "generate_ics");
  element.setAttribute("id", "ics_btn");
  var text = document.createElement("span");
  text.innerText = "生成 iCal 文件";
  // td > div > a > span
  element.appendChild(text);
  div.appendChild(element);
  td.appendChild(div);
  // append to node
  node.appendChild(td);
  document.getElementById('ics_btn').addEventListener("click", parse_ics, false);
}

NodeList.prototype.forEach = Array.prototype.forEach;
switch (document.URL) {
case "http://jwts.hit.edu.cn/kbcx/queryXskb":
case "http://jwts.hit.edu.cn/kbcx/queryGrkb":
  if (document.querySelector("#queryform > table > tbody > tr") != null) {
    insert_td(document.querySelector("#queryform > table > tbody > tr"));
    insert_td_ics(document.querySelector("#queryform > table > tbody > tr"));
  }
  break;
case "http://clop.hit.edu.cn/listBookingInfos.action":
  if (document.querySelector('body > div > div.middle > div.right > div') != null) {
    insert_btn(document.querySelector('body > div > div.middle > div.right > div'));
    insert_btn_ics(document.querySelector('body > div > div.middle > div.right > div'));
  }
  break;
}