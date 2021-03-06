(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
const {
  createRow,
} = require('./createElements');
const {
  removeStorage,
  setStorage,
} = require('./serviceStorage');
const hoverRow = (allRow, logo) => {
    const text = logo.textContent;

    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
};
const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };
    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };
    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay ||
        target.classList.contains('close')) {
        closeModal();
      }
    });
    return {
      closeModal,
    };
};
const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });
    list.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.del-icon')) {
        target.closest('.contact').remove();
        let phone = (target.closest('.contact').querySelector('.phone').textContent)
        removeStorage(phone);
      }
    });
};
const addContactPage = (contact, list) => {
    list.append(createRow(contact));
};
const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      addContactPage(newContact, list);
      setStorage('data', newContact);
      form.reset();
      closeModal();
    });
};

module.exports = {
  hoverRow,
  modalControl,
  deleteControl,
  addContactPage,
  formControl,
};

},{"./createElements":2,"./serviceStorage":4}],2:[function(require,module,exports){
'use strict';
const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
};
const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;
    return header;
};
const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `???????????????????? ????????????????????. ${title}`;

    return h1;
};
const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
};
const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });
    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
};
const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
      <tr>
      <th class="delete">??????????????</th>
      <th>??????</th>
      <th>??????????????</th>
      <th>??????????????</th>
      </tr>
      `);
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;
    return table;
};
const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
      <button class="close" type="button"></button>
      <h2 class="form-title">???????????????? ??????????????</h2>
      <div class="form-group">
      <label class="form-label" for="name">??????:</label>
      <input class="form-input" name="name" id="name" type="text" required>
      </div>
      <div class="form-group">
      <label class="form-label" for="surname">??????????????:</label>
      <input class="form-input" name="surname" id="surname" type="text" required>
      </div>
      <div class="form-group">
      <label class="form-label" for="phone">??????????????:</label>
      <input class="form-input" name="phone" id="phone" type="number" required>
      </div>
      `);
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        name: 'submit',
        text: '????????????????',
      },
      {
        className: 'btn btn-danger',
        name: 'reset',
        text: '????????????',
      },
    ]);
    form.append(...buttonGroup.btns);
    overlay.append(form);
    return {
      overlay,
      form,
    };
};
const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerContainer = createContainer();
    footer.append(footerContainer);

    footer.footerContainer = footerContainer;
    return footer;
};
const createFooterText = title => {
    const textDiv = document.createElement('div');
    textDiv.textContent = `?????? ?????????? ???????????????? ?? ${title}`;
    return textDiv;
};
const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    const tdName = document.createElement('td');
    tdName.classList.add('td_name');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.classList.add('td_surname');
    tdSurname.textContent = surname;
    
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.classList.add('phone');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn', 'btn-primary');
    buttonEdit.textContent = '??????????????????????????';
    tdEdit.append(buttonEdit);

    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);
    return tr;
};

module.exports = {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createFooterText,
  createRow,
};

},{}],3:[function(require,module,exports){
'use strict';
const {
  createHeader,
  createLogo,
  createMain,
  createButtonsGroup,
  createTable,
  createForm,
  createFooter,
  createFooterText,
  createRow,
} = require('./createElements');
const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3 js-add',
        name: 'button',
        text: '????????????????',
      },
      {
        className: 'btn btn-danger',
        name: 'button',
        text: '??????????????',
      },
    ]);
    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter();
    const textDiv = createFooterText(title);

    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
    app.append(header, main, footer);
    footer.footerContainer.append(textDiv);
    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      formOverlay: overlay, form,
    };
};
const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
};

module.exports = {
  renderPhoneBook,
  renderContacts,
};

},{"./createElements":2}],4:[function(require,module,exports){
'use strict';
const removeStorage = (phone) => {
  let newdata = getStorage('data');
  let dataindex;
  newdata.forEach((data, index) => {
    if (data.phone == phone) {
      dataindex = index;
    }
  });
  newdata.splice(dataindex, 1);
  localStorage.setItem('data', JSON.stringify(newdata));
};
const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];
// const data = [];
// let newdata = getStorage('data');
// if (newdata.length === 0) {
// 			newdata = data;
// 		};
const setStorage = (key, obj) => {
    let newdata = getStorage(key);
    if (newdata.length === 0) {
      newdata = data;
      localStorage.setItem('data', JSON.stringify(newdata));
    }
    newdata.push(obj);
    localStorage.setItem('data', JSON.stringify(newdata));
};

module.exports = {
    removeStorage,
    getStorage,
    setStorage,
};


},{}],5:[function(require,module,exports){
'use strict';
const {
  hoverRow,
  modalControl,
  deleteControl,
  formControl,
} = require('./modules/control');
const {
  renderPhoneBook,
  renderContacts,
} = require('./modules/render');
const {
  getStorage,
} = require('./modules/serviceStorage');

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
      // ????????????????????
    
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
},{"./modules/control":1,"./modules/render":3,"./modules/serviceStorage":4}]},{},[5]);
