/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./gmail/index.js":
/*!************************!*\
  !*** ./gmail/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   findThreads: () => (/* binding */ findThreads)
/* harmony export */ });
/* harmony import */ var _threadInfoBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./threadInfoBlock */ "./gmail/threadInfoBlock.js");

console.log(`from index.js 333`)

// added 07.03.24 to settle Trusted-Types errorrs
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML: string => string,
    createScriptURL: string => string,
    createScript: string => string,
  })
}

// @ts-ignore
// window.config = useConfig()
const config = useConfig()

init()
function init() {
  //   console.log('init start')
  // корневой элемент, который будем слушать
  let parentNode = document.querySelector('div.aeF > div.nH')
  if (parentNode === null) {
    // console.log('waiting load...')
    setTimeout(init, 500) // waiting load...
    return
  }
  //   console.log('inited')
  addTaskButton()
  let observer = new MutationObserver(mutationRecords => {
    // console.log(mutationRecords)
    mutationRecords.forEach(mutation => {
      //console.log(mutation);
      mutation.addedNodes.forEach(addedNode => {
        // console.log('addedNode: ', addedNode)
        // определяем открытие новой цепочки
        if (addedNode.classList && addedNode.classList.contains('aHo')) {
          //   console.log(`new thread`)
          onNewThreadOpen(addedNode)
        }
        // определяем открытие поиска по кнопке "Найти все письма"
        //  console.log(`addedNode.className: ${addedNode.className}`)
        //  console.log(`addedNode.childNodes[5].className: ${addedNode.childNodes[5].className}`)
        if (
          window.mustCreateCustomerBlock &&
          addedNode.className === 'bGI S4' &&
          addedNode.childNodes[5] !== undefined &&
          addedNode.childNodes[5].className === 'Nr UI Nm vy UJ'
        ) {
          // console.log(`Найти все письма`)
          // добавляем блок для отображения информации по счетам
          let parentBlock = addedNode.childNodes[5].querySelector('div.Nu.tf.aZ6 > .ae4')
          // console.log('addedNode: ', parentBlock);

          let infoBlock = document.createElement('div')
          infoBlock.id = 'customerInfo'
          infoBlock.className = 'wait'
          infoBlock.innerHTML = '<div id="spinner"></div>'

          parentBlock.prepend(infoBlock)

          window.mustCreateCustomerBlock = false
        }
      })
    })
  })

  observer.observe(parentNode, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: true,
    attributeOldValue: false,
    characterDataOldValue: false,
  })

  // snippets block
  window.areSnippetsActive = false // начальное значение
  document.addEventListener(
    'keydown',
    function (event) {
      // console.log('event: ', event);
      if (event.code === 'Backquote') {
        draftSnippets1()
      } else if (areSnippetsActive) {
        draftSnippets2()
      }
    },
    true
  )
  window.snipps = [
    {
      name: 'Добрый день!',
      code: '<div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Добрый день!</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div>',
    },
    {
      name: 'Счет во вложении.',
      code: '<div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Добрый день!</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Счет во вложении.</div>',
    },
    {
      name: 'Сообщите отгр. инф.',
      code: '<div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Добрый день!</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div><div class="gmail_default" style="font-family: arial, helvetica, sans-serif;">Сообщите пожалуйста отгрузочную информацию - пункт назначения, контактное лицо. Отправляем Деловыми Линиями.</div>',
    },
    {
      name: 'Не сможем обеспечить.',
      code: '<div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Добрый день!</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Не сможем обеспечить, к сожалению.</div>',
    },
    {
      name: 'Только измерительный.',
      code: '<div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Добрый день!</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Мы поставляем только измерительный инструмент.</div>',
    },
    {
      name: 'Отгрузка - ДЛ.',
      code: '<div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Добрый день!</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div><div class="gmail_default" style="font-family: arial, helvetica, sans-serif;">Товар по счету № был отгружен компанией Деловые линии, накладная №​</div>',
    },
    {
      name: 'Отгрузка - самовывоз.',
      code: '<div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Добрый день!</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Товар по счету № готов к получению.</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Получение продукции по адресу: г. Челябинск, ул. Болейко, д. 5.</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif">Для получения необходима доверенность или печать организации-получателя (паспорт для физ. лиц).</div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><br></div><div class="gmail_default" style="font-family:arial,helvetica,sans-serif"><a href="http://chelinstrument.ru/contacts/#map">Схема проезда</a></div>',
    },
  ]

  function draftSnippets1() {
    // срабатывает при нажатии первой клавиши (~)
    window.areSnippetsActive = true
    // проверяем, открыт ли черновик
    window.draft = document.querySelector('.M9 .editable')
    if (typeof draft !== 'undefined') {
      // Показываем блок сниппетов
      if (typeof blockSnipps !== 'undefined') {
        let draftCoord = draft.getBoundingClientRect()
        blockSnipps.style = 'top:' + draftCoord.y + 'px; left:' + (draftCoord.x + draftCoord.width - 210) + 'px'
        blockSnipps.style.display = 'block'
      } else {
        // создаем
        let html = '<ul>'
        snipps.forEach((item, i) => {
          html += '<li>' + (i + 1) + '. ' + item.name + '</li>'
        })
        html += '</ul>'
        let draftCoord = draft.getBoundingClientRect()
        //console.log('draftCoord = ', draftCoord);
        window.blockSnipps = document.createElement('div')
        blockSnipps.className = 'snipps'
        blockSnipps.style = 'top:' + draftCoord.y + 'px; left:' + (draftCoord.x + draftCoord.width - 210) + 'px'
        blockSnipps.innerHTML = html
        document.body.append(blockSnipps)
      }
      document.addEventListener('click', clearSnippets) // клик отменяет вставку
    }
  }

  async function draftSnippets2() {
    // срабатывает при нажатии второй клавиши
    let key = event.code
    if (key.includes('Digit')) {
      key = Number(key.substring(5))
      //console.log('key = ', key);
      if (snipps.length >= key) {
        event.preventDefault()
        let snip = snipps[key - 1]
        // очищаем черновик
        draft.querySelectorAll('.gmail_default').forEach(item => {
          item.remove()
        })
        //вставляем наш шаблон
        // за время таймаута в DOM добавляется новый .gmail_default, в котором будет стоять курсор
        // а мы наш шаблон подставляем перед ним
        setTimeout(() => {
          draft.insertAdjacentHTML('afterbegin', snip.code)
        }, 10)
      }
    }
    clearSnippets()
  }

  function clearSnippets() {
    window.areSnippetsActive = false
    blockSnipps.style.display = 'none'
    document.removeEventListener('click', clearSnippets)
  }
}
// end snippets block

