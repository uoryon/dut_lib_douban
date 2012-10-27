var $ = function(sel){
    return document.querySelectorAll(sel);
  }
var basicLink = "http://opac.lib.dlut.edu.cn/opac/";
~function ac(){
  var changeDom = function(res){
    return 0;
  }
  var isbn = "";
  isbn = $("#info")[0].innerText.split("ISBN: ")[1];
  var bookISBN = isbn.substring(0,3) + '-' + isbn.substring(3, 4) + '-' + isbn.substring(4, 8) + '-' + isbn.substring(8, 12) + '-' + isbn.substring(12, 13);
  var bookISBN = "strSearchType=isbn&strText=" + bookISBN;
  send(bookISBN, useISBN);
}();

function send(s_data,callback){
  var cor = new XMLHttpRequest();
  cor.onreadystatechange = function(){
    if(cor.readyState == 4){
      if(cor.status>=200 && cor.status < 300){
        callback(cor.response);
      }
    }
  }
  cor.open("get",basicLink + "openlink.php?" + s_data, true);
  cor.send(null); 
}
function useISBN(data){
  var full = data.split('strong')[16];
  var canGet = data.split('strong')[18];
  var aside = $('.aside')[0];
  if(full == undefined && canGet == undefined){
    useBookName();
    var lalala = document.createElement("div");
    lalala.setAttribute("class", "gray_ad");
    lalala.innerHTML = "<h2>在大工图书馆的情况?~~~</h2>\
                        <ul class=\"bs_noline\"> \
                        <li>学校没有这本书哦～</li>\
                        </ul>";
    aside.insertBefore(lalala, aside.childNodes[5]);
    
  }
  else{
    full = full[1], canGet = canGet[1];
    var itemlink = data.split('item.php?marc_no=')
    var lalala = document.createElement("div");
    lalala.setAttribute("class", "gray_ad");
    lalala.innerHTML = "<h2>在大工图书馆的情况?~~~</h2>\
                        <ul class=\"bs_noline\"> \
                          <li><a target=\"_blank\" href=\"" + basicLink + "item.php?marc_no=" +itemlink[1].split(">")[0] +"\"> 去看看</a></li>\
                          <li>馆藏副本" + full + "</li>\
                          <li>可借副本" + canGet + "</li>\
                        </ul>";
    aside.insertBefore(lalala, aside.childNodes[5]);
  }
}

function useBookName(){
  var bookName = document.querySelectorAll("title")[0].innerText.split("(")[0];
  bookName = "strSearchType=title&strText=" + bookName;
  send(bookName, function(data){ 
    var itemlink = data.split('item.php?marc_no=')
    var aside = $('.aside')[0];
    if(itemlink == undefined){
      var lalala = document.createElement("div");
      lalala.setAttribute("class", "gray_ad");
      lalala.innerHTML = "<h2>在大工图书馆的情况?~~~</h2>\
                          <ul class=\"bs_noline\"> \
                          <li>学校应该没有这本书哦～</li>\
                          </ul>";
      aside.insertBefore(lalala, aside.childNodes[5]);
    
    }
    else{
      var lalala = document.createElement("div");
      lalala.setAttribute("class", "gray_ad");
      lalala.innerHTML = "<h2>在大工图书馆的情况?~~~</h2>\
                          <ul class=\"bs_noline\"> \
                          <li>这本书没有，有相似的书籍（去看看？)</li>";
      for(var i = 1; i < itemlink.length; i++){
        lalala.innerHTML += "<li><a target=\"_blank\" href=\"" + basicLink + "item.php?marc_no=" + itemlink[i].split(">")[0] +"\">" + bookName.split("strText=")[1] + "</a></li>"; 
      }
      lalala.innerHTML += "</ul>";
      aside.insertBefore(lalala, aside.childNodes[5]);
    }

  });
}
