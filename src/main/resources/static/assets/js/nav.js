const $mainbar = document.getElementById('mainbar');

$mainbar.addEventListener('mouseover',e=>{
    const $title= $mainbar.getElementsByClassName('title');
    for(let i =0 ; i<$title.length;i++){
        if($title[i].classList.contains('hidden'))
            $title[i].classList.remove('hidden')
        $title[i].style.display='inline'
    }
})

$mainbar.addEventListener('mouseout',e=>{
    const $title=$mainbar.getElementsByClassName('title');
    for(let i = 0; i< $title.length;i++){
        if(!$title[i].classList.contains('hidden')){
            $title[i].classList.add('hidden');
            $title[i].style.display='none'
        }
    }
})