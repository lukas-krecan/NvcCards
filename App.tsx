import React, {Fragment} from 'react';
import {FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const needs: string[][] = [
    ['Jistota, Bezpečí', 'Stabilita'],
    ['Dotek', 'projevení náklonnosti'],
    ['Integrita', 'soulad mezi tím co říkám,', 'a co dělám'],
    ['Klid', 'možnost dělat věci svým tempem', 'Klid v duši'],
    ['Láska'],
    ['Dobrodružství', 'Výzva'],
    ['Důvěra', 'Důvěřovat, spolehnout se', 'mít něčí důvěru'],
    ['Jasnost', 'mít jasno, orientovat se', 'vyznat se v tom'],
    ['Harmonie', 'Soulad, Krása'],
    ['Autonomie', 'Nezávislost, samostatnost', 'Vliv na věci, které se mě týkají, možnost volby'],
    ['Odpočinek', 'Relaxace'],
    ['Být podporován', 'podpora, pomoc'],
    ['Pořádek', 'čistota, uspořádanost'],
    ['Ocenění, uznání', 'pozornost, být viděn'],
    ['Dávání, Přispění', 'Obohacování života druhých', 'svým konáním'],
    ['Být pochopen', 'být slyšen, být vnímán', 'empatie'],
    ['Pohyb'],
    ['Rozumět, Chápat', 'Vědět, být informován'],
    ['Přátelství', 'Blízkost'],
    ['Progres', 'Efektivita'],
    ['Prostor', 'Prostornost ve fyzickém prostoru', 'v čase, v konverzaci'],
    ['Respekt', 'být brán vážně', 'pocit \"na mě záleží\"'],
    ['Sdílení'],
    ['Moc, vliv', 'Vliv na věci, které se mě týkají'],
    ['Soustředění'],
    ['Řád', 'Předvídatelnost'],
    ['Růst rozvoj', 'učení se'],
    ['Erós', 'Sexuální prožívání'],
    ['Smysl', 'smysluplnost, významnost, hloubka'],
    ['Sounáležitost', 'být s lidmi, nebýt sám', 'být součástí party, někam patřit'],
    ['Spolupráce', 'pracovat na věci společně', 'společně dosahovat výsledků'],
    ['Férovost', 'Přiměřenost', 'Vzájemnost'],
    ['Přijetí', 'Být přijímán takový jaký jsem'],
    ['Zábava', 'humor'],
    ['Volnost', 'Svoboda, Lehkost'],
    ['Spontánnost', 'Autentičnost'],
    ['Transparentnost', 'Otevřenost', 'Přímost (nechodit kolem horké kaše)'],
    ['Požitek', 'potěšení smyslů'],
    ['Intimita', 'blízkost, hloubka sdíleného prožívání'],
    ['Hra', 'hravost, soutěžení'],
    ['Kompetence', 'Mistrovství', 'ovládnutí dovednosti'],
    ['Pozornost', 'Být slyšen, Být viděn'],
    ['Zdravi, Svěžest', 'tělesná, duševní', 'býtí ve své plné síle'],
    ['Přesah', 'Spiritualita, Transcendence', 'kontakt s něčím, co nás přesahuje'],
    ['Tvořivost', 'Sebevyjádření'],
    []
];

type CardProps = {
    lines: string[]
}


class Card extends React.PureComponent<CardProps> {
    _onPress = () => {
    };

    render() {
        return (
            <TouchableOpacity onPress={this._onPress} style={styles.card}>
                <View>
                    {this.props.lines.map((line, i) =>
                        <Text style={styles.item} key={i} adjustsFontSizeToFit={true} numberOfLines={1}>{line}</Text>
                    )}
                </View>
            </TouchableOpacity>
        );
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
                        numColumns={2}
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
        height: 60,
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
