import React, {Component} from 'react';
import {
    AppState,
    FlatList, SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    YellowBox
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Card, CardData, feelings, needs} from "./Data";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Help} from "./Help";

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
    onCardClick: (card: Card) => void,
    active: boolean
}

class CardList extends React.PureComponent<CardListProps> {
    render() {
        if (this.props.cards.length != 0) {
            return <FlatList
                    style={this.props.active ? styles.container: styles.hidden}
                    contentInsetAdjustmentBehavior="automatic"
                    data={this.props.cards}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => <CardView card={item} selected={this.isSelected(item)} onClick={() => this.props.onCardClick(item)}/>}
            />
        } else {
            return <Text style={[{textAlign: 'center'}, {marginTop: 20}, this.props.active ? styles.container: styles.hidden]}>Nejsou vybrány žádné kartičky</Text>
        }
    }

    private isSelected(item: Card): boolean {
        return this.props.selectedCards.indexOf(item.id) != -1
    }
}

type NvcCardsAppProps = { }

type NvcCardsAppState = {
    activeScreen: string,
    selectedCards: string[]
}

const needsScreen = 'needs';
const feelingsScreen = 'feelings';
const selectionScreen = 'selection';
const helpScreen = 'help';

export default class App extends React.Component<NvcCardsAppProps, NvcCardsAppState> {
    constructor(props: NvcCardsAppProps) {
        super(props);
        this.state = {
            activeScreen: needsScreen,
            selectedCards: []
        }
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        this.recoverState();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    private handleAppStateChange = (nextAppState: string) => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
            this.storeState();
        }
    };

    private storeState() {
        AsyncStorage.setItem('@last', JSON.stringify(this.state))
    }

    private recoverState() {
        AsyncStorage.getItem('@last').then(result => {
            if (result != null) {
                this.setState(JSON.parse(result))
            }
        })
    }


    render() {
        const activeScreen = this.state.activeScreen;
        const selectedCards = this.state.selectedCards;
        const noCardsSelected = selectedCards.length == 0;
        const selectedCardsList: Card[] = needs.filter( c => this.isCardSelected(c.id) ).concat(feelings.filter(c => this.isCardSelected(c.id) ));

        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 100}}>
                    <CardList cards={needs} selectedCards={selectedCards} onCardClick={(item) => this.selectCard(item)} active={activeScreen == needsScreen}/>
                    <CardList cards={feelings} selectedCards={selectedCards} onCardClick={(item) => this.selectCard(item)} active={activeScreen == feelingsScreen}/>
                    <CardList cards={selectedCardsList} selectedCards={selectedCards} onCardClick={(item) => this.selectCard(item)} active={activeScreen == selectionScreen}/>
                    <Help active={activeScreen == helpScreen}/>
                </View>
                <View style={styles.drawer}>
                    <View style={{flex: 2}}>
                        {this.cardsButton("Potřeby", needsScreen)}
                    </View>
                    <View style={{flex: 2}}>
                        {this.cardsButton("Pocity", feelingsScreen)}
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.setState({activeScreen: selectionScreen})} style={styles.icon}>
                            <Icon name="list" size={20} style={[noCardsSelected && styles.disabledText]}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.setState({selectedCards: []})} style={styles.icon} disabled={noCardsSelected}>
                            <Icon name="trash-o" size={20} style={[noCardsSelected && styles.disabledText]}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1}}>
                        <TouchableOpacity onPress={() => this.setState({activeScreen: helpScreen})} style={styles.icon}>
                            <Icon name="question" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }


    private isCardSelected(id: string) {
        return this.state.selectedCards.indexOf(id) != -1;
    }

    private cardsButton(title: String, screenName: string) {
        const active = this.state.activeScreen == screenName;
        return <TouchableOpacity onPress={() => this.setState({activeScreen: screenName})} disabled={active} style={styles.tabButton}>
            <Text style={[{fontSize: 20}, active && styles.selectedButtonText]}>{title}</Text>
        </TouchableOpacity>;
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
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    body: {
        backgroundColor: Colors.white,
    },
    container: {
        flex: 1
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedButtonText:{
        fontWeight: 'bold'
    },
    disabledText: {
      color: 'grey'
    },
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawer: {
        flex: 1,
        minHeight: 60,
        flexDirection: 'row',
        borderWidth: 0,
        borderTopWidth: 1,
        borderColor: '#888'
    },
    hidden: {
        display: 'none'
    }
});
