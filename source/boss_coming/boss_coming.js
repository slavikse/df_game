const $wrap = document.querySelector('.boss-coming-wrap');
//const $road = $wrap.querySelector('.boss-coming-road');
const $coming = $wrap.querySelector('.boss-coming');
const $head = $wrap.querySelector('.boss-coming-head');

let headMoveX = 0;

//setInterval(() => {
headMoveX += 20;

$coming.style.transform = `translateX(${headMoveX}%)`;
$head.style.transform = `translateX(${headMoveX}%)`;
//}, 1000);
