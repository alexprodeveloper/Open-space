localStorage.setItem('password', 'TrustNo1');
document.querySelector('.password').value = localStorage.getItem('password');

let angleInput = document.querySelector('input[name=angle]');
let angle = document.querySelector('#angle');
angle.textContent = angleInput.value;
let speedInput = document.querySelector('input[name=speed]');
let speed = document.querySelector('#speed');
speed.textContent = speedInput.value;
let positionInput = document.querySelector('input[name=position]');
let position = document.querySelector('#position');
position.textContent = positionInput.value;

angleInput.addEventListener('change', function () {
  angle.textContent = angleInput.value;
  rocket.style.transform = 'rotate(' + angleInput.value + 'deg)';
});

speedInput.addEventListener('change', function () {
  speed.textContent = speedInput.value;
});

positionInput.addEventListener('click', function () {
  position.textContent = positionInput.value;
  rocket.style.left = positionInput.value + 'px';
});

let rocket = document.querySelector('.rocket');
let btn = document.querySelector('.btn-enter');
let btnRestart = document.querySelector('.btn-restart');
btn.addEventListener('click', function () {
  let password = document.querySelector('.password').value;
  if (password === 'TrustNo1') {
    let list = document.querySelectorAll('input[disabled]');
    for (let item of list) {
      if (!item.classList.contains('btn-launch') && !item.classList.contains('btn-restart')) {
        item.removeAttribute('disabled');
      }
    }
    btn.setAttribute('disabled', '');
    document.querySelector('.password').setAttribute('disabled', '');
  } else {
    console.log('Wrong password');
  }
});

function getLevers() {
  let levers = document.getElementsByClassName('lever');
  let count = 0;
  for (let i = 0; i < levers.length; i++) {
    if (levers[i].value === '100') {
      count++;
    }
  }
  return count;
}
let btnLaunch = document.querySelector('.btn-launch');

function change() {
  if (!btnLaunch.hasAttribute('disabled')) {
    btnLaunch.setAttribute('disabled', '');
  }

  let checkboxes = document.querySelectorAll('.check-btn[type=checkbox]:checked');
  let levers = getLevers();
  if (checkboxes.length === 6 && levers === 5) {
    btnLaunch.removeAttribute('disabled');
    speedInput.removeAttribute('disabled');
    angleInput.removeAttribute('disabled');
  }
}

document.querySelector('.check-btn:first-child').onchange = change;
document.querySelector('.check-btn:nth-child(2)').onchange = change;
document.querySelector('.check-btn:nth-child(3)').onchange = change;
document.querySelector('.check-btn:nth-child(4)').onchange = change;
document.querySelector('.check-btn:nth-child(5)').onchange = change;
document.querySelector('.check-btn:nth-child(6)').onchange = change;

document.querySelector('.lever:first-child').onchange = change;
document.querySelector('.lever:nth-child(2)').onchange = change;
document.querySelector('.lever:nth-child(3)').onchange = change;
document.querySelector('.lever:nth-child(4)').onchange = change;
document.querySelector('.lever:nth-child(5)').onchange = change;

function animation() {
  btnRestart.removeAttribute('disabled');
  btnLaunch.setAttribute('disabled', '');
  speedInput.setAttribute('disabled', '');
  angleInput.setAttribute('disabled', '');
  positionInput.setAttribute('disabled', '');
  let speed = parseInt(speedInput.value);
  let angle = getCurrentRotation(rocket)
  let rocketAnimation = setInterval(function () {
    if (angle >= -30 && angle <= -3) {
      rocket.style.top = parseInt(getComputedStyle(rocket).top) - speed + 'px';
      rocket.style.left = parseInt(getComputedStyle(rocket).left) - speed + 'px';
    } else if (angle > 3 && angle <= 15) {
      rocket.style.left = parseInt(getComputedStyle(rocket).left) + Math.round(speed / 2) + 'px';
      rocket.style.top = parseInt(getComputedStyle(rocket).top) - speed + 'px';
    } else {
      rocket.style.left = parseInt(getComputedStyle(rocket).left) + speed + 'px';
      rocket.style.top = parseInt(getComputedStyle(rocket).top) - speed + 'px';
    }
    if (parseInt(getComputedStyle(rocket).top) < -800) {
      clearInterval(rocketAnimation);
    }
  }, 20);
}

btnLaunch.addEventListener('click', function () {
  animation();
});

btnRestart.addEventListener('click', function () {
  rocket.style.top = '-1000px';
  btnLaunch.removeAttribute('disabled');
  speedInput.removeAttribute('disabled');
  angleInput.removeAttribute('disabled');
  positionInput.removeAttribute('disabled');
  setTimeout(function () {
    rocket.style.left = positionInput.value + 'px';
    rocket.style.top = '200px';
  }, 30);
  btnRestart.setAttribute('disabled', '');
});

function getCurrentRotation(el){
  let st = window.getComputedStyle(el, null);
  let tm = st.getPropertyValue("-webkit-transform") ||
           st.getPropertyValue("-moz-transform") ||
           st.getPropertyValue("-ms-transform") ||
           st.getPropertyValue("-o-transform") ||
           st.getPropertyValue("transform") ||
           "none";
  if (tm != "none") {
    let values = tm.split('(')[1].split(')')[0].split(',');
    let angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
    return angle;
  }
  return 0;
}


let drag = {}
document.addEventListener('mousedown', function (event) {
  if (event.which === 1) {
    if (event.target.classList.contains('control-panel-drag') && !drag.x) {
      drag.element = event.target.parentNode;
      drag.x = event.clientX;
      drag.y = event.clientY;
    }
  }
});

document.addEventListener('mousemove', function (event) {
  if (event.which === 1 && event.target.classList.contains('control-panel-drag')) {
    drag.newX = event.clientX;
    drag.newY = event.clientY;
    drag.element.style.right = drag.x - drag.newX + 'px';
    drag.element.style.top = drag.newY - drag.y + 'px';
  }
});