import React, { Component } from "react";
import Axios from "axios";
import { Card, TextField, Divider, Typography } from "@material-ui/core";
import "./Zomato.css";
import Header from "./Header";

const config = { headers: { "user-key": "d58b0f5939e34d258dd866d357453db3" } };

export class Zomato extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityData: null,
      cityName: ""
    };
  }

  getLocationCity = cityName => {
    var city = cityName || "delhi";
    console.log(city);
    Axios.get(`https://developers.zomato.com/api/v2.1/cities?q=${city}`, config)
      .then(res => {
        console.log("res", res.data.location_suggestions[0].id);
        return res.data.location_suggestions[0].id;
      })
      .catch(err => {
        console.log("error ", err);
      });
  };

  getCollactions = e => {
    // if (e.key === "Enter") {
    const promise1 = new Promise((resolve, reject) => {
      var city = this.state.cityName || "delhi";
      console.log("city :", city);
      Axios.get(
        `https://developers.zomato.com/api/v2.1/cities?q=${city}`,
        config
      )
        .then(res => {
          console.log("res", res.data.location_suggestions[0].id);
          resolve(res.data.location_suggestions[0].id);
        })
        .catch(err => {
          console.log("error ", err);
        });
    });

    // getting the city_id from the promise and store in another variable
    promise1.then(id => {
      Axios.get(
        `https://developers.zomato.com/api/v2.1/collections?city_id=${id}`,
        config
      )
        .then(res => {
          console.log(res.data.collections);
          this.setState({ cityData: res.data.collections });
        })
        .catch(err => {
          console.log("error ", err);
        });
    });

    promise1.catch(err => console.log("err", err));
    // }
  };
  componentDidMount() {
    this.getCollactions("");
  }
  keyPressHandler = e => {
    if (e.key === "Enter") {
      this.getCollactions(e);
      this.setState({ cityName: "" });
    }
  };

  render() {
    if (this.state.cityData) {
      return this.state.cityData.map((e, i) => {
        return (
          <Card className="card">
            <div className="card-div-1">
              <div className="img-div">
                <img src={e.collection.image_url} alt="img" className="image" />
              </div>
              <Divider orientation="vertical" />
              <div className="des-div">
                <Typography color="secondary">
                  <b>{e.collection.title}</b>
                </Typography>
              </div>
            </div>
            <Divider />
            <div>hello</div>
          </Card>
        );
      });
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
            value={this.state.cityName}
            onChange={e => {
              this.setState({ cityName: e.target.value });
            }}
            onKeyPress={this.keyPressHandler}
          />
        </Card>
        {this.maindata || "Please wait data is loading"}
      </div>
    );
  }
}

export default Zomato;
