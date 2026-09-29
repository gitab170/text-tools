// ==============================
// Text Tools
// ==============================

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
// 解析
// ==============================

function updateAnalysis() {
    const text = inputText.value;

    document.getElementById("charCount").textContent =
        [...text].length;

    document.getElementById("lineCount").textContent =
        text === "" ? 0 : text.split(/\r?\n/).length;

    document.getElementById("byteCount").textContent =
        new TextEncoder().encode(text).length;

    const spaces = text.match(/\s/g);

    document.getElementById("spaceCount").textContent =
        spaces ? spaces.length : 0;
}

inputText.addEventListener("input", updateAnalysis);


// ==============================
// 結果を表示
// ==============================

function showResult(text) {
    outputText.value = text;
}


// ==============================
// ひらがな → カタカナ
// ==============================

function hiraganaToKatakana(text) {
    return text.replace(/[\u3041-\u3096]/g, char =>
        String.fromCharCode(char.charCodeAt(0) + 0x60)
    );
}


// ==============================
// カタカナ → ひらがな
// ==============================

function katakanaToHiragana(text) {
    return text.replace(/[\u30A1-\u30F6]/g, char =>
        String.fromCharCode(char.charCodeAt(0) - 0x60)
    );
}


// ==============================
// 大文字 → 小文字
// ==============================

function toLowerCase(text) {
    return text.toLowerCase();
}


// ==============================
// 小文字 → 大文字
// ==============================

function toUpperCase(text) {
    return text.toUpperCase();
}


// ==============================
// 全角英数字 → 半角
// ==============================

function fullWidthToHalfWidth(text) {
    return text.replace(/[！-～]/g, char =>
        String.fromCharCode(char.charCodeAt(0) - 0xFEE0)
    ).replace(/　/g, " ");
}


// ==============================
// 半角英数字 → 全角
// ==============================

function halfWidthToFullWidth(text) {
    return text.replace(/[!-~]/g, char =>
        String.fromCharCode(char.charCodeAt(0) + 0xFEE0)
    ).replace(/ /g, "　");
}


// ==============================
// 文字列を逆順
// ==============================

function reverseText(text) {
    return [...text].reverse().join("");
}


// ==============================
// ひらがな → ローマ字
// 基本的な日本語に対応
// ==============================

function hiraganaToRomaji(text) {

    const table = {
        "きゃ": "kya",
        "きゅ": "kyu",
        "きょ": "kyo",
        "しゃ": "sha",
        "しゅ": "shu",
        "しょ": "sho",
        "ちゃ": "cha",
        "ちゅ": "chu",
        "ちょ": "cho",
        "にゃ": "nya",
        "にゅ": "nyu",
        "にょ": "nyo",
        "ひゃ": "hya",
        "ひゅ": "hyu",
        "ひょ": "hyo",
        "みゃ": "mya",
        "みゅ": "myu",
        "みょ": "myo",
        "りゃ": "rya",
        "りゅ": "ryu",
        "りょ": "ryo",

        "ぎゃ": "gya",
        "ぎゅ": "gyu",
        "ぎょ": "gyo",
        "じゃ": "ja",
        "じゅ": "ju",
        "じょ": "jo",
        "びゃ": "bya",
        "びゅ": "byu",
        "びょ": "byo",
        "ぴゃ": "pya",
        "ぴゅ": "pyu",
        "ぴょ": "pyo",

        "あ": "a",
        "い": "i",
        "う": "u",
        "え": "e",
        "お": "o",

        "か": "ka",
        "き": "ki",
        "く": "ku",
        "け": "ke",
        "こ": "ko",

        "さ": "sa",
        "し": "shi",
        "す": "su",
        "せ": "se",
        "そ": "so",

        "た": "ta",
        "ち": "chi",
        "つ": "tsu",
        "て": "te",
        "と": "to",

        "な": "na",
        "に": "ni",
        "ぬ": "nu",
        "ね": "ne",
        "の": "no",

        "は": "ha",
        "ひ": "hi",
        "ふ": "fu",
        "へ": "he",
        "ほ": "ho",

        "ま": "ma",
        "み": "mi",
        "む": "mu",
        "め": "me",
        "も": "mo",

        "や": "ya",
        "ゆ": "yu",
        "よ": "yo",

        "ら": "ra",
        "り": "ri",
        "る": "ru",
        "れ": "re",
        "ろ": "ro",

        "わ": "wa",
        "を": "wo",
        "ん": "n",

        "が": "ga",
        "ぎ": "gi",
        "ぐ": "gu",
        "げ": "ge",
        "ご": "go",

        "ざ": "za",
        "じ": "ji",
        "ず": "zu",
        "ぜ": "ze",
        "ぞ": "zo",

        "だ": "da",
        "ぢ": "ji",
        "づ": "zu",
        "で": "de",
        "ど": "do",

        "ば": "ba",
        "び": "bi",
        "ぶ": "bu",
        "べ": "be",
        "ぼ": "bo",

        "ぱ": "pa",
        "ぴ": "pi",
        "ぷ": "pu",
        "ぺ": "pe",
        "ぽ": "po",

        "ぁ": "xa",
        "ぃ": "xi",
        "ぅ": "xu",
        "ぇ": "xe",
        "ぉ": "xo",
        "っ": "",
        "ー": "-"
    };

    let result = "";
    let i = 0;

    while (i < text.length) {

        const two = text.slice(i, i + 2);

        if (table[two]) {
            result += table[two];
            i += 2;
            continue;
        }

        const one = text[i];

        // 「っ」の次の子音を重ねる
        if (one === "っ") {
            const nextTwo = text.slice(i + 1, i + 3);
            const nextOne = table[nextTwo] || table[text[i + 1]] || "";

            if (nextOne) {
                result += nextOne[0];
            }

            i++;
            continue;
        }

        result += table[one] ?? one;
        i++;
    }

    return result;
}


