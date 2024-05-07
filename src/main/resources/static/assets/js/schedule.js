const mon = document.getElementById('mon');
const tue = document.getElementById('tue');
const wed = document.getElementById('wed');
const thu = document.getElementById('thu');
const fri = document.getElementById('fri');
const sat = document.getElementById('sat');
const sun = document.getElementById('sun');
const date = [mon,tue,wed,thu,fri,sat,sun];

const day1 =document.getElementById('day1').firstElementChild;
const day2 =document.getElementById('day2').firstElementChild;
const day3 =document.getElementById('day3').firstElementChild;
const day4 =document.getElementById('day4').firstElementChild;
const day5 =document.getElementById('day5').firstElementChild;
const day6 =document.getElementById('day6').firstElementChild;
const day7 =document.getElementById('day7').firstElementChild;



fetch("/setSchedule")
.then(res=>res.json())
.then(data=>{
    console.table(data);
    let day = data.startDay
    // console.log(day);
    date[0].textContent=day;
    for(let i=1 ;i<7;i++){

        day = increaseDateByOneDay(day);

        date[i].textContent=day;
    }


    data.schedule.projects.forEach(p=>{
        // console.table(p);
        const name = p.patientDTO.name;
        const age = p.patientDTO.age;
        const injury = p.injuryDTO.injuryName;
        p.mediInfoList.forEach(m=>{
           const time = m.timeDTO.timeVal;
           let start = time.substring(0,time.length-3);

           const end = ending(start);

           const dayNum = m.day;
           switch (dayNum){
               case 1:

                   makeSchedule(day1,start,end,name,injury,age,m.timeDTO.timeCode,m.mediDate,m.mediCode);
                   break;
               case 2:
                   makeSchedule(day2,start,end,name,injury,age,m.timeDTO.timeCode,m.mediDate,m.mediCode);
                   break;
               case 3:
                   makeSchedule(day3,start,end,name,injury,age,m.timeDTO.timeCode,m.mediDate,m.mediCode);
                   break;
               case 4:
                   makeSchedule(day4,start,end,name,injury,age,m.timeDTO.timeCode,m.mediDate,m.mediCode);
                   break;
               case 5:
                   makeSchedule(day5,start,end,name,injury,age,m.timeDTO.timeCode,m.mediDate,m.mediCode);
                   break;
               case 6:
                   makeSchedule(day6,start,end,name,injury,age,m.timeDTO.timeCode,m.mediDate,m.mediCode);
                   break;
               case 7:
                   makeSchedule(day7,start,end,name,injury,age,m.timeDTO.timeCode,m.mediDate,m.mediCode);
                   break;
           }

        })



    })
    const $modalButton = document.querySelectorAll('.button-6');

    $modalButton.forEach(b=>{
        b.addEventListener('click',e=>{

            const text = b.firstElementChild.textContent;
            Array.from($patientName.options).forEach(function (option){
                if(option.textContent === text){
                    option.selected='true';
                }
            })
            const timeCode = b.classList;

            const val = timeCode[1].split("-")[1];
            $time.value=val;

            const date = timeCode[2].split("/")[1];
            doDate(date);
            const mediCode = timeCode[3].split("-")[1];
            $date.value=date;
            $delete.style.display='block';

            modiButton(mediCode);
            deleteButton(mediCode);
        })
    })

})


function increaseDateByOneDay(dateString) {
    // 주어진 문자열을 Date 객체로 변환
    let date = new Date(dateString);
    // 하루를 더한다
    date.setDate(date.getDate() + 1);
    // YYYY-MM-DD 형식의 문자열로 변환하여 반환
    return date.toISOString().split('T')[0];
}


function makeSchedule(day,start,end,name,injury,age,timeCode,mediDate,mediCode){
    const $ele = document.createElement('li');
    $ele.classList.add('d-flex', 'flex-column', 'flex-md-row', 'py-4');
    $ele.innerHTML=
        `<span class="flex-shrink-0 width-13x me-md-4 d-block mb-3 mb-md-0 small text-black ">${start} - ${end}</span>
             <div class="flex-grow-1 ps-4 border-start border-3" style="color: black">
                 <button class="button-6 timecode-${timeCode} date/${mediDate} mediCode-${mediCode}" data-bs-toggle="modal" data-bs-target="#exampleModal" style="display: flex; flex-direction: column;">
                    <h4>${name}</h4>
                    <p class="mb-0">
                        부상명 : ${injury}<br>
                        나이 : ${age}
                    </p>
                 </button>
             </div>`
    day.appendChild($ele);

}

function ending(start){


    const timeParts = start.split(":");
    let hours = parseInt(timeParts[0], 10); // 시간
    let minutes = parseInt(timeParts[1], 10); // 분

    minutes += 30;

// 60분 이상일 경우 시간을 조정해야 함
    if (minutes >= 60) {
        hours++;
        minutes -= 60;
    }

    const newTimeVal = hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0");
    return newTimeVal;
}


const $modalPage = document.getElementById('exampleModal');
const $patientName = document.getElementById('patientName');
const $time =document.getElementById('reservationTime');
const $date = document.getElementById('reservationDate');
fetch("/allprojects")
    .then(res=>res.json())
    .then(data=>{
        console.table(data);
        data.forEach(p=>{
            const $option = document.createElement('option');
            $option.textContent=`${p.patientDTO.name}`;
            $option.value=`${p.projectNo}`;
            $patientName.appendChild($option);
        })
    })

const $form = document.getElementById('formmer');
const $modify = document.getElementById('modifyBtn');
const $delete = document.getElementById('deleteBtn');
function modiButton(mediCode) {
    $modify.addEventListener('click', function () {
        $form.action = `/update/${mediCode}`;
        $form.submit();
    })
}


$date.addEventListener('change',function (){doDate($date.value)})

function cancelLine(option){
    const text = option.textContent.trim();
    const newText = `<s>${text}</s>`;
    console.log(newText);
    option.innerHTML=newText;
}
function deleteButton (mediCode){
    $delete.addEventListener('click', function () {
        $form.action =`/delete/${mediCode}`;
        $form.submit();
    })
}

$form.addEventListener('change',e=>{
    $delete.style.display='none';
})

function doDate(dating){
    Array.from($time.options).forEach(function(option){
        option.disabled=false;
    })
    $time[0].disabled=true;
    let times = [];
    fetch("/allprojects")
        .then(res=>res.json())
        .then(data=>{
            data.forEach(project=>{
                project.mediInfoList.forEach(m=>{
                    if(m.mediDate===dating){
                        times.push(m.timeCode);
                    }

                })
            })
            if(times!=null){
                times.forEach(t=>{
                    const $option = $time.querySelector(`option[value="${t}"]`)
                    $option.disabled=true;
                    cancelLine($option);
                })
            }
        })
}