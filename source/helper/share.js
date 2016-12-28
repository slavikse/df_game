//odnoklassniki: function (purl, text) {
//  url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
//  url += '&st.comments=' + encodeURIComponent(text);
//  url += '&st._surl=' + encodeURIComponent(purl);
//  Share.popup(url);
//},
//facebook: function (purl, ptitle, pimg, text) {
//  url = 'http://www.facebook.com/sharer.php?s=100';
//  url += '&p[title]=' + encodeURIComponent(ptitle);
//  url += '&p[summary]=' + encodeURIComponent(text);
//  url += '&p[url]=' + encodeURIComponent(purl);
//  url += '&p[images][0]=' + encodeURIComponent(pimg);
//  Share.popup(url);
//},
//twitter: function (purl, ptitle) {
//  url = 'http://twitter.com/share?';
//  url += 'text=' + encodeURIComponent(ptitle);
//  url += '&url=' + encodeURIComponent(purl);
//  url += '&counturl=' + encodeURIComponent(purl);
//  Share.popup(url);
//},
//mailru: function (purl, ptitle, pimg, text) {
//  url = 'http://connect.mail.ru/share?';
//  url += 'url=' + encodeURIComponent(purl);
//  url += '&title=' + encodeURIComponent(ptitle);
//  url += '&description=' + encodeURIComponent(text);
//  url += '&imageurl=' + encodeURIComponent(pimg);
//  Share.popup(url)
//},

/**
 * Соцшара
 * @param uri ссылка для перехода
 * @param title название цели
 * @param desc опиание цели
 * @param image изображение
 */
function shareVK({uri, title, desc, image}) {
  const target = 'https://vk.com/share.php?' +
    'url=' + encodeURIComponent(uri) +
    '&title=' + encodeURIComponent(title) +
    '&description=' + encodeURIComponent(desc) +
    '&image=' + encodeURIComponent(image) +
    '&noparse=true';

  share(target);
}

function share(target) {
  window.open(target, '', 'width=626,height=436,menubar=0,toolbar=0,status=0');
}

export {
  shareVK
};
