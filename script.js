document.addEventListener('DOMContentLoaded', function () {
    const chapters = document.querySelectorAll('.chapter');

    // Chapter navigation and next buttons
    const chapterButtons = [
        document.getElementById('chapter1-btn'),
        document.getElementById('chapter2-btn'),
        document.getElementById('chapter3-btn'),
        document.getElementById('chapter4-btn'),
        document.getElementById('chapter5-btn'),
        document.getElementById('chapter6-btn'),
        document.getElementById('chapter7-btn'),
        document.getElementById('chapter8-btn'),
        document.getElementById('chapter9-btn'),
    ];

    const nextButtons = [
        document.getElementById('chapter1-next'),
        document.getElementById('chapter2-next'),
        document.getElementById('chapter3-next'),
        document.getElementById('chapter4-next'),
        document.getElementById('chapter5-next'),
        document.getElementById('chapter6-next'),
        document.getElementById('chapter7-next'),
        document.getElementById('chapter8-next'),
        document.getElementById('chapter9-next'),
    ];

    const projectBtn = document.getElementById('project-btn');

    // Initialize: disable all except Chapter 1
    chapterButtons.forEach((btn, i) => {
        btn.disabled = i !== 0;
        if (btn) btn.classList.remove('open');
    });

    nextButtons.forEach((btn, i) => {
        if (btn) btn.disabled = i !== 0;
    });

    if (projectBtn) projectBtn.disabled = true;

    // Toggle chapter content
    chapters.forEach(chapter => {
        const button = chapter.querySelector('.chapter-btn');
        const content = chapter.querySelector('.chapter-content');

        if (button && content) {
            content.style.display = 'none';
            button.addEventListener('click', () => {
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });
        }
    });

    // Unlock next chapter or final project
    nextButtons.forEach((btn, idx) => {
        if (!btn) return;

        btn.addEventListener('click', () => {
            btn.disabled = true;
            if (idx < chapterButtons.length - 1) {
                chapterButtons[idx + 1].disabled = false;
                nextButtons[idx + 1].disabled = false;
                showPopup(`✅ Chapter ${idx + 1} completed. Chapter ${idx + 2} unlocked!`, 'green');
            } else {
                if (projectBtn) {
                    projectBtn.disabled = false;
                    showPopup('🎉 Chapter 9 completed. Final Project unlocked!', 'green');
                }
            }
        });
    });

    if (projectBtn) {
        projectBtn.addEventListener('click', () => {
            showPopup('🎓 Final Project Started. Good Luck!', 'green');
            // Optional: navigate to finalproject.html
            window.location.href = 'finalproject.html';
        });
    }
});

// Reusable popup
function showPopup(message, color = "green") {
    const popup = document.getElementById('popup');
    if (!popup) return;
    popup.textContent = message;
    popup.style.backgroundColor = color;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 3000);
}
