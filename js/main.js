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
							// Hacking fucking different language
							// csv_content += c_name+','+start_d.toLocaleString().replace(" ",",")+','+end_d.toLocaleString().replace(" ",",")+','+'False,\"授课教师:'+teacher+'\",\"'+location+'\",True\n';
							csv_content += c_name+','+(start_d.getMonth()+1)+'/'+start_d.getDate()+'/'+start_d.getFullYear()+','+start_d.getHours()%12+':'+('0'+start_d.getMinutes()).slice(-2)+':'+('0'+start_d.getSeconds()).slice(-2)+' '+(start_d.getHours()<12?"AM":"PM")+','+(end_d.getMonth()+1)+'/'+end_d.getDate()+'/'+end_d.getFullYear()+','+end_d.getHours()%12+':'+('0'+end_d.getMinutes()).slice(-2)+':'+('0'+end_d.getSeconds()).slice(-2)+' '+(end_d.getHours()<12?"AM":"PM")+','+'False,\"授课教师:'+teacher+'\",\"'+location+'\",True\n';
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
			// csv_content += c_name+','+start_d.toLocaleString().replace(" ",",")+','+end_d.toLocaleString().replace(" ",",")+','+'False,\"座位号:'+c_seat+'\",\"'+c_location+'\",True\n';
			csv_content += c_name+','+(start_d.getMonth()+1)+'/'+start_d.getDate()+'/'+start_d.getFullYear()+','+start_d.getHours()%12+':'+('0'+start_d.getMinutes()).slice(-2)+':'+('0'+start_d.getSeconds()).slice(-2)+' '+(start_d.getHours()<12?"AM":"PM")+','+(end_d.getMonth()+1)+'/'+end_d.getDate()+'/'+end_d.getFullYear()+','+end_d.getHours()%12+':'+('0'+end_d.getMinutes()).slice(-2)+':'+('0'+end_d.getSeconds()).slice(-2)+' '+(end_d.getHours()<12?"AM":"PM")+','+'False,\"座位号:'+c_seat+'\",\"'+c_location+'\",True\n';
		};
	};
	download("clop.csv", csv_content);
}

