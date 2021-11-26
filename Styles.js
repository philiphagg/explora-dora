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







        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'black',
        },
        buttonText: {
            fontSize: 16,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        },
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            //alignItems: 'center',
            //justifyContent: 'center',
        },
        view: {
            backgroundColor: theme.colors.background,
        },
        post: {
            backgroundColor: theme.colors.background,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        /* Feed And posts*/
        like: {
            fontWeight: "bold",
            fontSize: 20,

        },
        padding10: {
            padding: 10,
        },
    }
};
export default styles;
