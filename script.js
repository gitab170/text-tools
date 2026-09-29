// ==============================
// Text Tools - Main Script
// ==============================

// 要素取得
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");


// ==============================
// タブ切り替え
// ==============================

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        const target = tab.dataset.tab;

        tabs.forEach(item => {
            item.classList.remove("active");
        });

        tabContents.forEach(content => {
            content.classList.remove("active");
        });

        tab.classList.add("active");

        const targetContent = document.getElementById(target);

        if (targetContent) {
            targetContent.classList.add("active");
        }
    });
});


// ==============================
// テキスト解析
// ==============================

function updateAnalysis() {

    const text = inputText.value;

    // 文字数
    document.getElementById("charCount").textContent =
        [...text].length;

    // 行数
    document.getElementById("lineCount").textContent =
        text === "" ? 0 : text.split(/\r?\n/).length;

    // UTF-8バイト数
    const byteCount = new TextEncoder().encode(text).length;

    document.getElementById("byteCount").textContent =
        byteCount;

    // 空白数
    const spaces = text.match(/\s/g);

    document.getElementById("spaceCount").textContent =
        spaces ? spaces.length : 0;
}

inputText.addEventListener("input", updateAnalysis);


// ==============================
// クリア
// ==============================

clearButton.addEventListener("click", () => {

    inputText.value = "";
    outputText.value = "";

    updateAnalysis();
});


// ==============================
// コピー
// ==============================

copyButton.addEventListener("click", async () => {

    const text = outputText.value;

    if (!text) {
        return;
    }

    try {

        await navigator.clipboard.writeText(text);

        const originalText = copyButton.textContent;

        copyButton.textContent = "コピーしました";

        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 1200);

    } catch (error) {

        // Clipboard APIが使えない場合
        outputText.select();
        document.execCommand("copy");
    }
});


// ==============================
// 初期状態
// ==============================

updateAnalysis();
