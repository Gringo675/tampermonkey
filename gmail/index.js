/**
 * todo:
 * rewrite snippets
 */

// @ts-ignore
window.config = useConfig()
console.log(`config: ${JSON.stringify(config, null, 2)}`)
const aaa = 111
// added 07.03.24 to settle Trusted-Types errorrs
if (window.trustedTypes && window.trustedTypes.createPolicy) {
  window.trustedTypes.createPolicy('default', {
    createHTML: string => string,
    createScriptURL: string => string,
    createScript: string => string,
  })
}

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
          //   console.log(mutation)
          //генерируем событие
          let event = new Event('onNewThreadOpen', { bubbles: true })
          addedNode.dispatchEvent(event)
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
          console.log(`Найти все письма`)
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
  // сниппеты при составлении письма
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

  // snippets block
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

  // начальные значения
  window.areSnippetsActive = false
  window.mustCreateCustomerBlock = false

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
document.addEventListener('onNewThreadOpen', function (event) {
  //   console.log('Открыта цепочка = ', event.target)
  let thrNode = event.target
  createButtonFindAll(thrNode)
  // setTimeout(createButtonFindAll, 2000, thrNode) // сразу нельзя, подгружается динамически
  //test(thrNode);
})

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
function findThreads() {
  // let activeMsg = document.querySelector('div.BltHke[role="main"] div.h7');
  let activeMsg = document.querySelector('div.bGI[role="main"] div.h7')
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
  await new Promise(resolve => setTimeout(resolve, 8000))
  const iconbar = document.elementFromPoint(document.documentElement.clientWidth / 2, 1)?.children[1]?.children[2]
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
