function updateAllExceptFor(str, exception) {
  var encoding = getEncodingFromForm();
  if (exception != "str") {
    document.getElementById("string").value = str;
  }
  if (exception != "utf16-escape") {
    document.getElementById("utf16-escape").value = escapeToUtf16(str);
  }
  if (exception != "utf32-escape") {
    document.getElementById("utf32-escape").value = escapeToUtf32(str);
  }
  if (exception != "numref-dec") {
    document.getElementById("numref-dec").value = escapeToNumRef(str, 10);
  }
  if (exception != "numref-hex") {
    document.getElementById("numref-hex").value = escapeToNumRef(str, 16);
  }
  if (exception != "punycode") {
    document.getElementById("punycode").value = escapeToPunyCode(str);
  }
  if (exception != "hex-escape") {
    document.getElementById("hex-escape").value =
      escapeToEscapedBytes(str, 16, encoding);
  }
  if (exception != "oct-escape") {
    document.getElementById("oct-escape").value =
      escapeToEscapedBytes(str, 8, encoding);
  }
  if (exception != "base64") {
    document.getElementById("base64").value = escapeToBase64(str, encoding);
  }
  if (exception != "quoted-printable") {
    document.getElementById("quoted-printable").value =
      escapeToQuotedPrintable(str, encoding);
  }
  if (exception != "url") {
    document.getElementById("url").value = escapeToUrl(str, encoding);
  }
  if (exception != "mime-b") {
    document.getElementById("mime-b").value =
      escapeToMime(str, "base64", encoding);
  }
  if (exception != "mime-q") {
    document.getElementById("mime-q").value =
      escapeToMime(str, "quoted-printable", encoding);
  }
}

function getEncodingFromForm() {
  var options = document.getElementById("encoding");
  if (options) {
    return options[options.selectedIndex].value;
  }
  return 'UTF-8';
}

function toggleAll(anchor) {
  var text_node = anchor.firstChild;
  var command;
  if (text_node.nodeValue == "hide all") {
    text_node.nodeValue = "show all";
    command = "hide";
  } else {
    text_node.nodeValue = "hide all";
    command = "show";
  }
  var tables = document.getElementsByTagName("table");
  for (var i = 0; i < tables.length; ++i) {
    var table = tables[i];
    var anchors = table.getElementsByTagName("a");
    var textareas = table.getElementsByTagName("textarea");
    if (anchors.length == 1 && textareas.length == 1) {
       if (anchors[0].firstChild.nodeValue == command) {
          toggleDisplay(anchors[0], textareas[0].id);
       }
    }
  }
}

function toggleDisplay(anchor, target) {
  var element = document.getElementById(target);
  var style = element.style;
  var text_node = anchor.firstChild;
  if (text_node.nodeValue == "hide") {
    text_node.nodeValue = "show";
    style.visibility = "hidden";
    element.originalHeight = style.height;
    style.height = "0px";
  } else {
    text_node.nodeValue = "hide";
    style.height = element.originalHeight;
    style.visibility = "visible";
  }
}

function updateByString(str) {
  updateAllExceptFor(str, "str");
}

function updateByUtf16(str) {
  var unescaped = unescapeFromUtf16(str);
  updateAllExceptFor(unescaped, "utf16-escape");
}

function updateByUtf32(str) {
  var unescaped = unescapeFromUtf32(str);
  updateAllExceptFor(unescaped, "utf32-escape");
}

function updateByNumRefDec(str) {
  var unescaped = unescapeFromNumRef(str, 10);
  updateAllExceptFor(unescaped, "numref-dec");
}

function updateByNumRefHex(str) {
  var unescaped = unescapeFromNumRef(str, 16);
  updateAllExceptFor(unescaped, "numref-hex");
}

function updateByPunyCode(str) {
  var unescaped = unescapeFromPunyCode(str);
  updateAllExceptFor(unescaped, "punycode");
}

function updateByHex(str) {
  var encoding = getEncodingFromForm();
  var unescaped = unescapeFromEscapedBytes(str, 16, encoding);
  updateAllExceptFor(unescaped, "hex-escape");
}

function updateByOct(str) {
  var encoding = getEncodingFromForm();
  var unescaped = unescapeFromEscapedBytes(str, 8, encoding);
  updateAllExceptFor(unescaped, "oct-escape");
}

function updateByBase64(str) {
  var encoding = getEncodingFromForm();
  var unescaped = unescapeFromBase64(str, encoding);
  updateAllExceptFor(unescaped, "base64");
}

function updateByQuotedPrintable(str) {
  var encoding = getEncodingFromForm();
  var unescaped = unescapeFromQuotedPrintable(str, encoding);
  updateAllExceptFor(unescaped, "quoted-printable");
}

function updateByUrl(str) {
  var encoding = getEncodingFromForm();
  var unescaped = unescapeFromUrl(str, encoding);
  updateAllExceptFor(unescaped, "url");
}

function updateByMimeBase64(str) {
  var encoding = getEncodingFromForm();
  var unescaped = unescapeFromMime(str, encoding);
  updateAllExceptFor(unescaped, "mime-b");
}

function updateByMimeQuotedPrintable(str) {
  var encoding = getEncodingFromForm();
  var unescaped = unescapeFromMime(str, encoding);
  updateAllExceptFor(unescaped, "mime-q");
}

function updateByForm() {
  var str = document.getElementById("string").value;
  updateAllExceptFor(str, "str");
}
