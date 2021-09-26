const billAmountInput = document.querySelector('input#bill');
const tipButtons = document.querySelectorAll('.tip-input button');
const customTipInput = document.querySelector('.custom-tip-input');
const numberOfPeopleInput = document.querySelector('input#number-of-people');
const tipValueOutput = document.querySelector('.tip-value');
const totalValueOutput = document.querySelector('.total-value');
const resetButton = document.querySelector('.reset-btn');
const errorStatePeople = document.querySelector('.error-people');
const errorStateBill = document.querySelector('.error-bill');
let billAmount;
let tipAmount;
let numberOfPeople;
let tipAmountPerPerson;
let total;


//Updating bill amount
billAmountInput.addEventListener('input', (event) => {
    billAmount = event.target.value;
    // Error State
    if(event.target.value === '0') {
        errorStateBill.style.visibility = 'visible';
        document.querySelector('.bill .input-form').classList.add('error-input-form')
    } else {
        errorStateBill.style.visibility = 'hidden';
        document.querySelector('.bill .input-form').classList.remove('error-input-form');
    }
    resetButton.classList.add('reset-btn-active');
    calculateResults(billAmount,tipAmount,numberOfPeople);
})
billAmountInput.onfocus = () => {
    document.querySelector('.bill .input-form').classList.add('active-input-form');
}
billAmountInput.onblur = () => {
    document.querySelector('.bill .input-form').classList.remove('active-input-form');
}

// Updating tip amount
tipButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if(customTipInput.value) {
            customTipInput.value = '';
        }
        button.classList.toggle('unselected-tip');
        button.classList.toggle('selected-tip');

        tipButtons.forEach(btn => {
            if(event.target !== btn) {
                btn.classList.remove('selected-tip');
                btn.classList.add('unselected-tip');
            }
        })

        tipAmount = parseTipAmount(button);
        resetButton.classList.add('reset-btn-active');
        calculateResults(billAmount,tipAmount,numberOfPeople);
    })
})
customTipInput.onclick = () => {
    if(document.querySelector('.selected-tip')) {
        document.querySelector('.selected-tip').classList.add('unselected-tip');
        document.querySelector('.selected-tip').classList.remove('selected-tip');
    }
}
customTipInput.addEventListener('input', () => {
    tipAmount = customTipInput.value;
    resetButton.classList.add('reset-btn-active');
    calculateResults(billAmount,tipAmount,numberOfPeople);
})


// Updating number of people
numberOfPeopleInput.addEventListener('input', (event) => {
    numberOfPeople = Number(event.target.value);
    console.log(`Number of People is ${numberOfPeople}`);
    resetButton.classList.add('reset-btn-active');

    // Error State
    if(event.target.value === '0') {
        errorStatePeople.style.visibility = 'visible';
        document.querySelector('.number-people .input-form').classList.add('error-input-form')
        
    } else {
        errorStatePeople.style.visibility = 'hidden';
        document.querySelector('.number-people .input-form').classList.remove('error-input-form');
    }

    calculateResults(billAmount,tipAmount,numberOfPeople);
})
numberOfPeopleInput.onfocus = () => {
    document.querySelector('.number-people .input-form').classList.add('active-input-form');
}
numberOfPeopleInput.onblur = () => {
    document.querySelector('.number-people .input-form').classList.remove('active-input-form');
}

// Reseting
resetButton.addEventListener('click', () => {
    reset();
})



const parseTipAmount = (tipBtn) => {
    const tip = tipBtn.firstChild.textContent;
    if(tip.length > 2) {
        return Number(tip.slice(0,2));
    } else {
        return Number(tip.slice(0,1));
    }
}

const calculateResults = (billAmount, tipAmount, numberOfPeople) => {
    if(billAmount && tipAmount && numberOfPeople) {
        const billPerPerson = billAmount / numberOfPeople;
        const tipPerPerson = customTipInput.value ? (Number(customTipInput.value) / numberOfPeople) : (tipAmount/100) * billAmount / numberOfPeople;
        const totalPerPerson = tipPerPerson + billPerPerson;
        renderResults(parseResults(tipPerPerson.toString()), parseResults(totalPerPerson.toString()));
    }
    
    
    
}

const renderResults = (tip,total) => { 
        tipValueOutput.innerHTML = `$${tip}`;
        totalValueOutput.innerHTML = `$${total}`;
}

const reset = () => {
    billAmountInput.value = '';

    if(document.querySelector('.selected-tip')) {
        document.querySelector('.selected-tip').classList.add('unselected-tip');
        document.querySelector('.selected-tip').classList.remove('selected-tip');
    }

    customTipInput.value = '';
    numberOfPeopleInput.value = '';
    tipValueOutput.innerHTML = '$0.00';
    totalValueOutput.innerHTML = '$0.00';

    billAmount = 0;
    tipAmount = 0;
    numberOfPeople = 0;
    
    resetButton.classList.remove('reset-btn-active');
    errorStatePeople.style.visibility = 'hidden';
}

const parseResults = (result) => {
        const resultSubstrings = result.split('.');
        const leftDecimal = resultSubstrings[0];
        const rightDecimal = resultSubstrings[1] ? resultSubstrings[1].slice(0,2) : '00';
        return `${leftDecimal}.${rightDecimal}`;      

}