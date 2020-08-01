import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import './Card.css';
import API from '../../utils/API';
import axios from "axios";
import { useHistory } from "react-router-dom";

const RestaurantCard = () => {
  const history = useHistory();
  const [restaurants, setRestaurants] = useState([]);
  const [zipcode, setZipcode] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [currentRoundCardCount, setCurrentRoundCardCount] = useState(0);

  const newEats = () => {
    //get call from opentable with zip code query
    // write a post request function so that when like button is hit, it posts id to like schema and re renders
    API.getNewEats(zipcode)
      .then(res => {
        setRestaurants(res.data.restaurants)
        localStorage.setItem('restaurants', JSON.stringify(res.data.restaurants));
        setLoaded(true);
      })

      .catch(error => console.log(error));
  }

  const handleSubmit = event => {
    event.preventDefault()
    newEats()
  }

  const handleRoundCompleted = () => {
    if (currentRoundCardCount === 4) {
      history.push("/matches");
      return true;
    }
  }

  const handleLikeClicked = randomRestaurant => {
    if (handleRoundCompleted()) {
      return;
    }

    setCurrentRoundCardCount(currentRoundCardCount + 1);
    console.log(currentRoundCardCount);

    const likeInfo = {
      restaurantID: randomRestaurant.id
    };

    API.addLike(likeInfo).then(() => newEats())
  };

  const handleDislikeClicked = () => {
    if (handleRoundCompleted()) {
      return;
    }

    setCurrentRoundCardCount(currentRoundCardCount + 1);

    newEats();
  }

  const getRandomRestaurant = () => {
    return restaurants[Math.floor(Math.random() * restaurants.length)];
  }


  const randomRestaurant = getRandomRestaurant();

  return (
    <div className="card" style={{ width: '18rem' }}>
      <form style={{ width: '18rem' }} onSubmit={handleSubmit}>
        <input style={{ width: '9rem' }}
          placeholder="00000"
          value={zipcode}
          onChange={e => setZipcode(e.target.value)}
          type="text"></input>
        <input style={{ width: '9rem' }} type="submit" value="submit" />
      </form>
      {loaded ?
        <Card style={{ width: '18rem'}}>
          <Card.Img variant="top" />
          <Card.Body>
            <Card.Title>{randomRestaurant.name}</Card.Title>
            <Card.Text>
              Address:<br />{randomRestaurant.address}<br /><br />
              Phone Number:<br />{randomRestaurant.phone}
            </Card.Text>
          </Card.Body>
          <Card.Body>
            <div>
              <Card.Link href={randomRestaurant.reserve_url}>Make Reservations</Card.Link>
            </div><br />
            <div>
              <button onClick={() => handleLikeClicked(randomRestaurant)} id="like" className="btn btn-success mx-4">
                like
            </button>
              <button onClick={() => handleDislikeClicked()} id="dislike" className="btn btn-danger mx-4">
                dislike
            </button>
            </div>
          </Card.Body>
        </Card>
        :
        <div></div>
      }
    </div>
  )

}

export default RestaurantCard;