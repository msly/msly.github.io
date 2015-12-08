$(function(){
  $('#commonRegex .bd li a').bind('click', function(){
    if($(this).attr('data-regex') !== $('#searchText').val()) {
      $('#searchText').val($(this).attr('data-regex')).trigger('keydown').trigger('keyup');
    }
    return false;
  })
})