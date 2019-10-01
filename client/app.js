
(function () {
    const autoInput = document.getElementById('autocomplete-input');

    autoInput.addEventListener("keyup", (ele) => {
        // remoteCall(ele.target.value);
        // throttle(remoteCall, 300)(ele.target.value);
        debounce(remoteCall, 300)(ele.target.value);
    })
    const remoteCall = async (input) => {
        let response = await fetch(`/api/autocomplete/${input}`);
        let data = await response.json();
        let content = document.getElementById('dropdownContent');
        content.innerHTML = '';
        // if (!input) {
        //     document.querySelector('is-loading').innerHTML.style.display = 'none';
        // }
        if (!data.suggestions) {
            return;
        }
        data.suggestions.forEach(item => {
            content.insertAdjacentHTML('beforeend', `<a href="#" class="dropdown-item"> ${item.label}</a>`);

        })
        console.log(data);
    }

}());
let inDebounce;
let inThrottle;

const debounce = (func, delay) => {
    return function () {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}
const throttle = (func, limit) => {
    return function () {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}