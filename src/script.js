const left = document.querySelector(".left"),
    right = document.querySelector(".right"),
    bar = document.querySelector(".bar"),
    editor = document.querySelector(".editor"),
    run = document.querySelector(".btn-run"),
    iframe = document.querySelector(".iframe"),
    darkMode = document.querySelector(".btn-dark"),
    lightMode = document.querySelector(".btn-light");

const drag = (e) => {
    e.preventDefault();
    document.selection ? document.selection.empty() : window.getSelection().removeAllRanges();
    left.style.width = (e.pageX - bar.offsetWidth / 3) + "px";
    editor.resize();
}

bar.addEventListener("mousedown", () => { document.addEventListener("mousemove", drag); } )

bar.addEventListener("mouseup", () => { document.removeEventListener("mousemove", drag); } )

run.addEventListener("click", () => {
    const html = editor.textContent;
    iframe.src = "data:text/html;charset=utf-8," + encodeURI (html);
})

darkMode.addEventListener("click", () => {
    editor.style.backgroundColor = "#3d3051";
    editor.style.color = "#eee";
})

lightMode.addEventListener("click", () => {
    editor.style.backgroundColor = "#c3aae9";
    editor.style.color = "#3d3051";
})