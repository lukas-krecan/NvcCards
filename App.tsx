import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Card, CardData, feelings, needs} from "./Data";


type CardProps = {
    card: Card,
    selected: boolean,
    onClick: () => void
}


class CardView extends React.PureComponent<CardProps> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} style={this.props.selected ? styles.selectedCard : styles.card}>
                <View>
                    {this.props.card.data.map((line, i) => {
                        const fontSize = CardView.getFontSize(line);
                        return <Text style={{margin: 1, textAlign: 'center', fontSize: fontSize}} key={i}>{line.text}</Text>
                    })}
                </View>
            </TouchableOpacity>
        );
    }

    private static getFontSize(card: CardData): number  {
        const size = card.size ? card.size : CardView.guessFontSize(card.text);

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
    cards: Card[]
}

type CardListState = {
    selectedCards: string[]
}


class CardList extends React.Component<CardListProps, CardListState> {
    constructor(props: CardListProps) {
        super(props);
        this.state = {
            selectedCards: []
        }
    }

    render() {
        console.log(this.state.selectedCards)
        return <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <FlatList
                style={styles.container}
                data={this.props.cards}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <CardView card={item} selected={this.isSelected(item)} onClick={() => this.selectCard(item)}/>}
            />
        </ScrollView>
    }

    private isSelected(item: Card): boolean {
        return this.state.selectedCards.indexOf(item.id) != -1
    }

    private selectCard(item: Card) {
        let selected = this.state.selectedCards;
        if (this.isSelected(item)) {
            this.setState({selectedCards: selected.filter(id => id != item.id)})
        } else {
            selected.push(item.id);
            this.setState({selectedCards: selected})
        }
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
    selectedCard: {
        backgroundColor: '#ffd7da',
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
