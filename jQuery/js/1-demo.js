$(function () {
    $('ul li').click(function () {
        $(this).children('.nav').show().parent().siblings('li').children('.nav').hide()

    })
})