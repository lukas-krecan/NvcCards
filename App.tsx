import React, {Fragment} from 'react';
import {FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type CardData = {
    text: string,
    size?: number
}

const needs: CardData[][] = [
    [{text:'Jistota, Bezpečí'}, {text:'Stabilita'}],
    [{text:'Dotek'}, {text:'projevení náklonnosti'}],
    [{text:'Integrita'}, {text:'soulad mezi tím co říkám,'}, {text:'a co dělám', size: 3}],
    [{text:'Klid'}, {text:'možnost dělat věci svým tempem'}, {text:'Klid v duši', size: 3}],
    [{text:'Láska'}],
    [{text:'Dobrodružství'}, {text:'Výzva'}],
    [{text:'Důvěra'}, {text:'Důvěřovat, spolehnout se', size: 2}, {text:'mít něčí důvěru'}],
    [{text:'Jasnost'}, {text:'mít jasno, orientovat se', size: 2}, {text:'vyznat se v tom', size: 2}],
    [{text:'Harmonie'}, {text:'Soulad, Krása'}],
    [{text:'Autonomie'}, {text:'Nezávislost, samostatnost'}, {text:'Vliv na věci, které se mě týkají, možnost volby'}],
    [{text:'Odpočinek'}, {text:'Relaxace'}],
    [{text:'Být podporován'}, {text:'podpora, pomoc'}],
    [{text:'Pořádek'}, {text:'čistota, uspořádanost'}],
    [{text:'Ocenění, uznání'}, {text:'pozornost, být viděn'}],
    [{text:'Dávání, Přispění'}, {text:'Obohacování života druhých'}, {text:'svým konáním', size: 3}],
    [{text:'Být pochopen'}, {text:'být slyšen, být vnímán', size: 2}, {text:'empatie', size: 2}],
    [{text:'Pohyb'}],
    [{text:'Rozumět, Chápat'}, {text:'Vědět, být informován'}],
    [{text:'Přátelství'}, {text:'Blízkost'}],
    [{text:'Progres'}, {text:'Efektivita'}],
    [{text:'Prostor'}, {text:'Prostornost ve fyzickém prostoru'}, {text:'v čase, v konverzaci', size: 3}],
    [{text:'Respekt'}, {text:'být brán vážně', size: 2}, {text:'pocit \"na mě záleží\"', size: 2}],
    [{text:'Sdílení'}],
    [{text:'Moc, vliv'}, {text:'Vliv na věci, které se mě týkají'}],
    [{text:'Soustředění'}],
    [{text:'Řád'}, {text:'Předvídatelnost'}],
    [{text:'Růst rozvoj'}, {text:'učení se'}],
    [{text:'Erós'}, {text:'Sexuální prožívání'}],
    [{text:'Smysl'}, {text:'smysluplnost, významnost, hloubka'}],
    [{text:'Sounáležitost'}, {text:'být s lidmi, nebýt sám'}, {text:'být součástí party, někam patřit'}],
    [{text:'Spolupráce'}, {text:'pracovat na věci společně'}, {text:'společně dosahovat výsledků'}],
    [{text:'Férovost'}, {text:'Přiměřenost', size: 2}, {text:'Vzájemnost', size: 2}],
    [{text:'Přijetí'}, {text:'Být přijímán takový jaký jsem'}],
    [{text:'Zábava'}, {text:'humor'}],
    [{text:'Volnost'}, {text:'Svoboda, Lehkost'}],
    [{text:'Spontánnost'}, {text:'Autentičnost'}],
    [{text:'Transparentnost'}, {text:'Otevřenost', size: 2}, {text:'Přímost (nechodit kolem horké kaše)'}],
    [{text:'Požitek'}, {text:'potěšení smyslů'}],
    [{text:'Intimita'}, {text:'blízkost, hloubka sdíleného prožívání'}],
    [{text:'Hra'}, {text:'hravost, soutěžení'}],
    [{text:'Kompetence'}, {text:'Mistrovství', size: 2}, {text:'ovládnutí dovednosti', size: 3}],
    [{text:'Pozornost'}, {text:'Být slyšen, Být viděn'}],
    [{text:'Zdravi, Svěžest'}, {text:'tělesná, duševní'}, {text:'býtí ve své plné síle'}],
    [{text:'Přesah'}, {text:'Spiritualita, Transcendence'}, {text:'kontakt s něčím, co nás přesahuje'}],
    [{text:'Tvořivost'}, {text:'Sebevyjádření'}],
];

type CardProps = {
    lines: CardData[]
}


class Card extends React.PureComponent<CardProps> {
    _onPress = () => {
    };

    render() {
        return (
            <TouchableOpacity onPress={this._onPress} style={styles.card}>
                <View>

                    {this.props.lines.map((line, i) => {
                        const fontSize = Card.getFontSize(line);
                        return <Text style={{margin: 1, textAlign: 'center', fontSize: fontSize}} key={i}>{line.text}</Text>
                    })}
                </View>
            </TouchableOpacity>
        );
    }

    private static getFontSize(card: CardData): number  {
        const size = card.size ? card.size : Card.guessFontSize(card.text);

        switch (size) {
            case 1: return 20;
            case 2: return 17;
            default: return 13;
        }
    }

    private static guessFontSize(text: string): number {
        if (text.length < 20) {
            return 1;
        } else if (text.length < 25) {
            return 2;
        } else {
            return 3;
        }
    }
}

const App = () => {
    return (
        <Fragment>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                    style={styles.scrollView}>
                    <FlatList
                        style={styles.container}
                        data={needs}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => <Card lines={item}/>}
                    />
                </ScrollView>
            </SafeAreaView>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1,
        marginVertical: 20
    },
    card: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        height: 80,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    item: {
        margin: 1,
        textAlign: 'center'
    },
});

export default App;
