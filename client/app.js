(function() {
  const autoInput = document.getElementById("autocomplete-input");

  autoInput.addEventListener("keyup", keyPressed => {
    // remoteCall(ele.target.value);
    // throttle(remoteCall, 300)(ele.target.value);
    debounce(remoteCall, 300)(keyPressed.target.value);
  });
  const remoteCall = async input => {
    let content = document.getElementById("dropdownContent");
    content.innerHTML = "";
    let triggerDrop = document.getElementById("dropdown-menu");
    triggerDrop.classList.add("is-hidden");
    const response = await fetch(`/api/autocomplete/${input}`);
    const data = await response.json();
    const control = document.getElementById("control");
    control.classList.remove("is-loading");
    if (!data.suggestions) {
      triggerDrop.classList.add("is-hidden");
      return;
    }
    data.suggestions.forEach(item => {
      triggerDrop.classList.remove("is-hidden");
      content.insertAdjacentHTML(
        "beforeend",
        `<a href="#" class="dropdown-item"> ${item.label}</a>`
      );
    });
    console.log(data);
  };
})();
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
