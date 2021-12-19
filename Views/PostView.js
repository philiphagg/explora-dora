import React from "react";
import {Button, Text, View, Image} from "react-native";

/**
 * View that displays information about a users post
 * @param route
 * @returns {JSX.Element}
 * @constructor
 */
function PostView({route}) {
    const {likeable,theme, post, user, styles, likePost, unlikePost, navigation} = route.params;

    return (
        <View style={[styles.divider]} key={post.id}>
            <View style={styles.row}>
                <Text style={styles.h2}>{post.title}</Text>
                <Text style={styles.h3}>{post.nick}</Text>
                <Text style={styles.h5}>{timeAgo(post.date)}</Text>
            </View>
            <Image source={{uri: post.image}}
                   style={styles.postImage}/>
                {
                    likeable ?
                        <View style={styles.row}>
                            <Text style={styles.h2}>{post.likes.length} ♥ </Text>
                            <Button
                                title={post.likes.includes(user) ? "Unlike" : "Like  "}
                                onPress={() => {
                                    post.likes.includes(user) ?
                                        unlikePost({post: post}) :
                                        likePost({post: post})
                                }}
                            />
                            <Button
                                title={"Show on Map"}
                                onPress={() => {
                                    navigation.navigate("Post on Map", {theme, post});
                                }}
                            />
                        </View>
                        :
                        <View style={styles.row}>
                            <Text style={styles.h2}>{post.likes.length} ♥ </Text>
                        </View>
                }
            <View style={styles.row}>
                <Text style={styles.h4}>{post.caption} </Text>
            </View>
        </View>
    )
}

export default PostView;

/**
 * Returns string with "time ago" message
 * @param time
 * @returns {*}
 */
function timeAgo(time) {

    var templates = {
        prefix: "",
        suffix: " ago",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years"
    };
    var template = function (t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function (time) {
        if (!time)
            return;
        time = new Date(time * 1000);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
            seconds < 45 && template('seconds', seconds) ||
            seconds < 90 && template('minute', 1) ||
            minutes < 45 && template('minutes', minutes) ||
            minutes < 90 && template('hour', 1) ||
            hours < 24 && template('hours', hours) ||
            hours < 42 && template('day', 1) ||
            days < 30 && template('days', days) ||
            days < 45 && template('month', 1) ||
            days < 365 && template('months', days / 30) ||
            years < 1.5 && template('year', 1) ||
            template('years', years)
        ) + templates.suffix;
    };
    return timer(time);
};
