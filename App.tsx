import * as React from 'react';
import {
  AppState,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, CardData, feelings, findCard, needs} from './Data';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Help} from './Help';
import DraggableFlatList from 'react-native-draggable-flatlist';

type CardProps = {
  card: Card;
  selected: boolean;
  onClick: () => void;
  move?: () => void;
  moveEnd?: () => void;
};

class CardView extends React.PureComponent<CardProps> {
  render() {
    const card = this.props.card;
    return (
      <TouchableOpacity
        onLongPress={this.props.move}
        onPressOut={this.props.moveEnd}
        onPress={this.props.onClick}
        style={[
          styles.card,
          this.props.selected &&
            (card.id.startsWith('n')
              ? styles.selectedNeed
              : styles.selectedFeeling),
        ]}>
        <View>
          {card.data.map((line, i) => {
            const fontSize = CardView.getFontSize(line);
            return (
              <Text style={[styles.cardText, {fontSize: fontSize}]} key={i}>
                {line.text}
              </Text>
            )
          })}
        </View>
      </TouchableOpacity>
    );
  }

  private static getFontSize(card: CardData): number {
    const size = card.size ? card.size : CardView.guessFontSize(card.text);

    switch (size) {
      case 1:
        return 20;
      case 2:
        return 17;
      default:
        return 13;
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
  cards: Card[];
  selectedCards: string[];
  onCardClick: (card: Card) => void;
  active: boolean;
};

class CardList extends React.PureComponent<CardListProps> {
  render() {
    return (
      <FlatList
        style={this.props.active ? styles.container : styles.hidden}
        contentInsetAdjustmentBehavior="automatic"
        data={this.props.cards}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <CardView
            card={item}
            selected={this.isSelected(item)}
            onClick={() => this.props.onCardClick(item)}
          />
        )}
      />
    )
  }

  private isSelected(item: Card): boolean {
    return this.props.selectedCards.indexOf(item.id) !== -1;
  }
}

type SelectedCardListProps = {
  cards: Card[];
  selectedCards: string[];
  onCardClick: (card: Card) => void;
  active: boolean;
  onCardMove: (data: readonly Card[] | null) => void;
};

class SelectedCardList extends React.PureComponent<SelectedCardListProps> {
  render() {
    return (
      <View style={this.props.active ? styles.container : styles.hidden}>
        <DraggableFlatList
          ListEmptyComponent={
            <Text style={[{textAlign: 'center'}, {marginTop: 20}]}>
              Nejsou vybrány žádné kartičky
            </Text>
          }
          contentInsetAdjustmentBehavior="automatic"
          data={this.props.cards}
          keyExtractor={(item) => item.id}
          renderItem={({item, index, move, moveEnd}) => (
            <CardView
              card={item}
              selected={this.isSelected(item)}
              onClick={() => this.props.onCardClick(item)}
              move={move}
              moveEnd={moveEnd}
            />
          )}
          onMoveEnd={({data}) => this.props.onCardMove(data)}
        />
        {this.props.cards.length < 5 && this.props.cards.length > 0 && (
          <Text style={[{textAlign: 'center', margin: 10, color: 'grey'}]}>
            Pokud chcete změnit pořadí kartiček, stačí jednu z nich chvíli
            podržet a pak přesunout.
          </Text>
        )}
      </View>
    );
  }

  private isSelected(item: Card): boolean {
    return this.props.selectedCards.indexOf(item.id) !== -1;
  }
}

type NvcCardsAppProps = {};

type NvcCardsAppState = {
  activeScreen: string;
  selectedCards: string[];
};

const needsScreen = 'needs';
const feelingsScreen = 'feelings';
const selectionScreen = 'selection';
const helpScreen = 'help';

export default class App extends React.Component<
  NvcCardsAppProps,
  NvcCardsAppState
