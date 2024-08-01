document.getElementById('copy').onclick = () => {
    let textbox = document.getElementById('textbox')
    alert(textbox.value)
    navigator.clipboard.writeText(textbox.value)
}
