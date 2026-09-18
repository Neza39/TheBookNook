const TRIN = [
    { key: 'hoodie',    titel: 'Læsehoodie', sub: 'Én størrelse · Genanvendt fleece' },
    { key: 'mulepose',  titel: 'Mulepose',   sub: 'Kraftig bomuld' },
    { key: 'bogmaerke', titel: 'Bogmærke',   sub: 'Tykt karton · Med kvast' }
];

const valg = {
    hoodie:    { farve: 'sand', tegning: 'drage' },
    mulepose:  { farve: 'sand', tegning: 'drage' },
    bogmaerke: { farve: 'sand', tegning: 'drage' }
};

let trin = 0;

const dialog = document.getElementById('designer');
const foto = dialog.querySelector('.designer-foto');

function tegn() {
    const t = TRIN[trin];
    const v = valg[t.key];

    dialog.querySelector('.designer-trin').textContent = `Trin ${trin + 1} af 3`;
    dialog.querySelector('.designer-titel').textContent = t.titel;
    dialog.querySelector('.designer-sub').textContent = t.sub;

    foto.src = `assetsTBN/${t.key}-${v.farve}-${v.tegning}.webp`;
    foto.alt = `${t.titel} i ${v.farve} med ${v.tegning}`;

    dialog.querySelectorAll('.swatch').forEach(b => {
        const type = b.closest('.designer-valg').dataset.valg;
        b.classList.toggle('valgt', v[type] === b.dataset.vaerdi);
    });

    dialog.querySelectorAll('.designer-bar span').forEach((s, i) => {
        s.classList.toggle('aktiv', i <= trin);
    });

    dialog.querySelector('.designer-naeste').textContent =
        trin === 2 ? 'Læg i kurv' : 'Næste';
}

dialog.addEventListener('click', e => {
    const knap = e.target.closest('.swatch');
    if (!knap) return;
    const type = knap.closest('.designer-valg').dataset.valg;
    valg[TRIN[trin].key][type] = knap.dataset.vaerdi;
    tegn();
});

dialog.querySelector('.designer-naeste').addEventListener('click', () => {
    if (trin < 2) {
        trin++;
        tegn();
    }
});

document.querySelector('[data-open="designer"]').addEventListener('click', () => {
    trin = 0;
    tegn();
    dialog.showModal();
});

dialog.querySelector('.designer-close').addEventListener('click', () => {
    dialog.close();
});
