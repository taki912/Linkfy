window.onload = function () {
    const linkInput = document.getElementById('linkInput');
    const fileTypeSelect = document.getElementById('fileTypeSelect');
    const usageSelect = document.getElementById('usageSelect');
    const linkButton = document.getElementById('linkButton');
    const resultLink = document.getElementById('resultLink');
    const clearButton = document.getElementById('clearButton');

    linkButton.addEventListener('click', function () {
        const originalLink = linkInput.value.trim();

        if (!originalLink) {
            resultLink.innerHTML = '<p style="color:red;">Please enter a valid link.</p>';
            return;
        }

        // استخراج ID من رابط Google Drive
        const fileIdMatch = originalLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (!fileIdMatch || fileIdMatch.length < 2) {
            resultLink.innerHTML = '<p style="color:red;">Invalid Google Drive link format.</p>';
            return;
        }

        const fileId = fileIdMatch[1];
        const fileType = fileTypeSelect.value;
        const usage = usageSelect.value;

        let finalLink = '';

        if (usage === 'download') {
            finalLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
        } else if (usage === 'view') {
            finalLink = `https://drive.google.com/file/d/${fileId}/view`;
        }

        // عرض الرابط مع زر النسخ
        resultLink.innerHTML = `
            <p>Generated Link:</p>
            <input type="text" id="generatedLink" value="${finalLink}" readonly style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #ccc; margin-bottom: 10px;">
            <button onclick="copyLink()" class="uiverse-button">📋 Copy</button>
        `;

        // تعطيل القوائم بعد توليد الرابط
        fileTypeSelect.disabled = true;
        usageSelect.disabled = true;
        linkInput.disabled = true;

        // إظهار رسالة تفيد بأن الرابط تم توليده بنجاح
        alert('The link has been generated successfully! You can copy it.');
    });

    clearButton.addEventListener('click', () => {
        linkInput.value = '';
        resultLink.innerHTML = '';

        // إعادة تمكين القوائم بعد المسح
        fileTypeSelect.disabled = false;
        usageSelect.disabled = false;
        linkInput.disabled = false;
    });
};

// دالة نسخ الرابط
function copyLink() {
    const copyText = document.getElementById("generatedLink");
    if (copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999); // للأجهزة المحمولة
        document.execCommand("copy");

        // إشعار بسيط بدل alert
        const originalButton = document.querySelector('button[onclick="copyLink()"]');
        originalButton.textContent = "✅ Copied!";
        setTimeout(() => {
            originalButton.textContent = "📋 Copy";
        }, 2000);
    }
}