// обрабатываем открытие новой цепочки

function onNewThreadOpen(threadNode) {
  (0,_threadInfoBlock__WEBPACK_IMPORTED_MODULE_0__.refreshThreadInfo)(threadNode)
  createButtonFindAll(threadNode)
}

function createButtonFindAll(thrNode) {
  // let btnPanel = thrNode.querySelector('.hj > div');
  let btnPanel = thrNode.querySelector('.byY')
  let allThrBtn = document.createElement('span')
  allThrBtn.className = 'pn_btn findAll'
  allThrBtn.style.position = 'absolute'
  allThrBtn.style.left = '25px'
  allThrBtn.innerHTML =
    '<a href="#"><img class="inboxsdk__button_iconImg" style="width:25px" src="https://www.gstatic.com/images/icons/material/system/1x/pets_black_20dp.png"></a>'
  allThrBtn.title = 'Найти все письма'
  btnPanel.prepend(allThrBtn)
  allThrBtn.addEventListener('click', findThreads)
}

// кнопка 'Найти все письма'
window.mustCreateCustomerBlock = false // вручную управляем флагом, чтобы не создавать более одного блока

function findThreads() {
  // let activeMsg = document.querySelector('div.BltHke[role="main"] div.h7');
  let activeMsg = document.querySelector('.bGI[role="main"] div.h7')
  if (typeof activeMsg === 'undefined') {
    return
  }
  let msgFrom = activeMsg.querySelectorAll('span.gD')
  msgFrom = msgFrom.length ? msgFrom[0].getAttribute('email') || '' : ''
  let msgTo = activeMsg.querySelectorAll('span.g2')
  msgTo = msgTo.length ? msgTo[0].getAttribute('email') || '' : ''
  let findText = msgFrom === 'info@chelinstrument.ru' || msgFrom === 'meritel@mail.ru' ? msgTo : msgFrom
  // console.log('findText = ', findText);
  let pressEnter = new KeyboardEvent('keydown', {
    keyCode: 13,
    bubbles: true,
    cancelable: true,
  })
  // let inp = document.querySelectorAll('input.gb_gf')[0]; // часто меняется, было .gb_ff, .gb_gf, , .gb_ef
  // if (inp == null) {
  //     inp = document.querySelectorAll('input.gb_ff')[0];
  // }
  // попробую найти input по другому
  // let inp = document.querySelectorAll('div.gb_of input')[0];
  // let inp = document.querySelector('input.gb_6e');
  // let inp = document.querySelector('.gb_nf input');
  let inp = document.querySelector('input[aria-label="Поиск в почте"]')
  inp.value = findText
  window.mustCreateCustomerBlock = true // переменная для обсервера мутаций, позводяющая создать блок для данных о клиенте
  inp.dispatchEvent(pressEnter)

  // выводим информацию о счетах данного клиента
  createCustomerBills(findText)
}

