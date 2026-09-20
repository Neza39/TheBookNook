const PRODUCTS = [
    { key: 'hoodie',    title: 'Læsehoodie', sub: 'Én størrelse · Genanvendt fleece' },
    { key: 'mulepose',  title: 'Mulepose',   sub: 'Kraftig bomuld' },
    { key: 'bogmaerke', title: 'Bogmærke',   sub: 'Tykt karton · Med kvast' }
];

const choices = {
    hoodie:    { color: 'sand', motif: 'drage' },
    mulepose:  { color: 'sand', motif: 'drage' },
    bogmaerke: { color: 'sand', motif: 'drage' }
};

let step = 0;

const dialog = document.getElementById('designer');
const photo = dialog.querySelector('.designer-photo');

function draw() {
    const p = PRODUCTS[step];
    const c = choices[p.key];

    dialog.querySelector('.designer-step').textContent = `Trin ${step + 1} af 3`;
    dialog.querySelector('.designer-title').textContent = p.title;
    dialog.querySelector('.designer-sub').textContent = p.sub;

    photo.src = `assetsTBN/${p.key}-${c.color}-${c.motif}.webp`;
    photo.alt = `${p.title} i ${c.color} med ${c.motif}`;

    dialog.querySelectorAll('.swatch').forEach(b => {
        const type = b.closest('.designer-choice').dataset.choice;
        b.classList.toggle('selected', c[type] === b.dataset.value);
    });

    dialog.querySelectorAll('.designer-bar span').forEach((s, i) => {
        s.classList.toggle('active', i <= step);
    });

    dialog.querySelector('.designer-next').textContent =
        step === 2 ? 'Læg i kurv' : 'Næste';
}

dialog.querySelectorAll('.swatch').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.closest('.designer-choice').dataset.choice;
        choices[PRODUCTS[step].key][type] = btn.dataset.value;
        draw();
    });
});

dialog.querySelector('.designer-next').addEventListener('click', () => {
    if (step < 2) {
        step++;
        draw();
    } else {
        dialog.querySelector('.designer-steps').hidden = true;
        dialog.querySelector('.designer-final').hidden = false;
    }
});

dialog.querySelector('.email-form').addEventListener('submit', e => {
    e.preventDefault();
    dialog.querySelector('.email-form').hidden = true;
    dialog.querySelector('.email-thanks').hidden = false;
});

document.querySelector('[data-open="designer"]').addEventListener('click', () => {
    step = 0;

    PRODUCTS.forEach(p => {
        choices[p.key] = { color: 'sand', motif: 'drage' };
    });

    dialog.querySelector('.designer-steps').hidden = false;
    dialog.querySelector('.designer-final').hidden = true;
    dialog.querySelector('.email-form').hidden = false;
    dialog.querySelector('.email-thanks').hidden = true;

    draw();
    dialog.showModal();
});

dialog.querySelector('.designer-close').addEventListener('click', () => {
    dialog.close();
});


/* ---------------------------------------------------------
   BOOK CLUB
   --------------------------------------------------------- */

const bookclub = document.getElementById('bookclub');

document.querySelector('[data-open="bookclub"]').addEventListener('click', () => {
    bookclub.querySelector('.bookclub-books').hidden = false;
    bookclub.querySelector('.bookclub-review').hidden = true;
    bookclub.querySelector('.bookclub-reward').hidden = true;

    rating = 0;
    stars.forEach(s => { s.textContent = '☆'; });
    bookclub.querySelector('.review-text').value = '';

    bookclub.showModal();
});

bookclub.querySelector('.bookclub-close').addEventListener('click', () => {
    bookclub.close();
});

bookclub.querySelectorAll('.book').forEach(card => {
    card.addEventListener('click', () => {
        const which = bookclub.querySelector('.which-book');
        which.querySelector('img').src = card.querySelector('img').src;
        which.querySelector('span').textContent = card.querySelector('.book-title').textContent;

        bookclub.querySelector('.bookclub-books').hidden = true;
        bookclub.querySelector('.bookclub-review').hidden = false;
    });
});

let rating = 0;

const stars = bookclub.querySelectorAll('.star');

stars.forEach((star, i) => {
    star.addEventListener('click', () => {
        rating = i + 1;

        stars.forEach((s, j) => {
            s.textContent = j < rating ? '★' : '☆';
        });
    });
});

bookclub.querySelector('.review-form').addEventListener('submit', e => {
    e.preventDefault();
    bookclub.querySelector('.bookclub-review').hidden = true;
    bookclub.querySelector('.bookclub-reward').hidden = false;
});
