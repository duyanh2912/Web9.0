document.getElementById("js-text-input").addEventListener("input", (e) => {
        const input = e.target.value.length;
        const maxChars = e.target.maxLength;
        document.getElementById("js-remaining-chars").innerText = (maxChars - input).toString();
    }
);
