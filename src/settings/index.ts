import { Library } from "../Library";

$(function(){
    
    const update = ()=>{
        fetch("/api/v1/getVoteTitle").then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const data = json;
            $(".title").val(data.title);
            $(".current-title").html(data.title);
        });


        fetch("/api/v1/getVoteType_s").then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const data = json;
            $(".data-group").html("");
            $(".current").html("");
            $(".oneline").val(data["oneLine"]);
            Object.keys(data["data"]).forEach(key => {
                const element = data["data"][key];
                $(".data-group").append(
                    $('<div class="data"></div>')
                    .append(
                        $('<input class="text inline" type="text" placeholder="項目を入力...">').val(element["text"])
                    ).append(
                        $('<input class="color inline" type="color">').val(element["color"])
                    ).append(
                        $('<input class="back-color inline" type="color">').val(element["backColor"])
                    ).append(
                        $('<div class="cross">✕</div>')
                    )
                );
                $(".current").append(
                    $('<div class="data"></div>').html(element["text"]).css("color",element["color"]).css("background-color", element["backColor"])
                    );
            });
        });
    }
    update();

    $(".btn.send").on({
        "click":()=>{
            let data = [];
            $(".data-group .data").each((i, elm)=>{
                if($(elm).find(".text").val() == "") return;
                data.push({
                    text: $(elm).find(".text").val(),
                    color: $(elm).find(".color").val(),
                    backColor: $(elm).find(".back-color").val()
                });
            });
            fetch("/api/v1/setVoteType",{
                method: 'POST', // or 'PUT'
                body: JSON.stringify({data: data}),
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((rep)=>{
                if(rep.ok) update();
            });
        }
    });

    $(".btn.title-update").on({
        "click":()=>{
            let data = $(".title").val().toString();
            fetch("/api/v1/setVoteTitle",{
                method: 'POST', // or 'PUT'
                body: JSON.stringify({data: data}),
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((rep)=>{
                if(rep.ok) update();
            });
        }
    });

    $(".btn.oneline-update").on({
        "click":()=>{
            let data = $(".oneline").val().toString();
            fetch("/api/v1/setOneline",{
                method: 'POST', // or 'PUT'
                body: JSON.stringify({data: data}),
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((rep)=>{
                if(rep.ok) update();
            });
            
        }
    });

    $(".btn.update").on({
        "click":update
    });

    $(".btn.add").on({
        "click":()=>{
            $(".data-group").append($('<div class="data"><input class="text inline" type="text" placeholder="項目を入力..."><input class="color inline" type="color"><input class="back-color inline" type="color" value="#FFFFFF"><div class="cross">✕</div></div>'));
        }
    });

    $(".btn.allclear").on({
        "click":()=>{
            $(".data-group").html("").append($('<div class="data"><input class="text inline" type="text" placeholder="項目を入力..."><input class="color inline" type="color"><input class="back-color inline" type="color" value="#FFFFFF"><div class="cross">✕</div></div>'));
        }
    });

    $(document).on("click",".data-group .data .cross",(e)=>{
        $(e.target).parent().remove();
    });

    $(".btn.reset").on({
        "click":(e)=>{
            const target = e.target;
            fetch("/api/v1/resetVoteData",{
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    data: "dummy"
                }),
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((rep)=>{
                console.log(rep.json());
                if(rep.ok) {
                    update();
                    Library.dialog("リセットしました。", false, 400);
                }            
            });
        }
    });

    $(".btn.start, .btn.stop").on({
        "click":(e)=>{
            const target = e.target;
            fetch("/api/v1/setSettings",{
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    data: {
                        canVote: $(target).hasClass("start")
                    }
                }),
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((rep)=>{
                console.log(rep.json());
                if(rep.ok) {
                    update();
                    Library.dialog("変更しました。", false, 400);
                }            
            });
        }
    });

    $(".btn.show, .btn.hide").on({
        "click":(e)=>{
            const target = e.target;
            fetch("/api/v1/setSettings",{
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    data: {
                        viewOBS: $(target).hasClass("show")
                    }
                }),
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((rep)=>{
                console.log(rep.json());
                if(rep.ok) {
                    update();
                    Library.dialog("変更しました。", false, 400);
                }            
            });
        }
    });

    $(".btn.data-show, .btn.data-hide").on({
        "click":(e)=>{
            const target = e.target;
            fetch("/api/v1/setSettings",{
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    data: {
                        viewData: $(target).hasClass("data-show")
                    }
                }),
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((rep)=>{
                console.log(rep.json());
                if(rep.ok) {
                    update();
                    Library.dialog("変更しました。", false, 400);
                }            
            });
        }
    });

    $(".btn.canChange, .btn.notChange").on({
        "click":(e)=>{
            const target = e.target;
            fetch("/api/v1/setSettings",{
                method: 'POST', // or 'PUT'
                body: JSON.stringify({
                    data: {
                        voteChange: $(target).hasClass("canChange")
                    }
                }),
                headers:{
                  'Content-Type': 'application/json'
                }
            }).then((rep)=>{
                console.log(rep.json());
                if(rep.ok) {
                    update();
                    Library.dialog("変更しました。", false, 400);
                }
            });
        }
    });

});