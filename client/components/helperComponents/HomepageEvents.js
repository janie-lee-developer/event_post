import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../store/events";
import { loadSubscribedEvents } from "../../store/eventSubscription";
import EventCard from "./EventCard";

const HomepageEvents = ({ location = "Los Angeles" }) => {
  const events = useSelector((state) => state.events);
  const subscribedEvents = useSelector((state) => state.eventSubscription);
  const subscribedEventIds = subscribedEvents.map((event) => event.eventId);
  //const events = useSelector((state) => state.events.filter((event) => event.venueCity === location));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
    dispatch(loadSubscribedEvents());
  }, []);

  if (events) {
    return (
      <Box sx={{ margin: "1.5rem 1rem 1rem 1rem" }}>
        <Box>
          <Typography
            variant="promptTitle"
            sx={{
              fontSize: {
                xxs: "15px",
                xs: "19px",
                sm: "30px",
                md: "35px",
              },
            }}
          >
            Things to do in,{" "}
            <Box sx={{ display: "inline-block", color: "#d83f87" }}>
              {location}
            </Box>
          </Typography>
        </Box>
        <Box sx={{ margin: "1rem" }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={{ xxs: 2, md: 3 }}
          >
            {events.map((event) => {
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  subscribed={
                    subscribedEventIds.includes(event.id) ? true : false
                  }
                />
              );
            })}
          </Grid>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box>
        <h1>Loading...</h1>
      </Box>
    );
  }
};

export default HomepageEvents;