// ==============================
// 加工：指定回数繰り返す
// ==============================

function repeatText() {

    const text = inputText.value;

    if (!text) {
        showResult("");
        return;
    }

    const count = prompt("何回繰り返しますか？", "2");

    if (count === null) {
        return;
    }

    const number = Number(count);

    if (!Number.isInteger(number) || number < 1) {
        alert("1以上の整数を入力してください。");
        return;
    }

    showResult(text.repeat(number));
}


// ==============================
// 加工：空白削除
// ==============================

function removeSpaces() {
    showResult(inputText.value.replace(/\s/g, ""));
}


// ==============================
// 加工：空行削除
// ==============================

function removeEmptyLines() {
    const result = inputText.value
        .split(/\r?\n/)
        .filter(line => line.trim() !== "")
        .join("\n");

    showResult(result);
}


// ==============================
// 加工：重複行削除
// ==============================

function removeDuplicateLines() {
    const lines = inputText.value.split(/\r?\n/);
    const unique = [...new Set(lines)];

    showResult(unique.join("\n"));
}


// ==============================
// 加工：行を逆順
// ==============================

function reverseLines() {
    const lines = inputText.value.split(/\r?\n/);

    showResult(lines.reverse().join("\n"));
}


// ==============================
// 加工：行をシャッフル
// ==============================

function shuffleLines() {

    const lines = inputText.value.split(/\r?\n/);

    for (let i = lines.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [lines[i], lines[j]] = [lines[j], lines[i]];
    }

    showResult(lines.join("\n"));
}


// ==============================
// ボタンに機能を割り当て
// ==============================

document.querySelectorAll(".tool-button").forEach(button => {

    button.addEventListener("click", () => {

        const name = button.textContent.trim();
        const text = inputText.value;

        switch (name) {

            // 変換
            case "ひらがな → カタカナ":
                showResult(hiraganaToKatakana(text));
                break;

            case "カタカナ → ひらがな":
                showResult(katakanaToHiragana(text));
                break;

            case "ひらがな → ローマ字":
                showResult(hiraganaToRomaji(text));
                break;

            case "大文字 → 小文字":
                showResult(toLowerCase(text));
                break;

            case "小文字 → 大文字":
                showResult(toUpperCase(text));
                break;

            case "全角 → 半角":
                showResult(fullWidthToHalfWidth(text));
                break;

            case "半角 → 全角":
                showResult(halfWidthToFullWidth(text));
                break;

            case "文字列を逆順":
                showResult(reverseText(text));
                break;


            // 加工
            case "指定回数繰り返す":
                repeatText();
                break;

            case "空白を削除":
                removeSpaces();
                break;

            case "空行を削除":
                removeEmptyLines();
                break;

            case "重複行を削除":
                removeDuplicateLines();
                break;

            case "行を逆順":
                reverseLines();
                break;

            case "行をシャッフル":
                shuffleLines();
                break;

            default:
                break;
        }
    });
});


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

        outputText.select();
        document.execCommand("copy");
    }
});


// ==============================
// 初期化
// ==============================

updateAnalysis();
