(function(){
	var navigatorModule = avalon.define({
		$id : "_navigatorCtrl",
		"navigators" : [
			{"label" : "进货记录", "relPannelId" : "importInfoPannel", "isActive" : false},
			{"label" : "库存查询", "relPannelId" : "stockInfoPannel", "isActive" : false},
			{"label" : "出货记录", "relPannelId" : "sellingPannel", "isActive" : false}
		],
		"table" : {},
		"model" : {
			"rows" : [],
			"queryConditions" : []
		},
		"menuSelection" : function(index){
			avalon.vmodels._navigatorCtrl.table = {};
			var navigators = avalon.vmodels._navigatorCtrl.navigators;
			for(var i = 0; i < navigators.length; i++){
				if(i === index){
					navigators[i].isActive = true;
				}else{
					navigators[i].isActive = false;
				}
			}
			$.ajax({
				"method" : "post",
				"url" : "data/tableDefine.json",
				"success" : function(data){
					for(var i = 0; i < data.tables.length; i++){
						var currentTable = data.tables[i];
						if(currentTable.pannelId === navigators[index].relPannelId){
							if(!!currentTable.rowOperating && currentTable.rowOperating.length > 0){
								var operatingRow = {
									"columnName" : "#operation",
									"label" : "操作",
									"type" : "#button"
								}
								currentTable.tableHeadings.push(operatingRow);
							}
							avalon.vmodels._navigatorCtrl.table = currentTable;
						}
					}
				}
			});
		}
	});
	
	avalon.scan(document.body,navigatorModule);
	
	$($("ul li[role=presentation]")[0]).click();
})();