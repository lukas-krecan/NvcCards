import React from "react";
import {WebView} from "react-native-webview";
import {View} from "react-native";

type HelpProps = {
    active: boolean
}

export class Help extends React.PureComponent<HelpProps> {
    render() {
        return (
            <View style={this.props.active ? {flex: 1} : {display: 'none'}}>
                <WebView
                    originWhitelist={['*']}
                    source={{uri: "https://lukas-krecan.github.io/NvcCards/help2.html"}}
                    style={{margin: 10}}
                />
            </View>
        );
    }
}
