import React from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    YellowBox
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Card, CardData, feelings, needs} from "./Data";
import Icon from 'react-native-vector-icons/FontAwesome';

YellowBox.ignoreWarnings([
    'Warning: componentWillMount has been renamed'
]);

type CardProps = {
    card: Card,
    selected: boolean,
    onClick: () => void
}


class CardView extends React.PureComponent<CardProps> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} style={[styles.card, this.props.selected && styles.selected]}>
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
    cards: Card[],
    selectedCards: string[],
    onCardClick: (card: Card) => void
}

class CardList extends React.PureComponent<CardListProps> {
    render() {
        return <FlatList
                style={styles.container}
                contentInsetAdjustmentBehavior="automatic"
                data={this.props.cards}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <CardView card={item} selected={this.isSelected(item)} onClick={() => this.props.onCardClick(item)}/>}
        />
    }

    private isSelected(item: Card): boolean {
        return this.props.selectedCards.indexOf(item.id) != -1
    }
}

type AppProps = { }

type AppState = {
    activeScreen: string,
    selectedCards: string[]
}

const needsScreen = 'needs';
const feelingsScreen = 'feelings';

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            activeScreen: needsScreen,
            selectedCards: []
        }
    }

    render() {
        let activeScreen = this.state.activeScreen;
        return (
            <View style={{flex: 1, marginVertical: 20}}>
                <View style={{flex: 100}}>
                    {activeScreen == needsScreen && <CardList cards={needs} selectedCards={this.state.selectedCards} onCardClick={(item) => this.selectCard(item)}/>}
                    {activeScreen == feelingsScreen && <CardList cards={feelings} selectedCards={this.state.selectedCards} onCardClick={(item) => this.selectCard(item)}/>}
                </View>
                <View style={{flex: 1, minHeight: 30, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        {this.cardsButton("Potřeby", () => this.needsButtonClicked(), activeScreen == needsScreen)}
                    </View>
                    <View style={{flex: 1}}>
                        {this.cardsButton("Pocity", () => this.feelingsButtonClicked(), activeScreen == feelingsScreen)}
                    </View>
                    <View style={{flex: 1}}>
                        <Button title="Clear" onPress={() => this.setState({selectedCards: []})}/>
                    </View>
                </View>
            </View>
        );
    }



    private cardsButton(title: String, onPress: () => void, active: boolean) {
        return <Button title={title} onPress={onPress} disabled={active} style={styles.tabButton}/>;
    }

    private selectCard(item: Card) {
        let selected = this.state.selectedCards;
        if (selected.indexOf(item.id) != -1) {
            this.setState({selectedCards: selected.filter(id => id != item.id)})
        } else {
            selected.push(item.id);
            this.setState({selectedCards: selected})
        }
    }

    private needsButtonClicked() {
        this.setState({activeScreen: needsScreen})
    }
    private feelingsButtonClicked() {
        this.setState({activeScreen: feelingsScreen})
    }
}

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
    selected: {
        backgroundColor: '#d4ebf2',
    },
    item: {
        margin: 1,
        textAlign: 'center'
    },
    tabButton:{

    }
});
