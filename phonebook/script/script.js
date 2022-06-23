import control from './modules/control.js';
const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} = control;
import {renderPhoneBook, renderContacts} from './modules/render.js';
import serviceStorage from './modules/serviceStorage.js';
const {
  getStorage,
} = serviceStorage;
{
  const data = [];
  let newdata = getStorage('data');
  if (newdata.length === 0) {
    newdata = data;
  }
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
    } = renderPhoneBook(app, title);
      // Функционал
    const {closeModal} = modalControl(btnAdd, formOverlay);
    formControl(form, list, closeModal);
    let allRow = renderContacts(list, newdata);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.td_name')) {
        newdata.sort((prev, next) => {
          if (prev.name < next.name) return -1;
          if (prev.name < next.name) return 1;
        });
        allRow.forEach((contact) => {
          contact.remove();
        });
        allRow = renderContacts(list, newdata);
        localStorage.setItem('data', JSON.stringify(newdata));
      }
      if (target.closest('.td_surname')) {
        newdata.sort((prev, next) => {
          if (prev.surname < next.surname) return -1;
          if (prev.surname < next.surname) return 1;
        });
        allRow.forEach((contact) => {
          contact.remove();
        });
        allRow = renderContacts(list, newdata);
        localStorage.setItem('data', JSON.stringify(newdata));
}
    });
  };
  window.phoneBookInit = init;
}
