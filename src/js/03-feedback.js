const formRef = document.querySelector('.feedback-form');
const FEED_BACK = 'feedback-form-state';

const HandleInput = event => {
  const { name, value } = event.target;

  const savedData = load(FEED_BACK) ?? {};
  savedData[name] = value;
  save(FEED_BACK, savedData);
};

function initPage(){
    const savedData = load(FEED_BACK);
    if (savedData) {
        Object.entries(savedData).forEach(([name, value]) => {
            formRef.elements[name].value = value;
        })
    }
}
const submitForm = event => {
    event.preventDefault()
    const savedData = load(FEED_BACK);
    console.log(savedData);
    localStorage.removeItem(FEED_BACK)
}

// static
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};
formRef.addEventListener('input', HandleInput);
formRef.addEventListener("submit", submitForm)
initPage()