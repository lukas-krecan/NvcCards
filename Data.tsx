export type Card = {
    id: string,
    data: CardData[]
}

export type CardData = {
    text: string,
    size?: number
}

export const needs: Card[] = [
    {"id":"n1", data:[{text:'Jistota, Bezpečí'}, {text:'Stabilita'}]},
    {"id":"n2", data:[{text:'Dotek'}, {text:'projevení náklonnosti'}]},
    {"id":"n3", data:[{text:'Integrita'}, {text:'soulad mezi tím co říkám,'}, {text:'a co dělám', size: 3}]},
    {"id":"n4", data:[{text:'Klid'}, {text:'možnost dělat věci svým tempem'}, {text:'Klid v duši', size: 3}]},
    {"id":"n5", data:[{text:'Láska'}]},
    {"id":"n6", data:[{text:'Dobrodružství'}, {text:'Výzva'}]},
    {"id":"n7", data:[{text:'Důvěra'}, {text:'Důvěřovat, spolehnout se', size: 2}, {text:'mít něčí důvěru'}]},
    {"id":"n8", data:[{text:'Jasnost'}, {text:'mít jasno, orientovat se', size: 2}, {text:'vyznat se v tom', size: 2}]},
    {"id":"n9", data:[{text:'Harmonie'}, {text:'Soulad, Krása'}]},
    {"id":"n10", data:[{text:'Autonomie'}, {text:'Nezávislost, samostatnost'}, {text:'Vliv na věci, které se mě týkají, možnost volby'}]},
    {"id":"n11", data:[{text:'Odpočinek'}, {text:'Relaxace'}]},
    {"id":"n12", data:[{text:'Být podporován'}, {text:'podpora, pomoc'}]},
    {"id":"n13", data:[{text:'Pořádek'}, {text:'čistota, uspořádanost'}]},
    {"id":"n14", data:[{text:'Ocenění, uznání'}, {text:'pozornost, být viděn'}]},
    {"id":"n15", data:[{text:'Dávání, Přispění'}, {text:'Obohacování života druhých'}, {text:'svým konáním', size: 3}]},
    {"id":"n16", data:[{text:'Být pochopen'}, {text:'být slyšen, být vnímán', size: 2}, {text:'empatie', size: 2}]},
    {"id":"n17", data:[{text:'Pohyb'}]},
    {"id":"n18", data:[{text:'Rozumět, Chápat'}, {text:'Vědět, být informován'}]},
    {"id":"n19", data:[{text:'Přátelství'}, {text:'Blízkost'}]},
    {"id":"n20", data:[{text:'Progres'}, {text:'Efektivita'}]},
    {"id":"n21", data:[{text:'Prostor'}, {text:'Prostornost ve fyzickém prostoru'}, {text:'v čase, v konverzaci', size: 3}]},
    {"id":"n22", data:[{text:'Respekt'}, {text:'být brán vážně', size: 2}, {text:'pocit \"na mě záleží\"', size: 2}]},
    {"id":"n23", data:[{text:'Sdílení'}]},
    {"id":"n24", data:[{text:'Moc, vliv'}, {text:'Vliv na věci, které se mě týkají'}]},
    {"id":"n25", data:[{text:'Soustředění'}]},
    {"id":"n26", data:[{text:'Řád'}, {text:'Předvídatelnost'}]},
    {"id":"n27", data:[{text:'Růst rozvoj'}, {text:'učení se'}]},
    {"id":"n28", data:[{text:'Erós'}, {text:'Sexuální prožívání'}]},
    {"id":"n29", data:[{text:'Smysl'}, {text:'smysluplnost, významnost, hloubka'}]},
    {"id":"n30", data:[{text:'Sounáležitost'}, {text:'být s lidmi, nebýt sám'}, {text:'být součástí party, někam patřit'}]},
    {"id":"n31", data:[{text:'Spolupráce'}, {text:'pracovat na věci společně'}, {text:'společně dosahovat výsledků'}]},
    {"id":"n32", data:[{text:'Férovost'}, {text:'Přiměřenost', size: 2}, {text:'Vzájemnost', size: 2}]},
    {"id":"n33", data:[{text:'Přijetí'}, {text:'Být přijímán takový jaký jsem'}]},
    {"id":"n34", data:[{text:'Zábava'}, {text:'humor'}]},
    {"id":"n35", data:[{text:'Volnost'}, {text:'Svoboda, Lehkost'}]},
    {"id":"n36", data:[{text:'Spontánnost'}, {text:'Autentičnost'}]},
    {"id":"n37", data:[{text:'Transparentnost'}, {text:'Otevřenost', size: 2}, {text:'Přímost (nechodit kolem horké kaše)'}]},
    {"id":"n38", data:[{text:'Požitek'}, {text:'potěšení smyslů'}]},
    {"id":"n39", data:[{text:'Intimita'}, {text:'blízkost, hloubka sdíleného prožívání'}]},
    {"id":"n40", data:[{text:'Hra'}, {text:'hravost, soutěžení'}]},
    {"id":"n41", data:[{text:'Kompetence'}, {text:'Mistrovství', size: 2}, {text:'ovládnutí dovednosti', size: 3}]},
    {"id":"n42", data:[{text:'Pozornost'}, {text:'Být slyšen, Být viděn'}]},
    {"id":"n43", data:[{text:'Zdravi, Svěžest'}, {text:'tělesná, duševní'}, {text:'býtí ve své plné síle'}]},
    {"id":"n44", data:[{text:'Přesah'}, {text:'Spiritualita, Transcendence'}, {text:'kontakt s něčím, co nás přesahuje'}]},
    {"id":"n45", data:[{text:'Tvořivost'}, {text:'Sebevyjádření'}]}
];

