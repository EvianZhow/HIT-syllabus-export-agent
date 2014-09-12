function classtable_parse(doc, semester_begin_time, csv_content) {
	var table = doc.querySelector('#spacemain > div.center > table:nth-child(2)');
	for (var row = 2; row <= 6; row++) {
		for (var col = 2; col <= 8; col++) {
			var table_unit = table.querySelector('tbody > tr:nth-child('+row+') > td:nth-child('+col+') > table');
			if (table_unit.querySelectorAll('tbody > tr') != null) {
				for (var i = 1; i < table_unit.querySelectorAll('tbody > tr').length; i+=4) {
					var c_name = table_unit.querySelector('tbody > tr:nth-child('+i+') > td > span').textContent;
					var c_tl = table_unit.querySelector('tbody > tr:nth-child('+(i+1)+') > td > span').textContent;
					var c_week = table_unit.querySelector('tbody > tr:nth-child('+(i+2)+') > td > span').textContent;
					if (/^\[[\d]+\]+周考试.*/.test(c_name))
						continue;
					else {
						var teacher = c_tl.split('　')[0].replace(" ","");
						var location = c_tl.split('　')[1];
						var match = /(\d+)-(\d+)周\s*(\(单\))?/.exec(c_week);
						var start_week = Number(match[1]);
						var end_week = Number(match[2]);
						var start_time = (col-2)*86400000;
						var end_time = (col-2)*86400000;
						if (/(实践|实验)+/.test(c_name)) {
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
								default:
									break;
							}
						}
						if (match[3] == undefined)
							var step = 1;
						else
							var step = 2;
						// Generate CSV Code below
						for (var j = start_week; j <= end_week; j+=step) {
							var week_base = (j-1)*604800000+semester_begin_time;
							var start_d = new Date(week_base+start_time);
							var end_d = new Date(week_base+end_time);
							csv_content += c_name+','+start_d.toLocaleString().replace(" ",",")+','+end_d.toLocaleString().replace(" ",",")+','+'False,\"授课教师:'+teacher+'\",\"'+location+'\",True\n';
						};
					}
				};
			};
		};
	};
	download("classtable.csv", csv_content);
}

function clop_parse(doc, semester_begin_time, csv_content) {
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
			// Generate CSV Code below
			var start_d = new Date(start_time);
			var end_d = new Date(end_time);
			csv_content += c_name+','+start_d.toLocaleString().replace(" ",",")+','+end_d.toLocaleString().replace(" ",",")+','+'False,\"座位号:'+c_seat+'\",\"'+c_location+'\",True\n';
		};
	};
	download("clop.csv", csv_content);
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
}

function parse() {
	// Should be improved
	var d = new Date(2014,8,8);
	if (document.URL == "http://xscj.hit.edu.cn/hitjwgl/xs/kbcx_bx.asp") {
		classtable_parse(document, d.getTime(), "Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\n");
	} else if (document.URL == "http://clop.hit.edu.cn/listBookingInfos.action") {
		clop_parse(document, d.getTime(), "Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\n");
	}
}

function insert_btn(node) {
	var element = document.createElement("button");
	element.setAttribute("name", "generate_csv");
	element.setAttribute("id", "csv_btn");
	element.innerText = "生成CSV文件";
	node.appendChild(element);
}

if (document.URL == "http://xscj.hit.edu.cn/hitjwgl/xs/kbcx_bx.asp") {
	if (document.querySelector('#spacemain > div.center > table:nth-child(3)') != null) {
		insert_btn(document.querySelector('#spacemain > div.center > table:nth-child(3)'));
		document.getElementById('csv_btn').addEventListener("click", parse, false);
	}
} else if (document.URL == "http://clop.hit.edu.cn/listBookingInfos.action") {
	if (document.querySelector('body > div > div.middle > div.right > div') != null) {
		insert_btn(document.querySelector('body > div > div.middle > div.right > div'));
		document.getElementById('csv_btn').addEventListener("click", parse, false);
	}
}