import {Dimensions} from "react-native";

function styles(theme) {
    return {
        /*h1- h4 are normal styles for texts*/
        h1: {
            color: theme.colors.content,
            fontSize: 25,
        },
        h2: {
            color: theme.colors.content,
            fontSize: 20,
        },
        h3: {
            color: theme.colors.content,
            fontSize: 16,
        },
        h4: {
            color: theme.colors.content,
            fontSize: 14,
        },
        /*Simple paragraph*/
        paragraph: {
            color: theme.colors.content,
            fontSize: 12,
        },
        /*Align elements in a row*/
        row: {
            justifyContent: "space-between",
            alignItems: 'center',
            flexDirection: "row",
            padding: 5,
            flexWrap: "wrap",
        },
        /*Align elements in a Column*/
        col: {
            justifyContent: "space-between",
            alignItems: 'flex-start',
            flexDirection: "column",
            padding: 10,
            flexWrap: "wrap",
        },
        centerContent: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        /*Add a divider under a element*/
        divider: {
            borderBottomColor: theme.colors.smallDetails,
            borderBottomWidth: 2,
        },
        postImage: {
            width: "100%",
            height: 300,
        },
        /* The Styles Above Are Standardized for both dark and light mode*/

        /*CollectionView Styling*/
        item: {
            backgroundColor: theme.colors.backgroundColor,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            margin: 1,
            padding: 5,
            height: Dimensions.get('window').width /3,

        },
        collectionImage: {
            width: (Dimensions.get('window').width - 6) /3,
            height: (Dimensions.get('window').width - 3) /3,
        },
        centered: {
            justifyContent: 'center',
            alignItems: 'center',
        },


        /* BUTTONS */
        inputContainer: {
            width: '100%'
        },
        input: {
            width: 200,
            backgroundColor: 'white',
            borderColor: theme.colors.smallDetails,
            borderWidth: 2,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 5
        },
        inputLarge: {
            width: "100%",
            backgroundColor: 'white',
            borderColor: theme.colors.smallDetails,
            borderWidth: 2,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 5
        },
        buttonContainer: {
            width: '60%',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40
        },
        button: {
            backgroundColor: theme.colors.text,
            width: '100%',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center'
        },
        buttonOutline: {
            backgroundColor: 'white',
            marginTop: 5,
            borderColor: theme.colors.smallDetails,
            borderWidth: 2
        },
        buttonOutlineText: {
            color: theme.colors.text,
            // fontWeight: 700,
            fontSize: 16
        },
        buttonText: {
            color: 'white',
            //fontWeight: 700,
            fontSize: 16
        },
        /* BUTTONS */


    }
};
export default styles;
