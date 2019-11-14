import React from "react";
import {WebView} from "react-native-webview";
import {View} from "react-native";

type HelpProps = {
    active: boolean
}

const content = `
<!DOCTYPE html>
<html lang="cs">
<head>
    <title>Kartičky potřeb a pocitů</title>
    <style>
        h1   {font-size: 60px;}
        p    {font-size: 50px;}
        .smaller {font-size: 30px;}
    </style>
</head>
<body>
<h1>Kartičky potřeb a pocitů</h1>
<p>
    Autorem textů kartiček je lektor Ondráš Přibyla. <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/cz/"><img alt="Licence Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/3.0/cz/88x31.png" /></a>
</p>
<p>
    Na stránkách <a href="https://www.nenasilnakomunikace.org/l/cviceni-s-kartickami-potreb-a-pocitu/">nenásilné komunikace</a> je k dispozici verze k tisku a popisy základních cvičení s kartičkami.
</p>

<p class="smaller">
    Zdrojový kód k dispozici na <a href="https://github.com/lukas-krecan/NvcCards/">GitHubu</a> pod licencí GNU General Public License v3.0
</p>
</body>
</html>
`;

export class Help extends React.PureComponent<HelpProps> {
    render() {
        return (
            <View style={this.props.active ? {flex: 1} : {display: 'none'}}>
                <WebView
                    originWhitelist={['*']}
                    source={{html: content}}
                    style={{margin: 10}}
                />
            </View>
        );
    }
}