function createCustomerBills(email) {
  // функция получает е-майл клиента и выводит информацию по выставленным ему счетам

  // гугл-скрипт возвращает номер счета (первого найденного), отправленного на данный емайл, или false
  fetch(config.googleScriptUrl, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password: config.googleScriptPassword,
    }),
  })
    .then(response => response.json())
    .then(bill => {
      // console.log("from GAS: ", bill);
      if (bill) {
        // запрос в 1с
        fetch(config.oneCUrl + 'getCustomerBills', {
          method: 'POST',
          body: JSON.stringify({
            number: bill.number,
            date: bill.date,
            password: config.oneCPassword,
          }),
        })
          .then(response => response.json())
          .then(bills => {
            // console.log("from 1C: ", bills);
            showCustomerBills(bills)
          })
      } else {
        showCustomerBills([]) // счета не найдены
      }
    })
}

function showCustomerBills(bills) {
  // функция получает массив из выставленных клиенту счетов, формирует из них html и вставляет на страницу

  // находим уже созданный через MutationObserver блок
  let customerBlock = document.querySelectorAll('#customerInfo')[0]
  customerBlock.classList.remove('wait')

  if (bills.length === 0) {
    customerBlock.innerHTML = "<div class='customerBillsEmpty'>Счета не найдены.</div>"
    return
  }

  let customerBills = document.createElement('div')
  customerBills.className = 'customerBills hide'

  let paidedBills = 0
  let currentYear = new Date().getFullYear().toString() // чтобы не вычислять для каждого счета

  bills.forEach(bill => {
    let customerBill = document.createElement('div')
    customerBill.className = 'customerBill'

    if (bill.paidPercent) {
      paidedBills++
      if (bill.shipPercent < 100) {
        customerBill.classList.add('inProgress')
      } else {
        customerBill.classList.add('closed')
      }
    } else {
      if (bill.shipPercent) {
        customerBill.classList.add('waitingPayment')
      }
    }

    // сформируем ссылку на счет. Для этого нужно знать год счета (счета прошлых лет лежат в отдельных папках)
    let billYear = bill.date.slice(-4)
    let billFolder = ''
    if (billYear !== currentYear) {
      // не тукущий год
      billFolder = billYear + '/'
    }
    let billURL = `http://localhost/bills1c/${billFolder}%D0%A1%D1%87%D0%B5%D1%82%20%D0%BD%D0%B0%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D1%83%20%E2%84%96%20${bill.number}%20%D0%BE%D1%82%20${bill.date}.pdf`
    // console.log('billURL: ', billURL);
    customerBill.innerHTML = `<a href="${billURL}">Счет на оплату № ${bill.number} от ${bill.date}</a>`
    customerBills.append(customerBill)
  })

  let customerBillsTotal = document.createElement('div')
  customerBillsTotal.className = 'customerBillsTotal'
  customerBillsTotal.innerText = `Счетов всего: ${bills.length}, оплаченных: ${paidedBills}`
  customerBillsTotal.addEventListener('click', event => {
    event.target.classList.toggle('close')
    event.target.nextSibling.classList.toggle('hide')
  })

  customerBlock.append(customerBillsTotal)
  customerBlock.append(customerBills)
}

