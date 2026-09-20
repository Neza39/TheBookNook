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

dialog.addEventListener('click', e => {
    const btn = e.target.closest('.swatch');
    if (!btn) return;
    const type = btn.closest('.designer-choice').dataset.choice;
    choices[PRODUCTS[step].key][type] = btn.dataset.value;
    draw();
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
