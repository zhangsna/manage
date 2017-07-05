$(function () {
    //iCheck for checkbox and radio inputs
    $('input[type="checkbox"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    //view model
    var view = function () {
        var self = this;
   
        //open setting
        self.openSetting = function () {
            alert(89)
            $('.my-modal-setting').modal('show');
        };
        //open Archives
        self.openArchives = function () {
            window.location.href = 'Monitor/Archives';
        };
    };
    var viewModel = new view();
    //ko.applyBindings(viewModel);
});

//筛选功能
$(function () {
    //点击让其展示出列表 默认让其都隐藏
    $(".box tr.parent").click(function () {
        $(this)
            .toggleClass("selected")
            .siblings(".child_" + this.id).stop().toggle();
    }).click();//此行代码表示要立即执行
    //设置列表查询
    $("#filterName").keyup(function () {
        $("table tbody tr").stop().hide() //将tbody中的tr都隐藏
            .filter(":contains('" + ($(this).val()) + "')").show(); //，将符合条件的筛选出来
    });
});


//渲染table表单,和点击分页
var app = new Vue({
    el: "#app",
    data: {
        tabData: [],
        arr: [],
        index: 1,
        num: 5,
        len: "",
        end: "",
        pageSize: null,
        tabList: "",
        name: "",
        branch: "",
        project: "",
        content: "",
        start: ""
    },
    created() {
        this.$http.get("../data/monitorData.json")
            .then(function (data) {
                this.tabData = data.body.tabData;
                let len = this.tabData.length;
                this.len = len;
                this.pageSize = Math.ceil(len / this.num);
                for (var i = 0; i < this.pageSize; i++) {

                    this.arr.push(i + 1);
                }
                //init pagination
                this.go(1);
                this.pages();

            });
    },
    updated() {
        //this.tabList.updated();
    },
    methods: {
        pages() {
            this.end = this.index * this.num;
            this.start = (this.index - 1) * this.num + 1;
        },
        mouseover() {
            alert(211);
        },
        prev() {
            if (this.index <= 1) return;
            this.go(--this.index)
            this.pages()
        },
        next() {
            if (this.index >= this.pageSize) return;
            this.go(++this.index)
            this.pages()
        },
        go(ind) {
            if (ind == 1) {
                $(".prevLi").addClass("disabled")
            } else {
                $(".prevLi").removeClass("disabled")
            }
            if (ind == this.pageSize) {
                $(".nextLi").addClass("disabled")
            } else {
                $(".nextLi").removeClass("disabled")
            }
            //console.log(ind)
            this.index = ind;
            let times = (ind - 1) * this.num;
            //console.log(times)
            var data = this.tabData.slice(times, this.num * ind);

            this.tabList = data;
            //console.log(this.tabList)
            this.pages()
        }
    }
})


/*对模态框操作，添加去除*/
function add() {
    var trs = $("#tb tr"),str="";
    if (trs.length <= 8) {
        $("#tb .remove").eq(0).show();
        str+=`<tr>           
                <td style="width:100px;">
                    <input type="text" class="form-control" placeholder="类别" />
                </td>
                <td>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="相关表单">
                        <div class="input-group-btn">
                            <button onclick="select()"  class="btn btn-default"><i class="fa fa-paperclip"></i></button>
                        </div>
                        <div class="select">
                            <span>1111111</span>
                            <span>2222222</span>
                            <span>3333333</span>
                        </div>
                    </div>
                </td>
                <td style="width:220px;">
                    <div class="input-group">
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                        <input type="text" class="form-control" placeholder="具体日期范围">
                    </div>
                </td>
                <td class="text-center" style="vertical-align:middle;width:80px;">
                    <a href="#" onclick="add()"><i class="fa fa-fw fa-plus add"></i></a>&nbsp;
                    <a href="#" onclick="del(this)"><i class="fa fa-fw fa-minus remove"></i></a>
                </td>
            </tr>`;
            $("#tb").append(str);
    } else {
        //trObj.innerHTML = ' <td style="width:100px;"><input type="text" class="form-control" value="检验批" /></td> <td><div class="input-group"><input type="text" class="form-control" placeholder="相关表单" value="质量验收记录"><div class="input-group-btn"><button class="btn btn-default"><i class="fa fa-paperclip"></i></button></div></div></td><td style="width:220px;"><div class="input-group"><div class="input-group-addon"><i class="fa fa-calendar"></i></div><input type="text" class="form-control" value="2017-01-01 到 2017-03-01"></div></td><td class="text-center" style="vertical-align:middle;width:80px;"><a href="#" onclick="add()"><i class="fa fa-fw fa-plus add"></i></a>&nbsp;<a href="#" onclick="del(this)"><i class="fa fa-fw fa-minus remove"></i></a></td>';
        //document.getElementById("tb").appendChild(trObj);
    }
}

function del(obj) {
    var trs = $("#tb tr");
    var row=$(obj).parents("tr");
    if (trs.length <=2) {
       $("#tb .remove").eq(0).hide();
       $("#tb tr").eq(1).remove();
        return;
    } else {
        row.remove();
    }
}