// AddTask block
async function addTaskButton() {
  // Вставляем кнопку "Добавить задачу" в верхнюю панель иконок
  // const iconbar = document.querySelector('.gb_re.gb_pe')
  // const iconbar = document.querySelector('.gb_ve.gb_te')
  // const iconbar = document.querySelector('.gb_we.gb_ue')
  // const iconbar = document.querySelector('.gb_7d.gb_5d')
  // const iconbar = document.querySelector('.gb_8d.gb_6d')
  // const iconbar = document.querySelector('.gb_ae.gb_8d')
  // const iconbar = document.querySelector('.gb_de.gb_be')
  // const iconbar = document.querySelector('.gb_Ad.gb_Ld > div:nth-child(3)')
  // const iconbar = document.querySelector('.gb_Ad > div:nth-child(3)')
  // У элемента (и его родителей) постоянно меняются классы, поэтому находим его по координатам: берем верхний блок и переходим по потомкам.
  const efforts = {
    current: 0,
    max: 5,
  }
  let iconbar
  while (++efforts.current < efforts.max) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    iconbar = document.elementFromPoint(document.documentElement.clientWidth / 2, 1)?.children[1]?.children[2]
    if (iconbar) break
  }
  if (!iconbar) {
    console.error("Can't inject task button! Iconbar not found.")
    return
  }
  const textHTML = `
                      <div class="zo" data-tooltip="Добавить задачу">
                        <a class="gb_me gb_ke gb_ne t6" role="button"">
                            <svg class="t7" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 16 16" fill="currentColor" focusable="false">
                                 <path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                            </svg>
                        </a>
                      </div>`
  iconbar.insertAdjacentHTML('afterbegin', textHTML)
  const link = iconbar.querySelector('a')
  link.addEventListener('click', addTaskHandler)
}
function addTaskHandler() {
  const buttonNewEmail = document.querySelector('.T-I.T-I-KE.L3')
  buttonNewEmail.click()
  editDraft()

  function editDraft() {
    setTimeout(() => {
      const toInput = document.querySelector('.agP.aFw')
      if (toInput === null) {
        editDraft()
        return
      }
      toInput.value = 'chelinstrument@gmail.com'
      const subjectImput = document.querySelector('.aoT')
      subjectImput.focus()
    }, 500)
  }
}
// end AddTask block


/***/ }),

/***/ "./gmail/threadInfoBlock.js":
/*!**********************************!*\
  !*** ./gmail/threadInfoBlock.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   refreshThreadInfo: () => (/* binding */ refreshThreadInfo)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./gmail/index.js");
 // todo: refactor

