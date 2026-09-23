/* ==========================================================
   DESIGNER
   ========================================================== */

/* content for three steps */
const PRODUCTS = [
    { key: 'hoodie',    title: 'Læsehoodie', sub: 'Én størrelse · Genanvendt fleece' },
    { key: 'mulepose',  title: 'Mulepose',   sub: 'Kraftig bomuld' },
    { key: 'bogmaerke', title: 'Bogmærke',   sub: 'Tykt karton · Med kvast' }
];

/* what is picked for each product, starts on sand + drage */
const choices = {
    hoodie:    { color: 'sand', motif: 'drage' },
    mulepose:  { color: 'sand', motif: 'drage' },
    bogmaerke: { color: 'sand', motif: 'drage' }
};

/* which step we are on. 0 = step one, the hoodie */
let step = 0;

/* find and name the popup and the product photo once, so we can reuse them */
const designer = document.getElementById('designer');
const productPhoto = designer.querySelector('.designer-photo');

/* redraw the whole screen from the choices and the step */
function draw() {
    /* p = this step's product, c = what is picked for it */
    const p = PRODUCTS[step];
    const c = choices[p.key];

    /* put the text on screen: counter from step, title and sub from PRODUCTS */
    designer.querySelector('.designer-step').textContent = `Trin ${step + 1} af 3`;
    designer.querySelector('.designer-title').textContent = p.title;
    designer.querySelector('.designer-sub').textContent = p.sub;

    /* build the filename from the three words, and describe it in alt */
    productPhoto.src = `assetsTBN/${p.key}-${c.color}-${c.motif}.webp`;
    productPhoto.alt = `${p.title} i ${c.color} med ${c.motif}`;

    /* outline the two swatches that match the current choices */
    designer.querySelectorAll('.swatch').forEach(b => {
        const type = b.closest('.designer-choice').dataset.choice;
        b.classList.toggle('selected', c[type] === b.dataset.value);
    });

    /* fill the bar up to the step we are on */
    designer.querySelectorAll('.designer-bar span').forEach((s, i) => {
        s.classList.toggle('active', i <= step);
    });

    /* the last step's button says something different */
    const nextButton = designer.querySelector('.designer-next');

    if (step === 2) {
        nextButton.textContent = 'Læg i kurv';
    } else {
        nextButton.textContent = 'Næste';
    }
}

/* clicking a swatch writes the pick into choices, then redraws */
designer.querySelectorAll('.swatch').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.closest('.designer-choice').dataset.choice;
        choices[PRODUCTS[step].key][type] = btn.dataset.value;
        draw();
    });
});

/* Næste moves to the next step, or on the last one opens the email screen */
designer.querySelector('.designer-next').addEventListener('click', () => {
    if (step < 2) {
        step++;
        draw();
    } else {
        designer.querySelector('.designer-steps').hidden = true;
        designer.querySelector('.designer-final').hidden = false;
    }
});

/* on submit, the thank you box replaces the email field */
designer.querySelector('.email-form').addEventListener('submit', e => {
    e.preventDefault();
    designer.querySelector('.email-form').hidden = true;
    designer.querySelector('.email-thanks').hidden = false;
});

/* opening wipes everything back to the start, then shows the popup */
document.querySelector('[data-open="designer"]').addEventListener('click', () => {
    step = 0;

    PRODUCTS.forEach(p => {
        choices[p.key] = { color: 'sand', motif: 'drage' };
    });

    designer.querySelector('.designer-steps').hidden = false;
    designer.querySelector('.designer-final').hidden = true;
    designer.querySelector('.email-form').hidden = false;
    designer.querySelector('.email-thanks').hidden = true;

    draw();
    designer.showModal();
});

/* the × closes the popup */
designer.querySelector('.designer-close').addEventListener('click', () => {
    designer.close();
});


/* ==========================================================
   BOOK CLUB
   ========================================================== */

/* find and name the bookclub popup */
const bookclub = document.getElementById('bookclub');

/* opening wipes everything back to the start, then shows the popup */
document.querySelector('[data-open="bookclub"]').addEventListener('click', () => {
    bookclub.querySelector('.bookclub-books').hidden = false;
    bookclub.querySelector('.bookclub-review').hidden = true;
    bookclub.querySelector('.bookclub-reward').hidden = true;

    rating = 0;
    stars.forEach(s => { s.textContent = '☆'; });
    bookclub.querySelector('.review-text').value = '';

    bookclub.showModal();
});

/* the × closes the popup */
bookclub.querySelector('.bookclub-close').addEventListener('click', () => {
    bookclub.close();
});

/* clicking a book copies its cover and title to the review screen, then swaps to it */
bookclub.querySelectorAll('.book').forEach(card => {
    card.addEventListener('click', () => {
        const which = bookclub.querySelector('.which-book');
        which.querySelector('img').src = card.querySelector('img').src;
        which.querySelector('span').textContent = card.querySelector('.book-title').textContent;

        bookclub.querySelector('.bookclub-books').hidden = true;
        bookclub.querySelector('.bookclub-review').hidden = false;
    });
});

/* how many stars are picked. 0 = none yet */
let rating = 0;

/* find and name the five star buttons */
const stars = bookclub.querySelectorAll('.star');

/* clicking a star fills that many and empties the rest */
stars.forEach((star, i) => {
    star.addEventListener('click', () => {
        rating = i + 1;

        stars.forEach((s, j) => {
            if (j < rating) {
                s.textContent = '★';
            } else {
                s.textContent = '☆';
            }
        });
    });
});

/* on submit, the reward screen replaces the review */
bookclub.querySelector('.review-form').addEventListener('submit', e => {
    e.preventDefault();
    bookclub.querySelector('.bookclub-review').hidden = true;
    bookclub.querySelector('.bookclub-reward').hidden = false;
});


/* ==========================================================
   SUBSCRIBE
   ========================================================== */

/* find and name the subscribe popup */
const subscribe = document.getElementById('subscribe');

/* opening clears the form, then shows the popup */
document.querySelector('[data-open="subscribe"]').addEventListener('click', () => {
    subscribe.querySelector('.email-form').hidden = false;
    subscribe.querySelector('.email-thanks').hidden = true;
    subscribe.querySelector('input').value = '';
    subscribe.showModal();
});

/* the × closes the popup */
subscribe.querySelector('.subscribe-close').addEventListener('click', () => {
    subscribe.close();
});

/* on submit, the thank you box replaces the email field */
subscribe.querySelector('.email-form').addEventListener('submit', e => {
    e.preventDefault();
    subscribe.querySelector('.email-form').hidden = true;
    subscribe.querySelector('.email-thanks').hidden = false;
});
