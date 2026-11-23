function navigateTo(screenId) {
    // إجبار المتصفح على إخفاء كل الشاشات
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.style.display = 'none'; 
        screen.classList.remove('active');
    });

    // إظهار الشاشة المطلوبة فقط
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        // لو الشاشة دي "عن النادي" بنخليها flex عشان السكرول يشتغل، غير كده block عادي
        if (screenId === 'screen-about') {
            targetScreen.style.display = 'flex';
        } else {
            targetScreen.style.display = 'block';
        }
        targetScreen.classList.add('active');
    }
    
    window.scrollTo(0, 0);
}

// كود الإرسال (زي ما هو)
const formspreeEndpoint = "https://formspree.io/f/xljbonwo";

function handleFormSubmit(event) {
    event.preventDefault(); 
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    
    submitBtn.innerText = "جاري الإرسال...";
    submitBtn.disabled = true;

    const formData = new FormData(form);

    fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            form.reset();
            navigateTo('screen-success');
        } else {
            alert("حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.");
        }
    })
    .catch(error => {
        alert("تعذر الاتصال بالشبكة، يرجى التحقق من الإنترنت.");
    })
    .finally(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    });
}

// عند فتح الموقع لأول مرة، هنخلي الشاشة الرئيسية هي اللي تظهر ونخفي الباقي
document.addEventListener("DOMContentLoaded", () => {
    navigateTo('screen-home'); // السطر ده هو اللي هيخفي باقي الصفحات فوراً

    const formEfootball = document.getElementById('form-efootball');
    const formChess = document.getElementById('form-chess');

    if (formEfootball) formEfootball.addEventListener('submit', handleFormSubmit);
    if (formChess) formChess.addEventListener('submit', handleFormSubmit);
});
