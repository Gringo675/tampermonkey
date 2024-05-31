import { findThreads, config } from './index.js' // todo: refactor

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
export function refreshThreadInfo(threadNode) {
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
  otherThreads.addEventListener('click', findThreads)

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
  const response = await fetch(config.googleScriptUrl2, {
    method: 'post',
    body: JSON.stringify({
      GAS_API: config.googleScriptPassword2,
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
    const response = await fetch(config.oneCUrl + 'getCustomerBills', {
      method: 'POST',
      body: JSON.stringify({
        number: googleData.bill.number,
        date: googleData.bill.date,
        password: config.oneCPassword,
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
