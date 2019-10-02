let autoInput = document.getElementById("autocomplete-input");
let content = document.getElementById("dropdownContent");
let triggerDrop = document.getElementById("dropdown-menu");
let control = document.getElementById("control");

(function() {
  autoInput.addEventListener("keyup", input => {
    // remoteCall(ele.target.value);
    // throttle(remoteCall, 300)(ele.target.value);
    control.classList.add("is-loading");
    debounce(remoteCall, 300)(input.target.value);
  });
  const remoteCall = async input => {
    content.innerHTML = "";
    triggerDrop.classList.add("is-hidden");

    const response = await fetch(`/api/autocomplete/${input}`);
    const data = await response.json();

    control.classList.remove("is-loading");

    if (!data.suggestions) {
      triggerDrop.classList.add("is-hidden");
      return;
    }
    data.suggestions.forEach(item => {
      triggerDrop.classList.remove("is-hidden");
      content.insertAdjacentHTML(
        "beforeend",
        `<a href="#" onClick="setInputValue(this)" class="dropdown-item"> ${item.label}</a>`
      );
    });
    console.log(data);
  };
  let inDebounce;
  let inThrottle;

  const debounce = (func, delay) => {
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };
  const throttle = (func, limit) => {
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };
})();
function setInputValue(input) {
  autoInput.value = input.innerText;
  content.innerHTML = "";
  triggerDrop.classList.add("is-hidden");
}
