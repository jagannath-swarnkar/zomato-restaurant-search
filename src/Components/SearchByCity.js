import React, { Component } from "react";
import Axios from "axios";
import {
  Card,
  TextField,
  Divider,
  Typography,
  Button
} from "@material-ui/core";
import "./Zomato.css";
import Header from "./Header";
import SearchIcon from "@material-ui/icons/Search";

const config = { headers: { "user-key": "d58b0f5939e34d258dd866d357453db3" } };

export default class SearchByCity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCity: "delhi",
      text: "",
      restaurants: []
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({ text: "delhi" });
    this.CityRestaurants();
    this.setState({ text: "" });
  }

  CityRestaurants = () => {
    this.setState({ currentCity: this.state.text });
    var city = this.state.text;
    Axios.get(
      `https://developers.zomato.com/api/v2.1/search?entity_type=city&q=${city}`,
      config
    )
      .then(res => {
        console.log("res", res.data.restaurants[0].restaurant);
        this.setState({ text: "", restaurants: res.data.restaurants });
      })
      .catch(err => {
        console.log("error ", err);
      });
  };

  keyPressHandler = e => {
    if (e.key === "Enter") {
      this.CityRestaurants();
    }
  };

  render() {
    if (this.state.restaurants) {
      return (
        <div>
          <Header currentCity={this.state.currentCity} />
          <Card className="card_search">
            <div>
              <SearchIcon className="search_icon" />
            </div>
            <TextField
              id="standard-basic"
              placeholder="Search by city..."
              fullWidth
              autoFocus
              value={this.state.text}
              onChange={e => {
                this.setState({ text: e.target.value });
              }}
              onKeyPress={this.keyPressHandler}
            />
          </Card>
          {this.state.restaurants.map((r, i) => {
            return (
              <Card key={i} className="card">
                <div className="card-div-1">
                  <div className="img-div">
                    <img
                      src={r.restaurant.featured_image}
                      alt="img"
                      className="image"
                    />
                  </div>
                  <div className="des-div">
                    <div style={{ display: "flex" }}>
                      <div style={{ flexGrow: 9 }}>
                        <Typography className="in-collection">
                          {r.restaurant.establishment}
                        </Typography>
                        <a
                          className="res_name"
                          href={r.restaurant.url}
                          target="_blank"
                        >
                          {r.restaurant.name}
                        </a>
                        <Typography className="add-1">
                          <b>{r.restaurant.location.locality_verbose}</b>
                        </Typography>
                      </div>
                      <div>
                        <Button
                          title={r.restaurant.user_rating.rating_text}
                          style={{
                            background: "forestgreen",
                            color: "white",
                            fontSize: "20px",
                            fontWeight: "bold"
                          }}
                        >
                          {r.restaurant.user_rating.aggregate_rating}
                        </Button>
                        <Typography className="votes">
                          {r.restaurant.user_rating.votes} votes
                        </Typography>
                      </div>
                    </div>
                    <br />
                    <Typography className="add-2">
                      {r.restaurant.location.address.slice(0, 54)} ...
                    </Typography>
                  </div>
                </div>
                <Divider />
                <div className="card-div-2">
                  <div className="card-div-2-a">
                    <Typography>CUSINE :</Typography>
                    <Typography>COST FOR TWO:</Typography>
                    <Typography>HOURS:</Typography>
                  </div>
                  <div className="card-div-2-b">
                    <Typography>{r.restaurant.cuisines}</Typography>
                    <Typography>
                      <img src="https://img.icons8.com/material-sharp/15/000000/rupee.png" />
                      {r.restaurant.average_cost_for_two}
                    </Typography>
                    <Typography>{r.restaurant.timings}</Typography>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      );
    }
    return (
      <div>
        <Header />
        <Card className="card_search">
          <TextField
            id="standard-basic"
            label="City Name"
            fullWidth
            autoFocus
            value={this.state.text}
            onChange={e => {
              this.setState({ text: e.target.value });
            }}
            onKeyPress={this.keyPressHandler}
          />
        </Card>
      </div>
    );
  }
}
