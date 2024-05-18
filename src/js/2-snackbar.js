import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const btn = document.querySelector('button[type="submit"]');
const form = document.querySelector(".form");


btn.addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const delayStr = formData.get("delay");
    const delay = Number(delayStr);
    const state = formData.get("state");
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state == "fulfilled") {
                resolve(delay)
            } else {
                reject(delay)
            }
          }, delay);
    });
    promise.then(delay => {
        iziToast.show({
                title: 'OK',
                message: `Fulfilled promise in ${delay}ms`,
                color: '#59A10D',
                position: 'topRight',
                messageColor: '#FFF',
                titleColor: '#FFF',
                iconUrl: '../img/bi_check2-circle.svg',
                timeout: delay
            })}
    )
    .catch(delay => {
        iziToast.show({
                title: 'Error',
                message: `Rejected promise in ${delay}ms`,
                color: '#EF4040',
                position: 'topRight',
                messageColor: '#FFF',
                titleColor: '#FFF',
                iconUrl: '../img/bi_x-octagon.svg',
                timeout: delay
            })
    })
})