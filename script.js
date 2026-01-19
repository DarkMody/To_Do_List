document.addEventListener("DOMContentLoaded", () => {
  let add = document.getElementById("add");
  let cnt;
  let root = document.documentElement;

  if (localStorage.getItem("cnt")) {
    cnt = parseInt(localStorage.getItem("cnt"));
  } else {
    cnt = 0;
    localStorage.setItem("cnt", cnt);
  }

  // localStorage.clear();
  // Get Elements from the LocalStorage //
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(i)) {
      let save = document.createElement("div");
      let sp = document.createElement("span");
      sp.innerHTML = localStorage.getItem(i);
      save.appendChild(sp);
      sp = document.createElement("button");
      sp.className = "delete";
      sp.innerHTML = "Delete";
      save.appendChild(sp);
      document.getElementById("collect").appendChild(save);
    }
  }
  add.onclick = function () {
    let text = document.getElementById("text");
    if (text.value != "") {
      let save = document.createElement("div");
      let sp = document.createElement("span");
      sp.innerHTML = text.value;
      save.appendChild(sp);
      sp = document.createElement("button");
      sp.className = "delete";
      sp.innerHTML = "Delete";
      save.appendChild(sp);
      document.getElementById("collect").appendChild(save);
      let s = text.value;
      window.localStorage.setItem(cnt++, s);
      localStorage.setItem("cnt", cnt);
      text.value = "";
    }
  };
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      let state = false;
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(i)) {
          if (state) {
            localStorage.setItem(i - 1, localStorage.getItem(i));
            localStorage.removeItem(i);
          } else if (
            localStorage.getItem(i) ==
            e.target.parentElement.querySelector("span").textContent
          ) {
            state = true;
            localStorage.removeItem(i);
            cnt--;
            localStorage.setItem("cnt", cnt);
          }
        }
      }
      e.target.parentElement.remove();
    }
  });

  let color = document.getElementById("color").querySelectorAll("button");
  Array.from(color).forEach(function (ele) {
    ele.style.backgroundColor = ele.id;
    ele.onclick = function () {
      Array.from(color).forEach(function (el) {
        el.classList.remove("active");
      });
      ele.classList.add("active");
      localStorage.setItem("color", ele.id);
      root.style.setProperty("--main-color", ele.id);
    };
  });
  if (localStorage.getItem("color")) {
    Array.from(color).forEach(function (el) {
      el.classList.remove("active");
      if (localStorage.getItem("color") == el.id) {
        el.classList.add("active");
        root.style.setProperty("--main-color", el.id);
      }
    });
  } else {
    localStorage.setItem("color", "#eb4d4b");
  }

  window.addEventListener("keydown", (eve) => {
    if (eve.key == "Enter") {
      add.click();
    }
  });
});