export const feelings: Card[] = [
    {"id":"f1", data:[{text:'Vztek, Hněv'}, {text:'Naštvání, Zloba', size: 2}]},
    {"id":"f2", data:[{text:'Netrpělivost'}]},
    {"id":"f3", data:[{text:'Smutek'}]},
    {"id":"f4", data:[{text:'Strach'}]},
    {"id":"f5", data:[{text:'Bezmoc'}]},
    {"id":"f6", data:[{text:'Rozladění'}, {text:'Podráždění, Rozhořčení', size: 2}]},
    {"id":"f7", data:[{text:'Napětí'}]},
    {"id":"f8", data:[{text:'Lítost'}, {text:'Zklamání'}]},
    {"id":"f9", data:[{text:'Únava'}, {text:'Vyčerpání', size: 2}]},
    {"id":"f10", data:[{text:'Bolest'}, {text:'Zranění', size: 2}]},
    {"id":"f11", data:[{text:'Zmatek'}, {text:'Bezradnost', size: 2}]},
    {"id":"f12", data:[{text:'Rozpaky'}, {text:'Stud', size: 2}]},
    {"id":"f13", data:[{text:'Zahlcení'}]},
    {"id":"f14", data:[{text:'Osamělost'}]},
    {"id":"f15", data:[{text:'Mrzutost'}, {text:'Frustrace'}]},
    {"id":"f16", data:[{text:'Nervozita'}, {text:'Nuda'}]},
    {"id":"f17", data:[{text:'Hořkost'}]},
    {"id":"f18", data:[{text:'Otupělost'}, {text:'Netečnost, odpojení', size: 2}, {text:'rezignace', size: 2}]},
    {"id":"f19", data:[{text:'Úzkost'}, {text:'Obavy, Beznaděj', size: 2}]},
    {"id":"f20", data:[{text:'Vděčnost'}, {text:'Naplnění', size: 2}]},
    {"id":"f21", data:[{text:'Energie'}, {text:'osvěžení', size: 2}]},
    {"id":"f22", data:[{text:'Klid'}]},
    {"id":"f23", data:[{text:'Volnost'}, {text:'Bezstarostnost', size: 2}]},
    {"id":"f24", data:[{text:'Překvapení'}]},
    {"id":"f25", data:[{text:'Inspirace'}, {text:'Fascinace, Okouzlení', size: 2}]},
    {"id":"f26", data:[{text:'Radost'}, {text:'štěstí, veselost', size: 2}, {text:'potěšení', size: 2}]},
    {"id":"f27", data:[{text:'Vyrovnanost'}, {text:'Rovnováha, Sebejistota', size: 2}]},
    {"id":"f28", data:[{text:'Tíživý pocit'}, {text:'stísněnost', size: 2}]},
    {"id":"f29", data:[{text:'Zvědavost'}, {text:'Zájem', size: 2}]},
    {"id":"f30", data:[{text:'Něha'}]},
    {"id":"f31", data:[{text:'Hrdost'}]},
    {"id":"f32", data:[{text:'Dobrá nálada'}, {text:'Hřejivý pocit', size: 2}]},
    {"id":"f33", data:[{text:'Nadšení'}, {text:'Vášeň', size: 2}]},
    {"id":"f34", data:[{text:'Znechucení'}]},
    {"id":"f35", data:[{text:'Pohoda'}, {text:'Spokojenost'}]},
    {"id":"f36", data:[{text:'Povzbuzení'}, {text:'Odhodlání'}]},
    {"id":"f37", data:[{text:'Pobavení'}, {text:'Rozpustilost', size: 2}]},
    {"id":"f38", data:[{text:'Naděje'}]}
];

export function findCard(id: string): Card {
    if (id.startsWith('n')) {
        return needs.find(c => c.id == id) || {"id": id, data: []}
    } else {
        return feelings.find(c => c.id == id) || {"id": id, data: []}
    }
}
