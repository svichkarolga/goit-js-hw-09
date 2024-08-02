const feedbackFormEl = document.querySelector('.js-feedback-form');
let formData = {email: "", message: ""}; // щоб можна було перезаписувати дані, що ввів користувач коли користувач ввів інфу не сю, щоб введена частина не затерлася новою інфо

const onFormFieldChange = event => {
  const fieldValue = event.target.value; // значення яке ввів користувач в формі ,буде зберігатися в змінну
  const fieldName = event.target.name; // значення, яке буде записуватися в форм дата, те, що корист ввів в інпуті

  formData[fieldName] = fieldValue; //  записуємо в наш обʼєкт ключ-значення

  localStorage.setItem('feedback-form-state', JSON.stringify(formData)); // відправляємо обʼект до локал сторидж => ключ придумали feedback-form-state а значення - рядок джейсон (приводимо датаформ до джейсон формата)
  
};
feedbackFormEl.addEventListener('input', onFormFieldChange);

// зчитуємо форму з локал сторіджа, що користувач ввів раніше:
const fillFormFields = () => {
  const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state')); // дістаємо дані з локал сторіджа

  if (formDataFromLS === null) {
    return;  
  }
  formData = formDataFromLS;
  // якщо рядки пусті -користувач нічого не ввів - то нічого не робимо, не заповнюємо форму
  console.log(formDataFromLS);

 // заповнюємо форму з локал сторіджа, що користувач ввів раніше: (для цього перебираємо елементи форми в псевдомасиві елементс. в якості ключів -елемент нейм)

  for (const key in formDataFromLS) {
    if (formDataFromLS.hasOwnProperty(key)) // перевір власна чи не власна властив
    {
      console.log(formDataFromLS);
      console.dir(feedbackFormEl.elements[key].value)
      /*
        1 Ітерація
        key = 'user_name'

        2 Ітерація
        key = 'user_email'

        3 Ітерація
        key = 'user_message'
      */
      feedbackFormEl.elements[key].value = formDataFromLS[key];
    }
  }
  };
fillFormFields();

// чистимо ел-ти форми після сабміту 


const onFeedbackFormSubmit = event => {
  event.preventDefault();

  const email = feedbackFormEl.elements['email'].value.trim();
  const message = feedbackFormEl.elements['message'].value.trim();

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  event.target.reset(); // чистяться ел-ти форми
  localStorage.removeItem('feedback-form-state'); // чиститься локал сторідж точечно по ключу
   formData = { email: "", message: "" }; // чиститься обʼект formData
};
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);
