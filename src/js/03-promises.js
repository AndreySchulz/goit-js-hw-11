import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formRef: document.querySelector('.form'),
  btnRef: document.querySelector('button'),
};
let dalayHandle = '';
let stepHandle = '';
let amountHandle = '';
let positionHandle = 1


refs.formRef.addEventListener('input', onHanddleClick);
refs.btnRef.addEventListener('click', onBtnClick);



function onHanddleClick(event) {

  switch (event.target.name) {
    case 'delay':
      dalayHandle = +event.target.value;
      break;
    case 'step':  
      stepHandle = +event.target.value;
      break;
    case 'amount':
      amountHandle = +event.target.value;
      break;
    default:'';
  }


}

function createPromise(position, delay) {
  const object = {
    position: position,
    delay: delay,
  }
  positionHandle += 1;

  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
      resolve(object)
  } else {
      reject(object)
     }
    }, dalayHandle) 
    
    
  })
  return promise
    .then(({ position, delay }) => {
    Notify.success("`✅ Fulfilled promise ${position} in ${delay}ms`")
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
    .catch(({ position, delay }) => {
     Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}
function amountPromise(amount) {
  createPromise(positionHandle, dalayHandle)
  
  for (let i = 1; i <= amount; i += 1) {
    dalayHandle+= stepHandle
    createPromise(positionHandle, dalayHandle)
  }
  
}
function onBtnClick(event) {
  event.preventDefault()
  amountPromise(amountHandle)

 

}

