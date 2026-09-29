// ==============================
// Text Tools - Main Script
// ==============================

// ---------- DOM ----------
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");

// ---------- 基本処理 ----------
function getInput() {
    return inputText.value;
}

function setOutput(text) {
    outputText.value = text;
    updateAnalysis();
}

function updateAnalysis() {
    const text = getInput();

    document.getElementById("charCount").textContent =
        [...text].length;

    document.getElementById("lineCount").textContent =
        text === "" ? 0 : text.split("\n").length;

    document.getElementById("byteCount").textContent =
        new TextEncoder().encode(text).length;

    document.getElementById("spaceCount").textContent =
        (text.match(/\s/g) || []).length;
}

// ---------- 変換ツール ----------

// ひらがな → カタカナ
function hiraganaToKatakana(text) {
    return text.replace(/[\u3041-\u3096]/g, char =>
        String.fromCharCode(char.charCodeAt(0) + 0x60)
    );
}

// カタカナ → ひらがな
function katakanaToHiragana(text) {
    return text.replace(/[\u30A1-\u30F6]/g, char =>
        String.fromCharCode(char.charCodeAt(0) - 0x60)
    );
}

// 大文字 → 小文字
function toLowerCase(text) {
    return text.toLowerCase();
}

// 小文字 → 大文字
function toUpperCase(text) {
    return text.toUpperCase();
}

// 全角 → 半角
function fullToHalf(text) {
    return text.replace(/[！-～]/g, char =>
        String.fromCharCode(char.charCodeAt(0) - 0xFEE0)
    );
}

// 半角 → 全角
function halfToFull(text) {
    return text.replace(/[!-~]/g, char =>
        String.fromCharCode(char.charCodeAt(0) + 0xFEE0)
    );
}

// 文字列を逆順
function reverseText(text) {
    return [...text].reverse().join("");
}

// ---------- 加工ツール ----------

// 空白を削除
function removeSpaces(text) {
    return text.replace(/\s/g, "");
}

// 空行を削除
function removeEmptyLines(text) {
    return text
        .split("\n")
        .filter(line => line.trim() !== "")
        .join("\n");
}

// 重複行を削除
function removeDuplicateLines(text) {
    return [...new Set(text.split("\n"))].join("\n");
}

// 行を逆順
function reverseLines(text) {
    return text.split("\n").reverse().join("\n");
}

// 行をシャッフル
function shuffleLines(text) {
    const lines = text.split("\n");

    for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
    }

    return lines.join("\n");
}

// ---------- エンコード ----------

// Base64 エンコード
function base64Encode(text) {
    const bytes = new TextEncoder().encode(text);

    let binary = "";
    bytes.forEach(byte => {
        binary += String.fromCharCode(byte);
    });

    return btoa(binary);
}

// Base64 デコード
function base64Decode(text) {
    try {
        const binary = atob(text);
        const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));

        return new TextDecoder().decode(bytes);
    } catch {
        return "Base64として正しくありません。";
    }
}

// URL エンコード
function urlEncode(text) {
    return encodeURIComponent(text);
}

// URL デコード
function urlDecode(text) {
    try {
        return decodeURIComponent(text);
    } catch {
        return "URLエンコードされた文字列として正しくありません。";
    }
}

// HTML エンコード
function htmlEncode(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// HTML デコード
function htmlDecode(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}

// ---------- 文字コード ----------

// ASCII コード
function asciiCode(text) {
    return [...text]
        .map(char => {
            const code = char.charCodeAt(0);

            if (code <= 127) {
                return `${char} → ${code}`;
            }

            return `${char} → ASCII対象外`;
        })
        .join("\n");
}

// Unicode コードポイント
function unicodeCodePoint(text) {
    return [...text]
        .map(char =>
            `${char} → U+${char.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`
        )
        .join("\n");
}

// Unicode エスケープ
function unicodeEscape(text) {
    return [...text]
        .map(char => {
            const code = char.codePointAt(0);

            if (code <= 0xFFFF) {
                return "\\u" + code.toString(16).padStart(4, "0");
            }

            return "\\u{" + code.toString(16) + "}";
        })
        .join("");
}

// UTF-8 バイト列
function utf8Bytes(text) {
    return [...new TextEncoder().encode(text)]
        .map(byte => byte.toString(16).toUpperCase().padStart(2, "0"))
        .join(" ");
}

// ---------- ツール管理 ----------

const tools = {

    // 変換
    "hiragana-katakana": hiraganaToKatakana,
    "katakana-hiragana": katakanaToHiragana,
    "lowercase": toLowerCase,
    "uppercase": toUpperCase,
    "full-half": fullToHalf,
    "half-full": halfToFull,
    "reverse": reverseText,

    // 加工
    "remove-spaces": removeSpaces,
    "remove-empty-lines": removeEmptyLines,
    "remove-duplicate-lines": removeDuplicateLines,
    "reverse-lines": reverseLines,
    "shuffle-lines": shuffleLines,

    // エンコード
    "base64-encode": base64Encode,
    "base64-decode": base64Decode,
    "url-encode": urlEncode,
    "url-decode": urlDecode,
    "html-encode": htmlEncode,
    "html-decode": htmlDecode,

    // 文字コード
    "ascii": asciiCode,
    "unicode-codepoint": unicodeCodePoint,
    "unicode-escape": unicodeEscape,
    "utf8-bytes": utf8Bytes
};

// ---------- ツール実行 ----------

function runTool(toolId) {

    const tool = tools[toolId];

    if (!tool) {
        return;
    }

    const input = getInput();
    const result = tool(input);

    setOutput(result);
}

// ---------- ボタン自動認識 ----------

document.querySelectorAll("[data-tool]").forEach(button => {

    button.addEventListener("click", () => {

        const toolId = button.dataset.tool;

        runTool(toolId);

    });

});

// ---------- クリア ----------

clearButton.addEventListener("click", () => {

    inputText.value = "";
    outputText.value = "";

    updateAnalysis();

});

// ---------- コピー ----------

copyButton.addEventListener("click", async () => {

    if (outputText.value === "") {
        return;
    }

    await navigator.clipboard.writeText(outputText.value);

});

// ---------- タブ切り替え ----------

document.querySelectorAll(".tab").forEach(tab => {

    tab.addEventListener("click", () => {

        document.querySelectorAll(".tab").forEach(t =>
            t.classList.remove("active")
        );

        document.querySelectorAll(".tab-content").forEach(content =>
            content.classList.remove("active")
        );

        tab.classList.add("active");

        const target = document.getElementById(
            tab.dataset.tab
        );

        if (target) {
            target.classList.add("active");
        }

    });

});

// ---------- 入力時に解析 ----------

inputText.addEventListener("input", updateAnalysis);

// 初期解析
updateAnalysis();
