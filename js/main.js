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
						if (match[3] == undefined)
							var step = 1;
						else
							var step = 2;
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

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
}

function parse() {
	var d = new Date(2014,8,8);
	if (document.URL == "http://xscj.hit.edu.cn/hitjwgl/xs/kbcx_bx.asp") {
		classtable_parse(document, d.getTime(), "Subject,Start Date,Start Time,End Date,End Time,All Day Event,Description,Location,Private\n");
	}
}

function insert_btn(node) {
	var element = document.createElement("button");
	element.setAttribute("name", "generate_csv");
	element.setAttribute("id", "csv_btn");
	element.innerText = "Click Me!";
	node.appendChild(element);
}

if (document.URL == "http://xscj.hit.edu.cn/hitjwgl/xs/kbcx_bx.asp") {
	if (document.querySelector('#spacemain > div.center > table:nth-child(3)') != null) {
		insert_btn(document.querySelector('#spacemain > div.center > table:nth-child(3)'));
		document.getElementById('csv_btn').onclick = parse();
	}
}