> {
  constructor(props: NvcCardsAppProps) {
    super(props);
    this.state = {
      activeScreen: needsScreen,
      selectedCards: [],
    };
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
    AsyncStorage.setItem('@last', JSON.stringify(this.state));
  }

  private recoverState() {
    AsyncStorage.getItem('@last').then((result) => {
      if (result != null) {
        this.setState(JSON.parse(result));
      }
    });
  }

  render() {
    const activeScreen = this.state.activeScreen;
    const selectedCards = this.state.selectedCards;
    const noCardsSelected = selectedCards.length === 0;
    const selectedCardsList: Card[] = this.state.selectedCards.map((id) =>
      findCard(id),
    );

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 100}}>
          <CardList
            cards={needs}
            selectedCards={selectedCards}
            onCardClick={(item) => this.selectCard(item)}
            active={activeScreen === needsScreen}
          />
          <CardList
            cards={feelings}
            selectedCards={selectedCards}
            onCardClick={(item) => this.selectCard(item)}
            active={activeScreen === feelingsScreen}
          />
          <SelectedCardList
            cards={selectedCardsList}
            selectedCards={selectedCards}
            onCardClick={(item) => this.selectCard(item)}
            active={activeScreen === selectionScreen}
            onCardMove={(data) => this.moveSelectedCard(data)}
          />
          <Help active={activeScreen === helpScreen} />
        </View>
        <View style={styles.drawer}>
          {this.cardsButton('Pocity', feelingsScreen)}
          {this.cardsButton('Potřeby', needsScreen)}
          {this.tabIcon(selectionScreen, 'list')}
          {this.tabIcon(helpScreen, 'question')}
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => this.share()}
              style={styles.icon}
              disabled={noCardsSelected}>
              <Icon name="share-alt" size={20} style={[styles.inactiveText]} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={() => this.setState({selectedCards: []})}
              style={styles.icon}
              disabled={noCardsSelected}>
              <Icon name="trash-o" size={20} style={[styles.inactiveText]} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  private cardsButton(title: String, screenName: string) {
    const active = this.state.activeScreen === screenName;
    return (
      <View style={[{flex: 2}, active && styles.activeButton]}>
        <TouchableOpacity
          onPress={() => this.setState({activeScreen: screenName})}
          disabled={active}
          style={styles.tabButton}>
          <Text
            style={[
              styles.buttonText,
              active ? styles.selectedButtonText : styles.inactiveText,
            ]}>
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  private moveSelectedCard(data: readonly Card[] | null) {
    if (data != null) {
      this.setState({selectedCards: data.map((c) => c.id)});
    }
  }

  private selectCard(item: Card) {
    let selected = this.state.selectedCards;
    if (selected.indexOf(item.id) !== -1) {
      this.setState({selectedCards: selected.filter((id) => id !== item.id)});
    } else {
      selected.push(item.id);
      this.setState({selectedCards: selected});
    }
  }

  private tabIcon(screenName: string, icon: string) {
    const active = this.state.activeScreen === screenName;
    return (
      <View style={[{flex: 1}, active && styles.activeButton]}>
        <TouchableOpacity
          onPress={() => this.setState({activeScreen: screenName})}
          style={styles.icon}>
          <Icon
            name={icon}
            size={20}
            style={[active ? styles.buttonText : styles.inactiveText]}
          />
        </TouchableOpacity>
      </View>
    );
  }

  private async share() {
    try {
      //needs.filter(card => this.state.selectedCards.indexOf(card.id) != -1).map(card => card.data.)

      await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  selectedNeed: {
    backgroundColor: '#d4ebf2',
  },
  selectedFeeling: {
    backgroundColor: '#f2dbd4',
  },
  item: {
    margin: 1,
    textAlign: 'center',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButtonText: {
    color: 'black',
  },
  activeButton: {
    borderTopWidth: 2,
  },
  buttonText: {
    fontSize: 20,
  },
  inactiveText: {
    color: 'grey',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawer: {
    flex: 1,
    minHeight: 60,
    flexDirection: 'row',
    borderWidth: 0,
    borderTopWidth: 1,
    borderColor: '#888',
  },
  hidden: {
    display: 'none',
  },
  cardText: {
    margin: 1,
    textAlign: 'center',
  },
});
