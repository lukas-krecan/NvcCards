import React from "react";
import {WebView} from "react-native-webview";

const content = `
<h1>Kartičky potřeb a pocitů</h1>
<p>
  Text kartiček převzatý ze stánek <a href="https://www.nenasilnakomunikace.org/l/cviceni-s-kartickami-potreb-a-pocitu/">nenásilné komunikace</a>
  </p>
`;

export class Help extends React.PureComponent {
    render() {
        return (
            <WebView
                originWhitelist={['*']}
                source={{html: content}}
            />
        );
    }
}
