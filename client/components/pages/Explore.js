import React, { useEffect, useState } from "react";
import history from "../../history";

// router
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

//MUI
import {
  Box,
  Grid,
  Paper,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

// child components
import SearchBar from "../helperComponents/SearchBar";
import EventList from "../helperComponents/EventList";
import Map_wrapper from "../helperComponents/Map_wrapper";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const Explore = ({ history, match }) => {
  const error = useSelector(({ error }) => error);
  const searchHistory = useSelector(({ searchObj }) => searchObj);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [loading, setLoading] = useState(true);

  let categories = ["Sports", "Music", "Film", "Arts & Theatre"];
  let filter = match.params.filter;
  if (filter) filter = JSON.parse(filter);
  filter = filter || {};

  const location = useSelector(({ userLocation }) =>
    userLocation.state ? userLocation.state : "New York"
  );

  const events = useSelector(({ events }) => {
    if (filter.sort && filter.sort === "price_low") events.sort((a, b) => a.price - b.price);
    if (filter.sort && filter.sort === "price_high") events.sort((a, b) => b.price - a.price);
    return events.filter((evt) => {
      return (
        (!filter.category &&
          evt.venueCity.toLowerCase() ===
            (searchHistory.location && searchHistory.location.toLowerCase())) ||
        (!filter.category &&
          evt.venueState.toLowerCase() ===
            (searchHistory.location && searchHistory.location.toLowerCase())) ||
        (!filter.category &&
          evt.venueStateCode.toLowerCase() ===
            (searchHistory.location && searchHistory.location.toLowerCase())) ||
        (!filter.category && evt.venueState === location) ||
        (filter.category === evt.category && evt.venueState === location) ||
        (filter.category === evt.category &&
          evt.venueState.toLowerCase() ===
            (searchHistory.location && searchHistory.location.toLowerCase())) ||
        (filter.category === evt.category &&
          evt.venueStateCode.toLowerCase() ===
            (searchHistory.location && searchHistory.location.toLowerCase())) ||
        (filter.category === evt.category &&
          evt.venueCity.toLowerCase() ===
            (searchHistory.location && searchHistory.location.toLowerCase()))
      );
    });
  });

  useEffect(() => {
    setLoading(false);

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filterCategory = (query) => {
    if (query === "category_null") delete filter["category"];
    if (query === "price_null") delete filter["sort"];
    if (categories.includes(query)) filter["category"] = query;
    if (query === "price_low" || query === "price_high") filter["sort"] = query;

    history.push(`/explore/filter/${JSON.stringify(filter)}`);
  };

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          margin: { xxs: "60px auto 0 auto", xs: "69px auto 0 auto" },
          width: "90%",
          paddingTop: "10px",
        }}
      >
        <Grid item md={2} sx={{ width: "100%", height: "90%" }}>
          <Box
            sx={{
              position: {
                xxs: "fixed",
                md: "fixed",
              },
              width: {
                xxs: "90%",
                md: " 15%",
              },
              zIndex: "2",
              height: "90%",
            }}
          >
            <SearchBar
              filterCategory={filterCategory}
              windowDimensions={windowDimensions}
              match={match}
              filter={filter}
            />
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "300px",
              display: {
                xxs: "block",
                md: "none",
              },
              overflow: "hidden",
              marginTop: "80px",
            }}
          >
            <Map_wrapper events={events} />
          </Box>
          <Typography
            variant="promptTitle"
            sx={{
              borderBottom: "3px solid #D83F87",
              fontWeight: 700,
              fontSize: {
                xs: "25px",
                sm: "30px",
                md: "30px",
              },
              margin: "8px 16px",
            }}
          >
            Search Results
          </Typography>
          {error.error ? <Alert severity="error">{error.error}</Alert> : <></>}
          <EventList events={events} />
        </Grid>
        <Grid item md={4} sx={{ width: "100%" }}>
          <Box
            sx={{
              position: {
                xxs: "none",
                md: "fixed",
              },
              top: {
                xxs: "60px",
                xs: "75px",
              },
              width: {
                xxs: "100%",
                md: " 30%",
              },
              display: {
                xxs: "none",
                md: "block",
              },
              height: "90%",
            }}
          >
            <Map_wrapper events={events} />
          </Box>
        </Grid>
      </Grid>
    );
  }
};

export default Explore;

// const userLocation = JSON.parse(window.localStorage.getItem("userLocation"));
// const location = userLocation ? userLocation : "New York";
// const userSearchedEvents = useSelector((state) => state.events.filter((event) => event.venueCity === location));

// const address = window.location.href.split("/");
// if (address.length > 2) {
//   history.push(`/explore/sort/${address[address.length - 1]}`);
// } else {
//   history.push(`/explore`);
// }