const thrState = {
  threadId: null,
  activeLayout: null,
  links: {
    thread: null,
    infoBlock: null, // no need, may delete?
    otherThreads: null,
    attachments: null,
    bills: null,
    notice: null,
  },
  data: {
    otherThreads: null,
    attachments: null,
    bills: null,
    notice: null,
  },
  cache: {},
}
thrState.data = new Proxy(thrState.data, {
  set: (target, prop, value) => {
    target[prop] = value
    refreshValue(prop)
    return true
  },
})
function refreshThreadInfo(threadNode) {
  thrState.links.thread = threadNode
  const activeLayout = document.querySelector('.bGI[role="main"]')
  if (activeLayout !== thrState.activeLayout) {
    // сменили категорию
    thrState.activeLayout = activeLayout
    thrState.links.infoBlock = activeLayout.querySelector('.threadInfoBlock') || createThreadInfoBlock()
    thrState.links.otherThreads = thrState.links.infoBlock.querySelector('.otherThreadsHolder')
    thrState.links.attachments = thrState.links.infoBlock.querySelector('.attachmentsHolder')
    thrState.links.bills = thrState.links.infoBlock.querySelector('.billsHolder')
    thrState.links.notice = thrState.links.infoBlock.querySelector('.noticeInput')
  }
  thrState.threadId = thrState.activeLayout.querySelector('h2.hP').getAttribute('data-legacy-thread-id')

  if (!checkCache()) getThreadData()
}
function createThreadInfoBlock() {
  const otherThreads = document.createElement('div')
  otherThreads.className = 'otherThreadsBlock'
  otherThreads.title = 'Другие цепочки'
  otherThreads.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M280-280q-33 0-56.5-23.5T200-360v-400q0-33 23.5-56.5T280-840h560q33 0 56.5 23.5T920-760v400q0 33-23.5 56.5T840-280H280Zm280-188L280-663v303h560v-303L560-468Zm0-98 280-194H280l280 194ZM120-120q-33 0-56.5-23.5T40-200v-500h80v500h660v80H120Zm720-546v-94H280v94-94h560v94Z"/></svg><div class="otherThreadsHolder"></div>'
  otherThreads.addEventListener('click', _index_js__WEBPACK_IMPORTED_MODULE_0__.findThreads)

  const attachments = document.createElement('div')
  attachments.className = 'attachmentsBlock'
  attachments.title = 'Вложения'
  attachments.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M720-330q0 104-73 177T470-80q-104 0-177-73t-73-177v-370q0-75 52.5-127.5T400-880q75 0 127.5 52.5T580-700v350q0 46-32 78t-78 32q-46 0-78-32t-32-78v-370h80v370q0 13 8.5 21.5T470-320q13 0 21.5-8.5T500-350v-350q-1-42-29.5-71T400-800q-42 0-71 29t-29 71v370q-1 71 49 120.5T470-160q70 0 119-49.5T640-330v-390h80v390Z"/></svg><div class="attachmentsHolder"></div><div class=menu></div>'

  const bills = document.createElement('div')
  bills.className = 'billsBlock'
  bills.title = 'Счета'
  bills.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M240-80q-50 0-85-35t-35-85v-120h120v-560h600v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-600H320v480h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h360v80H360Zm0 120v-80h360v80H360ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm0 0h-40 400-360Z"/></svg><div class="billsHolder"></div><div class=menu></div>'

  const notice = document.createElement('div')
  notice.className = 'noticeBlock'
  notice.innerHTML = '<input type="text" class="noticeInput" />'

  const testButton = document.createElement('button')
  testButton.className = 'testButton'
  testButton.innerHTML = 'test'
  testButton.style = 'z-index: 1; cursor: pointer;'

  testButton.addEventListener('click', () => {
    console.log(`thrState.cache: ${JSON.stringify(thrState.cache, null, 2)}`)
    // console.log(`threadNode = `, threadNode)
    // const foldButton = threadNode.querySelectorAll('.pYTkkf-JX-I.pYTkkf-JX-I-ql-ay5-ays.bHI ')[1]
    // console.log(`foldButton = `, foldButton)
    // if (foldButton.getAttribute('aria-label') === 'Развернуть все') foldButton.click()
  })

  const infoBlock = document.createElement('div')
  infoBlock.className = 'threadInfoBlock'
  infoBlock.append(otherThreads, attachments, bills, notice, testButton)

  const threadMenuBlock = thrState.activeLayout.querySelector('.aqL')
  // console.log(`threadMenuBlock = `, threadMenuBlock)
  threadMenuBlock.after(infoBlock)

  return infoBlock
}
function resetThreadInfo() {
  thrState.data.otherThreads = null
  thrState.data.attachments = null
  thrState.data.bills = null
  thrState.data.notice = null
}
function refreshValue(prop) {
  console.log(`from refreshValue thrState.data.${prop}: ${JSON.stringify(thrState.data[prop], null, 2)}`)
  const link = thrState.links[prop]
  const data = thrState.data[prop]
  switch (prop) {
    case 'otherThreads':
      link.innerHTML = data !== null ? data : '...'
      break

    case 'attachments':
      link.innerHTML = data !== null ? data.length : '...'
      break

    case 'bills':
      if (data === null) {
        link.innerHTML = '···'
        link.nextElementSibling.innerHTML = '' // remove menu
      } else {
        link.innerHTML = data.length
        createBillMenu()
      }
      break

    case 'notice':
      link.value = data !== null ? data : 'wait...'
      break
  }
}
function createBillMenu() {
  const bills = thrState.data.bills
  if (bills.length === 0) return
  const menuBlock = thrState.links.bills.nextElementSibling
  const billsWrapper = document.createElement('div')
  billsWrapper.className = 'billsWrapper'
  const currentYear = new Date().getFullYear().toString() // чтобы не вычислять для каждого счета

  bills.forEach(bill => {
    let customerBill = document.createElement('a')
    customerBill.className = 'bill'

    if (bill.paidPercent) {
      if (bill.shipPercent < 100) customerBill.classList.add('inProgress')
      else customerBill.classList.add('closed')
    } else {
      if (bill.shipPercent) customerBill.classList.add('waitingPayment')
    }

    // сформируем ссылку на счет. Для этого нужно знать год счета (счета прошлых лет лежат в отдельных папках)
    const billYear = bill.date.slice(-4)
    let billFolder = ''
    if (billYear !== currentYear) billFolder = billYear + '/'
    customerBill.href = `http://localhost/bills1c/${billFolder}%D0%A1%D1%87%D0%B5%D1%82%20%D0%BD%D0%B0%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D1%83%20%E2%84%96%20${bill.number}%20%D0%BE%D1%82%20${bill.date}.pdf`
    // console.log('billURL: ', billURL);
    customerBill.innerText = `Счет на оплату № ${bill.number} от ${bill.date}`
    billsWrapper.append(customerBill)
  })
  menuBlock.append(billsWrapper)
}
async function getThreadData() {
  resetThreadInfo()
  const currentThreadId = thrState.threadId // для отмены запроса
  const response = await fetch(_index_js__WEBPACK_IMPORTED_MODULE_0__.config.googleScriptUrl2, {
    method: 'post',
    body: JSON.stringify({
      GAS_API: _index_js__WEBPACK_IMPORTED_MODULE_0__.config.googleScriptPassword2,
      method: 'getThreadInfo',
      data: thrState.threadId,
    }),
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
  })
  const googleData = (await response.json()).response

  if (currentThreadId !== thrState.threadId) return

  thrState.data.otherThreads = googleData.otherThreads
  thrState.data.attachments = googleData.attachments
  thrState.data.notice = googleData.notice

  // получаем счета из 1С по одному полученному счету из googleData
  if (googleData.bill) {
    // запрос в 1с
    const response = await fetch(_index_js__WEBPACK_IMPORTED_MODULE_0__.config.oneCUrl + 'getCustomerBills', {
      method: 'POST',
      body: JSON.stringify({
        number: googleData.bill.number,
        date: googleData.bill.date,
        password: _index_js__WEBPACK_IMPORTED_MODULE_0__.config.oneCPassword,
      }),
    })
    if (currentThreadId !== thrState.threadId) return
    thrState.data.bills = await response.json()
  } else thrState.data.bills = []
  setToCache()
}
function checkCache() {
  const cached = thrState.cache[thrState.threadId]
  if (!cached) return false
  thrState.data.attachments = cached.attachments
  thrState.data.bills = cached.bills
  thrState.data.notice = cached.notice
  thrState.data.otherThreads = cached.otherThreads
  return true
}
function setToCache() {
  thrState.cache[thrState.threadId] = {
    attachments: [...thrState.data.attachments],
    bills: [...thrState.data.bills],
    notice: thrState.data.notice,
    otherThreads: thrState.data.otherThreads,
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./gmail/index.js");
/******/ 	
/******/ })()
;