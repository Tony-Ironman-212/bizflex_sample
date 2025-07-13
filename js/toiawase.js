const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// định nghĩa function onOffError
function onOffError(x) {
  if (x) {
    this.closest('.input-group').classList.remove('text-red-600');
    this.closest('.input-group')
      .querySelector('.input-group__require')
      .classList.remove('error');
  } else {
    this.closest('.input-group').classList.add('text-red-600');
    this.closest('.input-group')
      .querySelector('.input-group__require')
      .classList.add('error');
  }
}

// Logic xử lý khi click vào 12 thẻ input
// khi click vào 1 trong 12 thẻ input thì sẽ xử lý như sau:
const checkboxInputs = $$('input[type="checkbox"]');
const buildingInputs = Array.from(checkboxInputs).slice(0, 6);
checkboxInputs.forEach((checkboxInput, index) => {
  checkboxInput.addEventListener('click', function () {
    this.parentElement.classList.toggle('text-indigo-600');

    // xét validation cho trường input đó
    if (index < 6) {
      const isAnyChecked = buildingInputs.some((input) => input.checked);
      onOffError.call(this, isAnyChecked);
    }
    if (index == 11) {
      onOffError.call(this, this.checked);
    }
  });
});

// Logic xử lý chọn option rồi gán giá trị cho ô input
// khi click vào ô input thì sẽ hiện ra danh sách option, click lại vào ô thì ẩn đi
// Ngoài ra, khi click vào bất kỳ vị trí nào khác trên màn hình ngoài ô input thí danh sách option cũng sẽ ẩn đi

const selectInputs = $$('input[placeholder="選択"]');
selectInputs.forEach((selectInput) => {
  let optionList = selectInput.parentElement.querySelector('div');
  selectInput.addEventListener('click', function (e) {
    optionList.classList.toggle('hidden');
  });
  document.addEventListener('click', function (e) {
    if (!selectInput.contains(e.target)) {
      optionList.classList.add('hidden');
    }
  });

  let optionItems = optionList.querySelectorAll('li');
  optionItems.forEach(function (optionItem) {
    optionItem.addEventListener('click', function (e) {
      selectInput.value = this.textContent;
      optionItems.forEach(function (item) {
        item.classList.remove('selecting');
      });
      this.classList.add('selecting');
      onOffError.call(selectInput, true);
    });
  });
});

// Logic xử lý các ô input có type là text, khi blur ra nếu không có giá trị sẽ hiện thông báo lỗi
const inputs = $$('input');
const textInputs = Array.from(inputs).slice(11, 15);
textInputs.forEach((textInput) => {
  textInput.addEventListener('blur', function () {
    onOffError.call(this, this.value !== '');
  });
  textInput.addEventListener('input', function () {
    onOffError.call(this, this.value !== '');
  });
});

// logic xử lý khi click nút gửi
// nếu có bất kỳ ô input nào không hợp lệ thì sẽ không bấm gửi được
// mà thay vào đó là sẽ hiện thông báo lỗi cho ô input đó
// Tất cả ô input đều hợp lệ thì mới gửi được
// cách làm:
// tạo event click cho nút gửi
// B1: kiểm tra trường building có hợp lệ hay không (hợp lệ là có ít nhất 1 ô input được chọn)
// B2: Kiểm tra các trường input type text đã có value hay chưa, nếu chưa thì hiện thông báo lỗi cho ô input đó
// B3: Kiểm tra trường option đã được chọn hay chưa, nếu chưa thì hiện thông báo lỗi cho ô input đó
// B4: Nếu tất cả các trường đều hợp lệ thì sẽ gửi form
const submitButton = $('button');
submitButton.addEventListener('click', function (e) {
  e.preventDefault(); // ngăn chặn hành động mặc định của nút submit
  let isSubmitValid;
  let buildingValidResult = false;
  let companyValidResult = false;
  let nameValidResult = false;
  let emailValidResult = false;
  let phoneValidResult = false;
  let areaValidResult = false;
  let entryTimeValidResult = false;
  let agreeValidResult = false;

  // B1: Kiểm tra trường building
  buildingValidResult = buildingInputs.some((input) => input.checked);
  if (!buildingValidResult) {
    buildingInputs.forEach((input) => {
      onOffError.call(input, false);
    });
  }

  // B2 Kiểm tra trường input company
  companyValidResult = textInputs[0].value !== '' ? true : false;
  if (!companyValidResult) {
    onOffError.call(textInputs[0], false);
  }

  // B3 Kiểm tra trường input name
  nameValidResult = textInputs[1].value !== '' ? true : false;
  if (!nameValidResult) {
    onOffError.call(textInputs[1], false);
  }

  // B4 Kiểm tra trường input email
  emailValidResult = textInputs[2].value !== '' ? true : false;
  if (!emailValidResult) {
    onOffError.call(textInputs[2], false);
  }

  // B5 Kiểm tra trường input phone
  phoneValidResult = textInputs[3].value !== '' ? true : false;
  if (!phoneValidResult) {
    onOffError.call(textInputs[3], false);
  }

  // B6 Kiểm tra trường input area
  areaValidResult = selectInputs[0].value !== '' ? true : false;
  if (!areaValidResult) {
    onOffError.call(selectInputs[0], false);
  }

  // B7 Kiểm tra trường input entry time
  entryTimeValidResult = selectInputs[1].value !== '' ? true : false;
  if (!entryTimeValidResult) {
    onOffError.call(selectInputs[1], false);
  }

  // B8 Kiểm tra trường checkbox agree
  agreeValidResult = checkboxInputs[11].checked ? true : false;
  if (!agreeValidResult) {
    onOffError.call(checkboxInputs[11], false);
  }

  const validCheckResultLists = [
    buildingValidResult,
    companyValidResult,
    nameValidResult,
    emailValidResult,
    phoneValidResult,
    areaValidResult,
    entryTimeValidResult,
    agreeValidResult,
  ];

  console.log(validCheckResultLists);

  isSubmitValid = validCheckResultLists.every(function (result, index) {
    return result === true;
  });

  if (isSubmitValid) {
    console.log('Form submitted successfully!');
  } else {
    console.log('Form submission failed vì có lỗi');
  }
});
