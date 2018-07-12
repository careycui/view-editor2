import XLSX from 'xlsx'
import Clipboard from './clipboard'

export const fileReader = (file) => {
	return new Promise((resolve, reject) => {
		var excelData = [];
	    var i,f=file;
	    var reader = new FileReader();
	    var fileName = f.name;
	    reader.onload = function(e) {
	    	try{
		        var data = e.target.result;
		        var workbook = XLSX.read(data, {type: 'binary'});
		        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
		        var MergerUnit = {};
		        var mergers = worksheet['!merges'];
		        for(var i = 0, len = mergers.length; i < len ; i++){
		            MergerUnit['c'+mergers[i].s.c+'r'+mergers[i].s.r] = {cols:(mergers[i].e.c-mergers[i].s.c)+1,rows:(mergers[i].e.r-mergers[i].s.r)+1};
		        }

		        for (var z in worksheet) {
		            if(XLSX.utils.decode_cell(z).r>-1 && XLSX.utils.decode_cell(z).c >-1){
		                var lineNum = z.match(/\d+/g)[0] -1;
		                if(lineNum > -1){
		                    if(!excelData[lineNum]){
		                        excelData[lineNum] = [];
		                    }
		                    var singleUnit = {
		                        name: z,
		                        position: XLSX.utils.decode_cell(z),
		                        value: worksheet[z].v
		                    };
		                    var unitMerge = 'c'+XLSX.utils.decode_cell(z).c+'r'+XLSX.utils.decode_cell(z).r;
		                    if(MergerUnit[unitMerge]){
		                        singleUnit['unitMerge'] = MergerUnit[unitMerge];
		                    }else{
		                        singleUnit['unitMerge'] = {cols: 1,rows: 1};
		                    }
		                    /* all keys that do not begin with "!" correspond to cell addresses */
		                    if(z[0] === '!') continue;
		                    excelData[lineNum].push(singleUnit);
		                }
		            }
		        }
	        	resolve(excelData);
	    	}catch(error){
	    		reject(error);
	    	}
	    };
	    reader.readAsBinaryString(f);
	});
}

export const readerTableData = (num, excelData, fileName) => {
	var mobileData = [];
    for(var k=0; k<excelData.length; k++){
		if(excelData[k]){
			mobileData[k] = excelData[k].slice();
		}
        
    }
    var aData = [];
    var bData = [];
    for(var i = mobileData.length-1; i >=0 ; i--){
        for(var j= mobileData[i].length-1; j >= 0; j--){
            var indexNum = mobileData[i][j].name.match(/\d+/gi)[0]-1;
            if(mobileData[i][j].name.indexOf('A')>-1){
                aData[indexNum] = mobileData[i][j];
                mobileData[i].splice(j,1);
            }
            if(num != 1){
                try{
                    if(mobileData[i][j].name.indexOf('B')>-1){
                        bData[indexNum] = mobileData[i][j];
                        mobileData[i].splice(j,1);
                    }
                }catch(e){

                }

            }
        }
    }

    return {
    	excelData:excelData,
    	aData: aData,
    	bData: bData,
    	mobileData:mobileData,
    	fileName: fileName
    }
}

//复制按钮
const options = {
    "indent":"auto",
    "indent-spaces":2,
    "wrap":80,
    "markup":true,
    "output-xml":false,
    "numeric-entities":true,
    "quote-marks":true,
    "quote-nbsp":false,
    "show-body-only":true,
    "quote-ampersand":false,
    "break-before-br":true,
    "uppercase-tags":false,
    "uppercase-attributes":false,
    "drop-font-tags":true,
    "tidy-mark":false
};

export const copy = (btn, copyObj, name) => {
	const clipboard = new Clipboard(btn,{
        text: function(){
            return tidy_html5(document.querySelector(copyObj).innerHTML,options);
        }

    });

    clipboard.on('success', function(e) {
        alert(name+'端复制成功');
    });

    clipboard.on('error', function(e) {
        alert(name+'端复制失败');
    });
}