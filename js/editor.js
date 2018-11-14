function emphasis(match, p1, p2) {
  var index = p1.lastIndexOf(p2);
  if (index != -1 && index + p2.length == p1.length) {
    var cut_empStr = p1.slice(0, index);
    return cut_empStr + '<span class=\"emp \">' + p2 + '</span>';
  }
  return match;
}

function ruby(match, p1, p2) {
  return '<ruby>' + p1 + '<rt>' + p2 + '</rt></ruby>';
}

function strong(match, p1, p2) {
  var index = p1.lastIndexOf(p2);
  if (index != -1 && index + p2.length == p1.length) {
    var cut_empStr = p1.slice(0, index);
    return cut_empStr + '<strong>' + p2 + '</strong>';
  }
  return match;
}

function title(match, p1, p2, string) {
  var index = p1.lastIndexOf(p2);
  if (index != -1 && index + p2.length == p1.length) {
    var cut_empStr = p1.slice(0, index);
    return cut_empStr + '<span class=\"' + string + '\">' + p2 + '</span>';
  }
  return match;
}

function primaryTitle(match, p1, p2) {
  return title(match, p1, p2, "primaryTitle");
}

function middleTitle(match, p1, p2) {
  return title(match, p1, p2, "middleTitle");
}

function subTitle(match, p1, p2) {
  return title(match, p1, p2, "subTitle");
}

function getDocument() {
  return $(document);
}

$(function () {
  marked.setOptions({ breaks: true });
  $('#editor').keyup(function () {
    var src = $(this).val();
    var html = marked(src);

    html = html.replace(/[｜](.+?)《(.+?)》/g, ruby);
    html = html.replace(/(.+?)［＃「(.+?)」に傍点］/g, emphasis);
    html = html.replace(/(.+?)［＃「(.+?)」は太字］/g, strong);
    html = html.replace(/(.+?)［＃「(.+?)」は大見出し］/g, primaryTitle);
    html = html.replace(/(.+?)［＃「(.+?)」は中見出し］/g, middleTitle);
    html = html.replace(/(.+?)［＃「(.+?)」は小見出し］/g, subTitle);
    html = html.replace(/\r?\n/g, '<br />');
    $('#result').html(html);
  });

  $('.contain').on('click', function (event) {
    event.preventDefault();
    $(this).toggleClass('vertical');
    console.log("switched view.");
  });

  $('#toPDF').click(function () {
    console.log("click");
    previewWindow = window.open('preview.html', "preview");
    var html = $('#result').html();
    console.log(html);
  });
});
