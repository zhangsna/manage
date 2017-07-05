
	/*对模态框操作，下拉菜单*/
	$("#tb").on("click",".btn",function(){
		var next=$(this).parent().next();
		var attr=next.css("display");
		if(attr=="block"){
    		next.hide()
	    }else{
	    	$(this).parents("tr").siblings().find(".select").hide();
	    	next.show()
	    }
	})
	$("#tb").on("click","span",function(){
		var text=$(this).text();
		$(this).parents(".input-group").children(".form-control").val(text);
		$(this).parent().hide();
	}).on("mouseover","span",function(){
			$(this).css("background","#ccc");
		}).on("mouseout","span",function(){
			$(this).css("background","none");
		})
	
