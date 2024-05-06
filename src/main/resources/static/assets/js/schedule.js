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

console.log(day1);
console.log(day2);
console.log(day3);
console.log(day4);
console.log(day5);
console.log(day6);
console.log(day7);

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
                    console.log('여기로 몇놈이 오는거여')
                   makeSchedule(day1,start,end,name,injury,age);
                   break;
               case 2:
                   makeSchedule(day2,start,end,name,injury,age);
                   break;
               case 3:
                   makeSchedule(day3,start,end,name,injury,age);
                   break;
               case 4:
                   makeSchedule(day4,start,end,name,injury,age);
                   break;
               case 5:
                   makeSchedule(day5,start,end,name,injury,age);
                   break;
               case 6:
                   makeSchedule(day6,start,end,name,injury,age);
                   break;
               case 7:
                   makeSchedule(day7,start,end,name,injury,age);
                   break;
           }

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


function makeSchedule(day,start,end,name,injury,age){
    const $ele = document.createElement('li');
    $ele.classList.add('d-flex', 'flex-column', 'flex-md-row', 'py-4');
    $ele.innerHTML=
        `<span class="flex-shrink-0 width-13x me-md-4 d-block mb-3 mb-md-0 small text-black">${start} - ${end}</span>
             <div class="flex-grow-1 ps-4 border-start border-3" style="color: black">
                 <button class="button-6" data-bs-toggle="modal" data-bs-target="#exampleModal" style="display: flex; flex-direction: column;">
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



