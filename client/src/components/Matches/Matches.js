import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import axios from "axios";
import './Matches.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import MyNavbar from "../Navbar/Navbar";


export default () => {
    let [loaded, setLoaded] = useState(false);
    let [likes, setLikes] = useState({ others: [], mine: [] });

    useEffect(() => {
        if (!loaded) {
            axios.all([API.getOtherUserLikes(), API.getMyLikes()])
                .then(axios.spread(function (others, mine) {
                    setLoaded(true);
                    setLikes({
                        others: others.data,
                        mine: mine.data
                    });
                }));
        }
    });

    function getMatchesForCurrentUser() {
        const matches = likes.mine
            .reverse()
            .map(like => like.restaurantID);

        const myPreviousRoundRestaurantIDs = new Set(matches);

        const matchingLikes = likes.others
            .filter(like => myPreviousRoundRestaurantIDs.has(like.restaurantID));

        const uniqueMatchingLikes = [...new Set(matchingLikes)];

        return uniqueMatchingLikes;
    }

    function getRestaurantName(restaurantID) {
        const restaurants = JSON.parse(localStorage.getItem('restaurants')); 
        return restaurants.find(restaurant => restaurant.id === restaurantID).name;
    }

    function getProcessedMatches() {
        const matchesForCurrentUser = getMatchesForCurrentUser();

        return matchesForCurrentUser.map(match => {
            const restaurantName = getRestaurantName(match.restaurantID);            
            return (
                <div className="match-card">
                    <Card>
                        <CardBody>
                        <CardTitle>User: {match.userEmail}</CardTitle>
                        <CardText>Restaurant: {restaurantName}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        });
    }

    const processedMatches = getProcessedMatches();

    return (
        <>
            {
                loaded && <div className="matches">
                    <div className="heading">Your Matches:</div>
                        {processedMatches}
                </div>
            }
        </>
    );
}
