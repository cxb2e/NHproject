const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const responseDiv = document.getElementById('response');
const mainContent = document.querySelector('.main-content');
const container = document.querySelector('.container');
const envelope = document.getElementById('envelope');
const envelopeWrapper = document.querySelector('.envelope-wrapper');

if (envelope) {
    envelope.addEventListener('click', () => {
        envelope.classList.add('open');

        setTimeout(() => {
            if (envelopeWrapper) {
                envelopeWrapper.style.opacity = '0';
                envelopeWrapper.addEventListener('transitionend', () => {
                    envelopeWrapper.remove();
                });
            }

            if (container) {
                container.classList.remove('hidden');
            }

            createFlyingHearts();
        }, 1500);
    });
}

function createFlyingHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    if (!heartsContainer) return;

    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');

        const size = Math.random() * 20 + 10;

        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heart.style.setProperty('--random-x', (Math.random() - 0.5) * 2);

        const before = document.createElement('style');
        const after = document.createElement('style');

        const uniqueClass = 'heart-' + Date.now() + Math.random().toString(36).substr(2, 9);

        heart.classList.add(uniqueClass);

        before.innerHTML = `
            .${uniqueClass}::before {
                top: -${size / 2}px;
                width: ${size}px;
                height: ${size}px;
            }
        `;

        after.innerHTML = `
            .${uniqueClass}::after {
                left: ${size / 2}px;
                width: ${size}px;
                height: ${size}px;
            }
        `;

        document.head.appendChild(before);
        document.head.appendChild(after);

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
            before.remove();
            after.remove();
        }, 10000);

    }, 300);
}

yesBtn.addEventListener('click', () => {
    mainContent.classList.add('hidden');

    // Khởi tạo EmailJS
    emailjs.init("qrbFGJAnib2jc-B7g");

    const templateParams = {
        message: "Síp Hân đã đồng ý bản kế hoạch ❤️"
    };

    emailjs.send(
        'service_j6dgumd',
        'template_3fbwcab',
        templateParams
    )
    .then(function(response) {
        console.log('EmailJS SUCCESS!', response.status, response.text);
    })
    .catch(function(error) {
        console.log('EmailJS FAILED...', error);
    });

    if (responseDiv) {
        responseDiv.classList.remove('hidden');
    }
});

noBtn.addEventListener('mouseover', () => {
    const noBtnRect = noBtn.getBoundingClientRect();

    const maxX = window.innerWidth - noBtnRect.width;
    const maxY = window.innerHeight - noBtnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

createFlyingHearts();