function registered_parse(doc, semester_begin_time, csv_content, type) {
	var tables = doc.querySelectorAll('#spacemain > div.center > table > tbody > tr:nth-child(2) > td > table');
	if (tables.length > 1 && type < tables.length) {
		var table = tables[type];
		var header = table.querySelectorAll('tbody > tr:nth-child(1) > td');
		var index_dict = {};
		for (var i = 0; i < header.length; i++) {
			if (/课程名|上课项目/.test(header[i].textContent)) {
				index_dict.c_name = i+1;
			} else if (/授课教师/.test(header[i].textContent)) {
				index_dict.c_teacher = i+1;
			} else if (/起止周/.test(header[i].textContent)) {
				index_dict.c_week = i+1;
			} else if (/上课时间与教室/.test(header[i].textContent)) {
				index_dict.c_tl = i+1;
			}
		};
		var contents = doc.querySelectorAll('#spacemain > div.center > table > tbody > tr:nth-child(2) > td > table:nth-child('+(type/2*3)+') > tbody > tr');
		for (var i = 1; i < contents.length; i++) {
			var c_name = contents[i].querySelector('td:nth-child('+index_dict.c_name+')').textContent;
			var c_teacher = contents[i].querySelector('td:nth-child('+index_dict.c_teacher+')').textContent;
			var c_week = contents[i].querySelector('td:nth-child('+index_dict.c_week+')').textContent;
			var c_tl = contents[i].querySelector('td:nth-child('+index_dict.c_tl+')');
			var start_week = Number(c_week.split('-')[0]);
			var end_week = Number(c_week.split('-')[1]);
			var tls = c_tl.querySelectorAll('table > tbody > tr');
			for (var j = 0; j < tls.length; j++) {
				///^(单|双)?((\p{Han}+)([\d]+)-([\d]+).*节)\s?((\p{Han}+|[\w]+)([\d]+))?$/
				var match = /^(单?)周(.)(\d+-\d+).*节(\s+(.+$))?/.exec(tls[j].querySelector('td').textContent).reverse();
				var c_location = match[0] == undefined ? "网上查询" : match[0];
				if (match[4] == "单") {
					var step = 2;
				} else {
					var step = 1;
				}
				for (var w = start_week; w <= end_week; w+=step) {
					var week_base = (w-1)*604800000+semester_begin_time;
					var start_time = 0;
					var end_time = 0;
					if (/(实践|实验)+/.test(c_name)) {
						switch (match[2]) {
							case "1-2":
								start_time += 26400000;
								end_time += 35400000;
								break;
							case "3-4":
								start_time += 36000000;
								end_time += 45000000;
								break;
							case "5-6":
								start_time += 46800000;
								end_time += 55800000;
								break;
							case "7-8":
								start_time += 56400000;
								end_time += 65400000;
								break;
							case "9-10":
								start_time += 66600000;
								end_time += 75600000;
								break;
							default:
								break;
						}
					} else {
						switch (match[2]) {
							case "1-2":
								start_time += 28800000;
								end_time += 35100000;
								break;
							case "3-4":
								start_time += 36000000;
								end_time += 42300000;
								break;
							case "5-6":
								start_time += 49500000;
								end_time += 55800000;
								break;
							case "7-8":
								start_time += 56700000;
								end_time += 63000000;
								break;
							case "9-11":
								start_time += 66600000;
								end_time += 73800000;
								break;
							default:
								break;
						}
					}
					switch (match[3]) {
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
						case "六":
							start_time += 86400000*5;
							end_time += 86400000*5;
							break;
						case "日":
							start_time += 86400000*6;
							end_time += 86400000*6;
							break;
						default:
							break;
					}
					var start_d = new Date(start_time+week_base);
					var end_d = new Date(end_time+week_base);
					csv_content += c_name+','+(start_d.getMonth()+1)+'/'+start_d.getDate()+'/'+start_d.getFullYear()+','+start_d.getHours()%12+':'+('0'+start_d.getMinutes()).slice(-2)+':'+('0'+start_d.getSeconds()).slice(-2)+' '+(start_d.getHours()<12?"AM":"PM")+','+(end_d.getMonth()+1)+'/'+end_d.getDate()+'/'+end_d.getFullYear()+','+end_d.getHours()%12+':'+('0'+end_d.getMinutes()).slice(-2)+':'+('0'+end_d.getSeconds()).slice(-2)+' '+(end_d.getHours()<12?"AM":"PM")+','+'False,\"授课教师:'+c_teacher+'\",\"'+c_location+'\",True\n';
				}
			};
		};
	};
	return csv_content;
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
	} else if (document.URL == "http://xscj.hit.edu.cn/hitjwgl/xs/kcxx/CXJG.asp") {
		var form = document.querySelectorAll('#spacemain > div.center > table > tbody > form > input[type="checkbox"]');
		var csv_content = "Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\n";
		Array.prototype.forEach.call(form, function(el){
			if (el.checked) {
				var i = Number(/_(\d+)$/.exec(el.id)[1]);
				csv_content = registered_parse(document, d.getTime(), csv_content, i);
			}
		});
		download("registered.csv", csv_content);
	};
}

function insert_btn(node) {
	var element = document.createElement("button");
	element.setAttribute("name", "generate_csv");
	element.setAttribute("id", "csv_btn");
	element.innerText = "生成CSV文件";
	node.appendChild(element);
}

function insert_ckboxes(node) {
	var tables = document.querySelectorAll('#spacemain > div.center > table > tbody > tr:nth-child(2) > td > table');
	if (tables.length > 1) {
		var form = document.createElement("form");
		for (var i = 1; i < tables.length; i+=2) {
			var element = document.createElement("input");
			element.setAttribute("type", "checkbox");
			element.setAttribute("id", 'regid_'+(i+1));
			if (/创新实验课/.test(tables[i].querySelector('tbody > tr > td > div > span').textContent)) {
				element.setAttribute("disabled", "true");
			};
			form.appendChild(element);
			var label = document.createElement("label")
			label.setAttribute("for", 'regid_'+(i+1));
			label.innerHTML = tables[i].querySelector('tbody > tr > td > div > span').textContent;
			form.appendChild(label);
		}
		node.appendChild(form);
	};
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
} else if (document.URL == "http://xscj.hit.edu.cn/hitjwgl/xs/kcxx/CXJG.asp") {
	if (document.querySelector('#spacemain > div.center > table > tbody') != null) {
		insert_btn(document.querySelector('#spacemain > div.center > table > tbody'));
		insert_ckboxes(document.querySelector('#spacemain > div.center > table > tbody'));
		document.getElementById('csv_btn').addEventListener("click", parse, false);
	}
}