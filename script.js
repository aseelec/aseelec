// دالة التنقل بين الشاشات
function navigateTo(screenId) {
    // إخفاء كل الشاشات
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // إظهار الشاشة المطلوبة
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // التمرير لأعلى الصفحة عند التنقل
    window.scrollTo(0, 0);
}

// التعامل مع إرسال الاستمارات (Formspree AJAX)
const formspreeEndpoint = "https://formspree.io/f/xljbonwo";

function handleFormSubmit(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    
    // تغيير نص الزرار للدلالة على جاري الإرسال
    submitBtn.innerText = "جاري الإرسال...";
    submitBtn.disabled = true;

    // جمع بيانات الاستمارة
    const formData = new FormData(form);

    // إرسال البيانات في الخلفية
    fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // نجاح الإرسال: الانتقال لصفحة الشكر
            form.reset(); // تفريغ الاستمارة
            navigateTo('screen-success');
        } else {
            // فشل الإرسال
            alert("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.");
        }
    })
    .catch(error => {
        alert("تعذر الاتصال بالشبكة، يرجى التحقق من الإنترنت.");
    })
    .finally(() => {
        // إعادة الزرار لحالته الطبيعية
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });
}

// ربط الاستمارات بدالة الإرسال
document.addEventListener("DOMContentLoaded", () => {
    const formEfootball = document.getElementById('form-efootball');
    const formChess = document.getElementById('form-chess');

    if (formEfootball) formEfootball.addEventListener('submit', handleFormSubmit);
    if (formChess) formChess.addEventListener('submit', handleFormSubmit);
});
