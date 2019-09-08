import React, {Fragment} from 'react';
import {FlatList, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {CardData, feelings, needs} from "./Data";


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

type CardListProps = {
    cards: CardData[][]
}


class CardList extends React.PureComponent<CardListProps> {
    render() {
        return <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <FlatList
                style={styles.container}
                data={this.props.cards}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <Card lines={item}/>}
            />
        </ScrollView>
    }
}

const NeedsScreen = () => <CardList cards={needs} />;

const FeelingsScreen = () => <CardList cards={feelings} />;

const TabNavigator = createBottomTabNavigator({
    Needs: NeedsScreen,
    Feelings: FeelingsScreen,
});

export default createAppContainer(TabNavigator);

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
