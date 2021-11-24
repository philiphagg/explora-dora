import React from 'react';
import {Alert, Text, View, Button} from 'react-native';


function Menu(){
    return(
        <View>
            <Text style={{textAlign: 'center', margin: 20}}> Menu </Text>
            {
                <View>
                    <View style={{margin: 10}}>
                        <Button
                            title="Open Map"
                            onPress={() => Alert.alert('Här öppnas kart vyn')}
                    />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                            title="Progress"
                            onPress={() => Alert.alert('Här öppnas vyn där för användarens framsteg')}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                            title="High Score"
                            onPress={() => Alert.alert('Här kan användaren se high scores')}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                            title="Power Ups"
                            onPress={() => Alert.alert('Här kan användaren se och aktivera power ups')}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                            title="Collectibles"
                            onPress={() => Alert.alert('Här kan användaren se sin samling av objekt')}
                        />
                    </View>
                </View>
            }

        </View>
    )
}
export default Menu;


/*                    <View style={{margin: 10}}>
                        <Button
                            title="Open Map"
                            onPress={() => Alert.alert('Här öppnas kart vyn')}
                    />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                            title="Progress"
                            onPress={() => Alert.alert('Här öppnas vyn där för användarens framsteg')}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                            title="High Score"
                            onPress={() => Alert.alert('Här kan användaren se high scores')}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                            title="Power Ups"
                            onPress={() => Alert.alert('Här kan användaren se och aktivera power ups')}
                        />
                    </View>
                    <View style={{margin: 10}}>
                        <Button
                            title="Collectibles"
                            onPress={() => Alert.alert('Här kan användaren se sin samling av objekt')}
                        />
                    </View> */