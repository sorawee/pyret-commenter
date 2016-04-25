function run(){
  cm = $('.CodeMirror').first()[0];
  if(cm == undefined){
    setTimeout(run, 1000);
  }else{  
    $('body').keypress('/', function(e){
      if(e.ctrlKey){
        var start = cm.getCursor("from").line;
        var end = cm.getCursor("to").line;
        var lines = cm.getValue().split("\n");
        var has_content = false;
        for(var i = start; i <= end; i++){
          if(!/\s*#/.test(lines[i])){
            has_content = true;
            break;
          }
        }
        if(has_content){
          for(var i = start; i <= end; i++){
            lines[i] = "# " + lines[i];
          }
        }else{
          for(var i = start; i <= end; i++){
            lines[i] = lines[i].replace(/ *#*/, "");
          }
        }
        cm.setValue(lines.join("\n"));
        cm.setSelection(
          {line: start, ch: 0},
          {line: end, ch: lines[end].length}
        );
        for(var i = cm.lineCount() - 1; i >= 0 ; i--){
          cm.indentLine(i, "smart");
        }
      }
    });
  }
}

setTimeout(run, 1000);